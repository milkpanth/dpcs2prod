const models = require("../models");
const {
  Sequelize,
  CompanyProfile,
  CompanySection,
  Model,
  ModelFile,
  CompanyProfileFile,
  Series,
  SeriesFile,
  GenericFile,
  Proposal,
  EquipmentList,
  GenericList,
  ProjectSectionList,
  ProposalSequence,
  PendingProposal,
  sequelize,
  Section,
} = models;
const { Op } = Sequelize;
const { errorDataTable, errorJson } = require("../helpers/error");

const { Automizer } = require("pptx-automizer");
const {
  uploadFile,
  downloadToTemp,
  deleteBlob,
  getFormmatedNameProposal,
  STORAGE_PATH,
  formatDate,
} = require("../helpers/storage");
const { TEMPLATE_DIR, generatePDF } = require("../helpers/powerpoint");
const { TEMP_OUTPUT } = require("../constants");
const { MEDIA } = require("../constants/container");
const {
  PENDING,
  WORKING,
  SUCCESS,
  ERROR,
} = require("../constants/pendingproposal");
const fs = require("fs/promises");
const pptxgen = require("pptxgenjs");
const { getOpenIDFromHeader, getUser } = require("../helpers/permission");
const { getUserLanguage } = require("../helpers/lang");
const { createLog } = require("../helpers/log");
const { mergePPTX, convertPDF } = require("../helpers/aspose");
const {
  CREATE_PROJECT,
  CREATE_GENERIC,
  PROPOSAL_FN,
  DELETE_PROJECT,
  DELETE_GENERIC,
  REVOKE_GENERIC,
  DOWNLOAD_PROPOSAL_PPTX,
  DOWNLOAD_PROPOSAL_PDF,
} = require("../constants/log");
const { GENERIC, PROJECT } = require("../constants/sequence");

const QUEUE_CONCURRENCY = 5;
const queue = require("queue");
const q = queue({
  concurrency: QUEUE_CONCURRENCY,
  autostart: true,
});

const {
  COVER_SECTION_ID,
  PROFILE_SECTION_ID,
  EQUIP_SECTION_ID,
  CU_F_SECTION_ID,
  CU_S_SECTION_ID,
  FCU_F_SECTION_ID,
  FCU_S_SECTION_ID,
  CC_F_SECTION_ID,
  CC_S_SECTION_ID,
  END_SECTION_ID,
  CU_S_GENERAL,
  CU_S_SOUND,
  CU_S_INSTALLATION,
  CU_S_BLANK_1,
  CU_S_BLANK_2,
  CU_S_BLANK_3,
  FCU_S_GENERAL,
  FCU_S_SOUND,
  FCU_S_FAN,
  FCU_S_INSTALLATION,
  FCU_S_BLANK_1,
  FCU_S_BLANK_2,
  FCU_S_BLANK_3,
  CC_S_GENERAL,
  CC_S_BLANK_1,
  CC_S_BLANK_2,
  CC_S_BLANK_3,
  ZONE_GLOBAL,
  ZONE_LOCAL,
} = require("../constants/section");

const DAY_TO_EXPIRE = 30;
const DAY_AT_LEASET = 90;

module.exports = {
  async dataTable(req, res) {
    const dataTableObj = {
      draw: parseInt(req.body.draw),
      recordsTotal: 0,
      recordsFiltered: 0,
      data: [],
      error: null,
    };
    try {
      const oid = getOpenIDFromHeader(req);
      const pageLimit = parseInt(req.body.length) || 0;
      const pageOffset = parseInt(req.body.start) || 0;

      const orderArray = req.body.order
        ? [
            [
              sequelize.col(req.body.columns[req.body.order[0].column].data),
              req.body.order[0].dir,
            ],
          ]
        : [];
      const atLeastTime = new Date(
        new Date().setDate(new Date().getDate() - DAY_AT_LEASET)
      );

      if (req.body.search.value !== "") {
        const resultRecord = await Proposal.findAndCountAll({
          attributes: [
            "ProposalID",
            "ProjectName",
            "CustomerName",
            "ProjectAddress",
            "Type",
            "CreatedDate",
            "ExpireDate",
            "DeletedDate",
            "DeletedDate",
            "CompanyProfileLanguage",
            [
              sequelize.fn(
                "CONCAT",
                "proposal/download/pdf/",
                sequelize.col("Proposal.ProposalID")
              ),
              "PDFFullPath",
            ],
            [
              sequelize.fn(
                "CONCAT",
                "proposal/download/pptx/",
                sequelize.col("Proposal.ProposalID")
              ),
              "PPTXFullPath",
            ],
          ],
          where: {
            [Op.or]: [
              {
                ProposalID: {
                  [Op.like]: [`%${req.body.search.value}%`],
                },
              },
              {
                CustomerName: {
                  [Op.like]: [`%${req.body.search.value}%`],
                },
              },
              {
                ProjectName: {
                  [Op.like]: [`%${req.body.search.value}%`],
                },
              },
            ],
            [Op.and]: [
              {
                CreatedBy: oid,
                CreatedDate: {
                  [Op.gte]: atLeastTime,
                },
              },
            ],
          },
          include: [
            {
              attributes: ["GenericFileID"],
              model: GenericList,
              include: [
                {
                  model: GenericFile,
                },
              ],
            },
          ],
          limit: pageLimit,
          offset: pageOffset,
          order: orderArray,
        });
        dataTableObj.data = resultRecord.rows;
        dataTableObj.recordsFiltered = resultRecord.count;
        dataTableObj.recordsTotal = resultRecord.rows.length;
      } else {
        const resultRecord = await Proposal.findAndCountAll({
          attributes: [
            "ProposalID",
            "ProjectName",
            "CustomerName",
            "ProjectAddress",
            "Type",
            "CreatedDate",
            "ExpireDate",
            "DeletedDate",
            "CompanyProfileLanguage",
            [
              sequelize.fn(
                "CONCAT",
                "proposal/download/pdf/",
                sequelize.col("Proposal.ProposalID")
              ),
              "PDFFullPath",
            ],
            [
              sequelize.fn(
                "CONCAT",
                "proposal/download/pptx/",
                sequelize.col("Proposal.ProposalID")
              ),
              "PPTXFullPath",
            ],
          ],
          include: [
            {
              attributes: ["GenericFileID"],
              model: GenericList,
              include: [
                {
                  model: GenericFile,
                },
              ],
            },
          ],
          where: {
            [Op.and]: [
              {
                CreatedBy: oid,
                CreatedDate: {
                  [Op.gte]: atLeastTime,
                },
              },
            ],
          },
          limit: pageLimit,
          offset: pageOffset,
          order: orderArray,
        });
        dataTableObj.data = resultRecord.rows;
        dataTableObj.recordsFiltered = resultRecord.count;
        dataTableObj.recordsTotal = resultRecord.rows.length;
      }
      res.json(dataTableObj);
    } catch (err) {
      res.status(500).json(errorDataTable(err, dataTableObj));
    }
  },
  async libraryProjectDataTable(req, res) {
    const dataTableObj = {
      draw: parseInt(req.body.draw),
      recordsTotal: 0,
      recordsFiltered: 0,
      data: [],
      error: null,
    };
    try {
      const user = await getUser(req);
      const whereSelfObject = user.AdminType
        ? {}
        : {
            CreatedBy: user.UserMemberID,
          };
      const pageLimit = parseInt(req.body.length) || 0;
      const pageOffset = parseInt(req.body.start) || 0;

      const orderArray = req.body.order
        ? [
            [
              sequelize.col(req.body.columns[req.body.order[0].column].data),
              req.body.order[0].dir,
            ],
          ]
        : [];

      if (req.body.search.value !== "") {
        const resultRecord = await Proposal.findAndCountAll({
          attributes: [
            "ProposalID",
            "ProjectName",
            "CustomerName",
            "ProjectAddress",
            "Type",
            "CreatedDate",
            "ExpireDate",
            "DeletedDate",
            [
              sequelize.fn("CONCAT", STORAGE_PATH, sequelize.col("PDFFile")),
              "PDFPreview",
            ],
            [
              sequelize.fn(
                "CONCAT",
                "proposal/download/pdf/",
                sequelize.col("Proposal.ProposalID")
              ),
              "PDFFullPath",
            ],
            [
              sequelize.fn(
                "CONCAT",
                "proposal/download/pptx/",
                sequelize.col("Proposal.ProposalID")
              ),
              "PPTXFullPath",
            ],
          ],
          where: {
            [Op.or]: [
              {
                ProposalID: {
                  [Op.like]: [`%${req.body.search.value}%`],
                },
              },
              {
                CustomerName: {
                  [Op.like]: [`%${req.body.search.value}%`],
                },
              },
              {
                ProjectName: {
                  [Op.like]: [`%${req.body.search.value}%`],
                },
              },
            ],
            [Op.and]: [
              {
                Type: "PROJECT",
              },
              whereSelfObject,
            ],
          },
          limit: pageLimit,
          offset: pageOffset,
          order: orderArray,
        });
        dataTableObj.data = resultRecord.rows;
        dataTableObj.recordsFiltered = resultRecord.count;
        dataTableObj.recordsTotal = resultRecord.rows.length;
      } else {
        const resultRecord = await Proposal.findAndCountAll({
          attributes: [
            "ProposalID",
            "ProjectName",
            "CustomerName",
            "ProjectAddress",
            "Type",
            "CreatedDate",
            "ExpireDate",
            "DeletedDate",
            [
              sequelize.fn("CONCAT", STORAGE_PATH, sequelize.col("PDFFile")),
              "PDFPreview",
            ],
            [
              sequelize.fn(
                "CONCAT",
                "proposal/download/pdf/",
                sequelize.col("Proposal.ProposalID")
              ),
              "PDFFullPath",
            ],
            [
              sequelize.fn(
                "CONCAT",
                "proposal/download/pptx/",
                sequelize.col("Proposal.ProposalID")
              ),
              "PPTXFullPath",
            ],
          ],
          where: {
            [Op.and]: [
              {
                Type: "PROJECT",
              },
              whereSelfObject,
            ],
          },
          limit: pageLimit,
          offset: pageOffset,
          order: orderArray,
        });
        dataTableObj.data = resultRecord.rows;
        dataTableObj.recordsFiltered = resultRecord.count;
        dataTableObj.recordsTotal = resultRecord.rows.length;
      }
      res.json(dataTableObj);
    } catch (err) {
      res.status(500).json(errorDataTable(err, dataTableObj));
    }
  },
  async libraryGenericDataTable(req, res) {
    const dataTableObj = {
      draw: parseInt(req.body.draw),
      recordsTotal: 0,
      recordsFiltered: 0,
      data: [],
      error: null,
    };
    try {
      const user = await getUser(req);
      const whereSelfObject = user.AdminType
        ? {}
        : {
            CreatedBy: user.UserMemberID,
          };
      const pageLimit = parseInt(req.body.length) || 0;
      const pageOffset = parseInt(req.body.start) || 0;

      const orderArray = req.body.order
        ? [
            [
              sequelize.col(req.body.columns[req.body.order[0].column].data),
              req.body.order[0].dir,
            ],
          ]
        : [];

      if (req.body.search.value !== "") {
        const resultRecord = await Proposal.findAndCountAll({
          include: [
            {
              attributes: ["GenericFileID"],
              model: GenericList,
              include: [
                {
                  model: GenericFile,
                },
              ],
            },
          ],
          attributes: [
            "ProposalID",
            "ProjectName",
            "CustomerName",
            "ProjectAddress",
            "Type",
            "CreatedDate",
            "ExpireDate",
            "DeletedDate",
            [
              sequelize.fn("CONCAT", STORAGE_PATH, sequelize.col("PDFFile")),
              "PDFPreview",
            ],
            [
              sequelize.fn(
                "CONCAT",
                "proposal/download/pdf/",
                sequelize.col("Proposal.ProposalID")
              ),
              "PDFFullPath",
            ],
            [
              sequelize.fn(
                "CONCAT",
                "proposal/download/pptx/",
                sequelize.col("Proposal.ProposalID")
              ),
              "PPTXFullPath",
            ],
          ],
          where: {
            [Op.or]: [
              {
                ProposalID: {
                  [Op.like]: [`%${req.body.search.value}%`],
                },
              },
              {
                CustomerName: {
                  [Op.like]: [`%${req.body.search.value}%`],
                },
              },
              {
                ProjectName: {
                  [Op.like]: [`%${req.body.search.value}%`],
                },
              },
            ],
            [Op.and]: [
              {
                Type: "GENERIC",
              },
              whereSelfObject,
            ],
          },
          limit: pageLimit,
          offset: pageOffset,
          order: orderArray,
        });
        dataTableObj.data = resultRecord.rows;
        dataTableObj.recordsFiltered = resultRecord.count;
        dataTableObj.recordsTotal = resultRecord.rows.length;
      } else {
        const resultRecord = await Proposal.findAndCountAll({
          include: [
            {
              attributes: ["GenericFileID"],
              model: GenericList,
              include: [
                {
                  model: GenericFile,
                },
              ],
            },
          ],
          attributes: [
            "ProposalID",
            "ProjectName",
            "CustomerName",
            "ProjectAddress",
            "Type",
            "CreatedDate",
            "ExpireDate",
            "DeletedDate",
            [
              sequelize.fn("CONCAT", STORAGE_PATH, sequelize.col("PDFFile")),
              "PDFPreview",
            ],
            [
              sequelize.fn(
                "CONCAT",
                "proposal/download/pdf/",
                sequelize.col("Proposal.ProposalID")
              ),
              "PDFFullPath",
            ],
            [
              sequelize.fn(
                "CONCAT",
                "proposal/download/pptx/",
                sequelize.col("Proposal.ProposalID")
              ),
              "PPTXFullPath",
            ],
          ],
          where: {
            [Op.and]: [
              {
                Type: "GENERIC",
              },
              whereSelfObject,
            ],
          },
          limit: pageLimit,
          offset: pageOffset,
          order: orderArray,
        });
        dataTableObj.data = resultRecord.rows;
        dataTableObj.recordsFiltered = resultRecord.count;
        dataTableObj.recordsTotal = resultRecord.rows.length;
      }
      res.json(dataTableObj);
    } catch (err) {
      res.status(500).json(errorDataTable(err, dataTableObj));
    }
  },
  async readEquipment(req, res) {
    try {
      const user = await getUser(req);
      const lang = getUserLanguage(user);
      const { array } = req.body;

      const { sectionArray, subSectionArray, dataArray } = await getSection(
        array,
        user,
        lang
      );
      res.json({
        sectionArray,
        subSectionArray,
        dataArray,
      });
    } catch (err) {
      res.status(400).json(errorJson(err));
    }
  },
  async save(req, res) {
    try {
      const oid = getOpenIDFromHeader(req);
      const { pendingId } = req.body;
      const pendingProposal = await PendingProposal.findByPk(pendingId);
      if (!pendingProposal) {
        throw Error("No Pending Proposal!");
      }
      if (pendingProposal.CreatedBy != oid) {
        throw Error("Not Your Proposal!");
      }

      const expireDate = new Date();
      expireDate.setDate(new Date().getDate() + DAY_TO_EXPIRE);

      const firstLetter = pendingId.at(0);
      switch (firstLetter) {
        case "P":
          await Proposal.create({
            ProposalID: pendingProposal.ProposalData.ProposalID,
            ProjectName: pendingProposal.ProposalData.ProjectName,
            CustomerName: pendingProposal.ProposalData.CustomerName,
            ProjectAddress: pendingProposal.ProposalData.ProjectAddress,
            Type: "PROJECT",
            PDFFile: pendingProposal.ProposalData.PDFFile,
            PPTXFile: pendingProposal.ProposalData.PPTXFile,
            ExpireDate: expireDate,
            CompanyProfileLanguage:
              pendingProposal.ProposalData.CompanyProfileLanguage,
            CreatedBy: oid,
          });
          await ProjectSectionList.create({
            ProposalID: pendingProposal.SectionList.ProposalID,
            SectionArrayText: pendingProposal.SectionList.SectionArrayText,
            SubSectionArrayText:
              pendingProposal.SectionList.SubSectionArrayText,
          });
          for (const each of pendingProposal.EquipList) {
            await EquipmentList.create({
              ProposalID: pendingProposal.ProposalData.ProposalID,
              ModelID: each.ModelID,
              SeriesID: each.SeriesID,
              Description: each.Description,
              Quantity: each.Quantity,
              LangID: each.LangID,
            });
          }
          createLog(req, oid, PROPOSAL_FN, `${CREATE_PROJECT} ${pendingId}`);
          break;
        case "G":
          await Proposal.create({
            ProposalID: pendingProposal.ProposalData.ProposalID,
            ProjectName: pendingProposal.ProposalData.ProjectName,
            CustomerName: pendingProposal.ProposalData.CustomerName,
            ProjectAddress: pendingProposal.ProposalData.ProjectAddress,
            Type: "GENERIC",
            PDFFile: pendingProposal.ProposalData.PDFFile,
            PPTXFile: pendingProposal.ProposalData.PPTXFile,
            ExpireDate: expireDate,
            CompanyProfileLanguage:
              pendingProposal.ProposalData.CompanyProfileLanguage,
            CreatedBy: oid,
          });
          await GenericList.create({
            ProposalID: pendingProposal.SectionList.ProposalID,
            GenericFileID: pendingProposal.SectionList.GenericFileID,
            GenericSubTypeID: pendingProposal.SectionList.GenericSubTypeID,
          });
          createLog(req, oid, PROPOSAL_FN, `${CREATE_GENERIC} ${pendingId}`);
          break;
      }

      const pId = pendingProposal.ProposalData.ProposalID;
      await pendingProposal.destroy();

      res.json({
        donwloadPdf: `proposal/download/pdf/${pId}`,
        downloadPpt: `proposal/download/pptx/${pId}`,
        expire: expireDate.toISOString(),
      });
    } catch (err) {
      res.status(400).json(errorJson(err));
    }
  },
  async generateProject(req, res) {
    try {
      const user = await getUser(req);
      const { project, profileLangauage, section, subsection, data } = req.body;
      const projectID = await getSequenceNumber(PROJECT);

      project.fullname = user.getFullname();

      //const { pptxFile, pdfFile } = await doCreateProject(project, profileLangauage, section, subsection, data, projectID, user)
      //const { pptxFile, pdfFile } = await doCreateProjectAspose(project, profileLangauage, section, subsection, data, projectID, user)

      const equipArray = data.map((each) => {
        return {
          ProposalID: projectID,
          ModelID: each.Model,
          SeriesID: each.Series,
          Description: each.Description,
          Quantity: each.Quantity,
          LangID: each.Language,
        };
      });

      const pendingProposal = await PendingProposal.create({
        ID: projectID,
        ProposalData: {
          ProposalID: projectID,
          ProjectName: project.name,
          CustomerName: project.customer,
          ProjectAddress: project.address,
          Type: "PROJECT",
          PDFFile: null,
          PPTXFile: null,
          CompanyProfileLanguage: profileLangauage,
          CreatedBy: user.UserMemberID,
        },
        SectionList: {
          ProposalID: projectID,
          SectionArrayText: section.join(","),
          SubSectionArrayText: subsection.join(","),
        },
        EquipList: equipArray,
        CreatedBy: user.UserMemberID,
      });

      q.push(() =>
        doCreateProjectAspose(
          project,
          profileLangauage,
          section,
          subsection,
          data,
          projectID,
          user,
          pendingProposal
        )
      );

      res.json({
        pendingId: projectID,
      });
    } catch (err) {
      res.status(400).json(errorJson(err));
    }
  },
  async generateGeneric(req, res) {
    try {
      const user = await getUser(req);
      const { project, profileLangauage, selectedGenericFile } = req.body;
      const generic = await GenericFile.findByPk(selectedGenericFile);
      if (!generic) {
        throw Error("No Generic!");
      }

      const projectID = await getSequenceNumber(GENERIC);

      project.fullname = user.getFullname();

      const pendingProposal = await PendingProposal.create({
        ID: projectID,
        ProposalData: {
          ProposalID: projectID,
          ProjectName: project.name,
          CustomerName: project.customer,
          ProjectAddress: project.address,
          Type: "GENERIC",
          PDFFile: null,
          PPTXFile: null,
          CompanyProfileLanguage: profileLangauage,
          CreatedBy: user.UserMemberID,
        },
        SectionList: {
          ProposalID: projectID,
          GenericFileID: generic.FileID,
          GenericSubTypeID: generic.GenericSubTypeID,
        },
        CreatedBy: user.UserMemberID,
      });

      q.push(() =>
        doCreateGenericAspose(
          project,
          profileLangauage,
          generic,
          projectID,
          user,
          pendingProposal
        )
      );

      res.json({
        pendingId: projectID,
      });
    } catch (err) {
      res.status(400).json(errorJson(err));
    }
  },
  async delete(req, res) {
    try {
      const oid = getOpenIDFromHeader(req);
      const { pid } = req.params;
      const proposal = await Proposal.findByPk(pid);
      if (!proposal) {
        throw Error("Proposal not found!");
      }
      deleteBlob(proposal.PDFFile).catch((err) => console.error(err));
      deleteBlob(proposal.PPTXFile).catch((err) => console.error(err));
      proposal.PDFFile = null;
      proposal.PPTXFile = null;
      const ptype = proposal.Type;
      await proposal.save();
      await proposal.destroy();
      createLog(
        req,
        oid,
        PROPOSAL_FN,
        `${ptype === "PROJECT" ? DELETE_PROJECT : DELETE_GENERIC} ${pid}`
      );

      res.status(204).end();
    } catch (err) {
      res.status(400).json(errorJson(err));
    }
  },
  async downloadPowerPoint(req, res) {
    try {
      const oid = getOpenIDFromHeader(req);
      const { pid } = req.params;
      const proposal = await Proposal.findByPk(pid);
      if (!proposal) {
        return res.status(404).end();
      }
      const filePath = await downloadToTemp(proposal.PPTXFile);
      res.set(
        "Content-Disposition",
        `attachment; filename=${getFormmatedNameProposal(
          proposal.ProjectName,
          proposal.PPTXFile
        )}`
      );
      res.set(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation"
      );
      res.set("Access-Control-Expose-Headers", "Content-Disposition");
      createLog(req, oid, PROPOSAL_FN, `${DOWNLOAD_PROPOSAL_PPTX} ${pid}`);
      res.sendFile(filePath, { root: "." });
    } catch (err) {
      res.status(500).json(errorJson(err));
    }
  },
  async downloadPDF(req, res) {
    try {
      const oid = getOpenIDFromHeader(req);
      const { pid } = req.params;
      const proposal = await Proposal.findByPk(pid);
      if (!proposal) {
        return res.status(404).end();
      }
      const filePath = await downloadToTemp(proposal.PDFFile);
      res.set(
        "Content-Disposition",
        `attachment; filename=${getFormmatedNameProposal(
          proposal.ProjectName,
          proposal.PDFFile
        )}`
      );
      res.set("Content-Type", "application/octet-stream");
      res.set("Access-Control-Expose-Headers", "Content-Disposition");
      createLog(req, oid, PROPOSAL_FN, `${DOWNLOAD_PROPOSAL_PDF} ${pid}`);
      res.sendFile(filePath, { root: "." });
    } catch (err) {
      res.status(500).json(errorJson(err));
    }
  },
  async getEquipment(req, res) {
    try {
      const user = await getUser(req);
      const lang = getUserLanguage(user);
      const { pid } = req.params;
      const proposal = await Proposal.findByPk(pid);
      const selectedSection = await ProjectSectionList.findOne({
        where: {
          ProposalID: pid,
        },
        raw: true,
      });
      const equipments = await EquipmentList.findAll({
        where: {
          ProposalID: pid,
        },
        raw: true,
      });
      const result = await getSection(equipments, user, lang);
      res.json({ result, selectedSection, proposal });
    } catch (err) {
      res.status(500).json(errorJson(err));
    }
  },
  async previewPowerPoint(req, res) {
    try {
      const { pid } = req.params;
      const pendingProposal = await PendingProposal.findByPk(pid);
      if (!pendingProposal) {
        throw Error("No Pending Proposal!");
      }
      const { PDFFile } = pendingProposal.ProposalData;
      if (!PDFFile) {
        throw Error("No PDF in Pending Proposal!");
      }
      const filePath = await downloadToTemp(PDFFile);
      res.sendFile(filePath, { root: "." });
    } catch (err) {
      res.status(400).json(errorJson(err));
    }
  },
  async generateStatus(req, res) {
    try {
      const { pid } = req.params;
      const pendingProposal = await PendingProposal.findByPk(pid);
      if (!pendingProposal) {
        throw Error("No Pending Proposal!");
      }

      if (pendingProposal.Status == PENDING) {
        const allPending = await PendingProposal.findAll({
          where: {
            Status: PENDING,
          },
          order: [["ID", "ASC"]],
          raw: true,
        });
        const index = allPending.findIndex((x) => x.ID == pid);
        res.json({
          status: pendingProposal.Status,
          atIndex: Math.floor(index / QUEUE_CONCURRENCY),
        });
      } else {
        res.json({
          status: pendingProposal.Status,
          detail: pendingProposal.StatusDetail,
        });
      }
    } catch (err) {
      res.status(400).json(errorJson(err));
    }
  },
};

// For AsposeCloud
async function doCreateProjectAspose(
  projectProperty,
  profileLangauage,
  section,
  subsection,
  data,
  projectID,
  user,
  pendingProposal
) {
  try {
    const fileList = [];
    const sections = await CompanySection.findAll({
      where: {
        SectionID: {
          [Op.in]: section,
        },
        CompanyCode: user.CompanyCode,
      },
      order: [["CompanyOrder", "ASC"]],
      raw: true,
    });

    for (const current of sections) {
      if (current.SectionID == COVER_SECTION_ID) {
        console.log("GenCover");
        const company = await CompanyProfile.findByPk(user.CompanyCode);
        const coverFilePath = await genCoverPage(
          projectProperty,
          projectID,
          company
        );
        await appendSlideAspose(fileList, coverFilePath, false);
      }

      if (current.SectionID == PROFILE_SECTION_ID) {
        console.log("GenProfile");
        const companyFile = await CompanyProfileFile.findOne({
          where: {
            CompanyCode: user.CompanyCode,
            LangID: profileLangauage,
          },
          raw: true,
        });
        await appendSlideAspose(fileList, companyFile);
      }

      const allUnique = [];
      const allSeries = [];
      const allModel = [];
      for (const eachData of data) {
        const model = await Model.findByPk(eachData.Model);
        // No model skip to next data
        if (!model) {
          continue;
        }
        // If not exist add to array
        if (!allSeries.some((obj) => obj.SeriesID === model.SeriesID)) {
          allSeries.push({
            SeriesID: model.SeriesID,
            LangID: eachData.Language,
          });
        }
        if (!allModel.some((obj) => obj.ModelID === model.ModelID)) {
          allModel.push({
            ModelID: model.ModelID,
            LangID: eachData.Language,
          });
          allUnique.push(eachData);
        }
      }

      if (current.SectionID == EQUIP_SECTION_ID) {
        console.log("GenEquipment");
        const allSection = await CompanySection.findAll({
          where: {
            SectionID: {
              [Op.notIn]: [
                COVER_SECTION_ID,
                PROFILE_SECTION_ID,
                EQUIP_SECTION_ID,
                END_SECTION_ID,
              ],
            },
            CompanyCode: user.CompanyCode,
          },
          order: [["CompanyOrder", "ASC"]],
          raw: true,
        });
        const company = await CompanyProfile.findByPk(user.CompanyCode);
        const equipFilePath = await genEquipmentList(
          allUnique,
          company,
          allSection
        );
        await appendSlideAspose(fileList, equipFilePath, false);
      }

      if (current.SectionID == CU_F_SECTION_ID) {
        console.log("GenCUF");
        // Series Class CU
        for (const es of allSeries) {
          const series = await Series.findOne({
            include: [
              {
                model: SeriesFile,
                where: { LangID: es.LangID },
              },
            ],
            where: {
              ClassID: {
                [Op.startsWith]: "ODU",
              },
              SeriesID: es.SeriesID,
            },
          });
          const file = series?.SeriesFiles[0];
          await appendSlideAspose(fileList, file);
        }
      }

      if (current.SectionID == CU_S_SECTION_ID) {
        console.log("GenCUS");
        // Model Class CU
        for (const em of allModel) {
          const model = await Model.findOne({
            include: [
              {
                model: ModelFile,
                where: {
                  LangID: em.LangID,
                  SectionID: CU_S_SECTION_ID,
                  SubSectionID: subsection,
                },
              },
            ],
            where: {
              ClassID: {
                [Op.startsWith]: "ODU",
              },
              ModelID: em.ModelID,
            },
          });
          if (model) {
            for (const file of model.ModelFiles) {
              await appendSlideAspose(fileList, file);
            }
          }
        }
      }

      if (current.SectionID == FCU_F_SECTION_ID) {
        console.log("GenFCUF");
        // Series Class FCU
        for (const es of allSeries) {
          const series = await Series.findOne({
            include: [
              {
                model: SeriesFile,
                where: { LangID: es.LangID },
              },
            ],
            where: {
              ClassID: {
                [Op.startsWith]: "IDU",
              },
              SeriesID: es.SeriesID,
            },
          });
          const file = series?.SeriesFiles[0];
          await appendSlideAspose(fileList, file);
        }
      }

      if (current.SectionID == FCU_S_SECTION_ID) {
        console.log("GenFCUS");
        // Model Classs FCU
        for (const em of allModel) {
          const model = await Model.findOne({
            include: [
              {
                model: ModelFile,
                where: {
                  LangID: em.LangID,
                  SectionID: FCU_S_SECTION_ID,
                  SubSectionID: subsection,
                },
              },
            ],
            where: {
              ClassID: {
                [Op.startsWith]: "IDU",
              },
              ModelID: em.ModelID,
            },
          });
          if (model) {
            for (const file of model.ModelFiles) {
              await appendSlideAspose(fileList, file);
            }
          }
        }
      }

      if (current.SectionID == CC_F_SECTION_ID) {
        console.log("GenCCF");
        // Series Class CC
        for (const es of allSeries) {
          const series = await Series.findOne({
            include: [
              {
                model: SeriesFile,
                where: { LangID: es.LangID },
              },
            ],
            where: {
              ClassID: {
                [Op.startsWith]: "CC",
              },
              SeriesID: es.SeriesID,
            },
          });
          const file = series?.SeriesFiles[0];
          await appendSlideAspose(fileList, file);
        }
      }

      if (current.SectionID == CC_S_SECTION_ID) {
        console.log("GenCCS");
        // Model Classs CC
        for (const em of allModel) {
          const model = await Model.findOne({
            include: [
              {
                model: ModelFile,
                where: {
                  LangID: em.LangID,
                  SectionID: CC_S_SECTION_ID,
                  SubSectionID: subsection,
                },
              },
            ],
            where: {
              ClassID: {
                [Op.startsWith]: "CC",
              },
              ModelID: em.ModelID,
            },
          });
          for (const file of model.ModelFiles) {
            await appendSlideAspose(fileList, file);
          }
        }
      }

      if (current.SectionID == END_SECTION_ID) {
        console.log("GenEnd");
        await appendSlideAspose(
          fileList,
          {
            Folder: TEMPLATE_DIR,
            Path: "End.pptx",
          },
          false
        );
      }
    }

    const pptxFile = `${projectID}_${new Date().getTime()}.pptx`;
    await mergePPTX(fileList, pptxFile);
    uploadFile(
      `${TEMP_OUTPUT}/${pptxFile}`,
      pptxFile,
      "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    );
    const pdfFile = await convertPDF(pptxFile);
    uploadFile(`${TEMP_OUTPUT}/${pdfFile}`, pdfFile, "application/pdf");

    pendingProposal.ProposalData = {
      ...pendingProposal.ProposalData,
      PPTXFile: pptxFile,
      PDFFile: pdfFile,
    };
    pendingProposal.Status = SUCCESS;
  } catch (err) {
    console.error(err);
    pendingProposal.Status = ERROR;
    pendingProposal.StatusDetail = err.message || "Unknown Error!";
  } finally {
    pendingProposal.save();
  }
}

async function appendSlideAspose(list, file, download = true) {
  if (!file) {
    return;
  }
  if (download) {
    await downloadToTemp(file.Path);
  }
  list.push({
    model: file.ModelID,
    series: file.SeriesID,
    lang: file.LangID,
    folder: file.Folder || TEMP_OUTPUT,
    file: file.Path,
    local: !download,
  });
}

async function doCreateGenericAspose(
  projectProperty,
  profileLangauage,
  generic,
  projectID,
  user,
  pendingProposal
) {
  try {
    const fileList = [];

    const company = await CompanyProfile.findByPk(user.CompanyCode);
    const coverFilePath = await genCoverPage(
      projectProperty,
      projectID,
      company
    );
    await appendSlideAspose(fileList, coverFilePath, false);

    const companyFile = await CompanyProfileFile.findOne({
      where: {
        CompanyCode: user.CompanyCode,
        LangID: profileLangauage,
      },
      raw: true,
    });
    if (companyFile) {
      await appendSlideAspose(fileList, companyFile);
    }

    await appendSlideAspose(fileList, {
      Path: generic.Path,
    });

    await appendSlideAspose(
      fileList,
      {
        Folder: TEMPLATE_DIR,
        Path: "End.pptx",
      },
      false
    );

    const pptxFile = `${projectID}_${new Date().getTime()}.pptx`;
    await mergePPTX(fileList, pptxFile);
    uploadFile(
      `${TEMP_OUTPUT}/${pptxFile}`,
      pptxFile,
      "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    );
    const pdfFile = await convertPDF(pptxFile);
    uploadFile(`${TEMP_OUTPUT}/${pdfFile}`, pdfFile, "application/pdf");

    pendingProposal.ProposalData = {
      ...pendingProposal.ProposalData,
      PPTXFile: pptxFile,
      PDFFile: pdfFile,
    };
    pendingProposal.Status = SUCCESS;
  } catch (err) {
    console.error(err);
    pendingProposal.Status = ERROR;
    pendingProposal.StatusDetail = err.message || "Unknown Error!";
  } finally {
    pendingProposal.save();
  }
}

async function doCreateGeneric(projectProperty, generic, projectID) {
  const automizer = new Automizer({
    outputDir: TEMP_OUTPUT,
  });

  const pres = automizer.loadRoot(`${TEMPLATE_DIR}/Empty.pptx`);
  pres.load(`${TEMPLATE_DIR}/Cover.pptx`, "Cover");
  pres.addSlide("Cover", 1, (slide) =>
    applyCoverModify(slide, projectProperty, projectID)
  );

  const filePath = await downloadToTemp(generic.Path);
  pres.load(filePath);
  const matchedObject = (await pres.setCreationIds()).find(
    (x) => x.name == filePath
  );
  matchedObject.slides.forEach((x) => {
    pres.addSlide(filePath, x.id);
  });

  pres.load(`${TEMPLATE_DIR}/End.pptx`, "End");
  pres.addSlide("End", 1);

  const pptxFile = `${projectID}_${new Date().getTime()}.pptx`;
  await pres.write(pptxFile);
  uploadFile(
    `${TEMP_OUTPUT}/${pptxFile}`,
    pptxFile,
    "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  );
  const buffer = await fs.readFile(`${TEMP_OUTPUT}/${pptxFile}`);

  const pdfFile = await generatePDF(buffer, pptxFile);
  return { pptxFile, pdfFile };
}

function convertClass(name) {
  if (name.startsWith("IDU")) {
    return "FCU";
  }
  if (name.startsWith("ODU")) {
    return "CU";
  }
  if (name.startsWith("CC")) {
    return "Centralised Controller";
  }
  return null;
}

function applyCoverModify(slide, project, projectID) {
  slide.modify((document) => {
    const allText = document.getElementsByTagName("a:t");
    for (let i = 0; i < allText.length; i++) {
      let newText = allText.item(i).textContent;
      switch (i) {
        case 0:
          newText = project.customer;
          break;
        case 1:
          newText = project.name;
          break;
        case 2:
          newText = project.fullname;
          break;
        case 3:
          newText = projectID;
          break;
        case 4:
          newText = project.address;
          break;
      }
      allText.item(i).textContent = newText;
    }
  });
}

async function genCoverPage(projectProperty, projectID, companyProperty) {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  const slide = pres
    .addSlide()
    .addImage({
      path: "./templates/Cover_BG_R.png",
      x: 0.65,
      y: 0,
      w: 12.68,
      h: 7.5,
    })
    .addImage({
      path: "./templates/Cover_BG_L.png",
      x: 0,
      y: 0,
      w: 3.91,
      h: 7.5,
    })
    .addImage({
      path: "./templates/Date_Gradient.png",
      x: 1.31,
      y: 1.77,
      w: 1.92,
      h: 0.3,
    })
    .addImage({
      path: "./templates/DKLogo.png",
      x: 0.23,
      y: 0.25,
      w: 1.96,
      h: 0.56,
    })
    .addText(formatDate(new Date(), " . "), {
      x: 1.31,
      y: 1.77,
      w: 1.92,
      h: 0.3,
      bold: true,
      fontSize: 12,
      fontFace: "Arial",
      align: "center",
      color: "FFFFFF",
    });
  slide
    .addText(projectProperty.name, {
      w: 8.05,
      h: 2.52,
      x: 1.16,
      y: 2.25,
      bold: true,
      fontSize: 48,
      fontFace: "Arial",
      align: "left",
      valign: "top",
      color: "0097E0",
    })
    .addText(projectProperty.customer, {
      w: 6.96,
      h: 1.04,
      x: 1.18,
      y: 5.05,
      bold: true,
      fontSize: 28,
      fontFace: "Arial",
      align: "left",
      valign: "top",
      color: "0097E0",
    })
    .addText(companyProperty.Name, {
      w: 8.5,
      h: 0.37,
      x: 1.18,
      y: 6.36,
      bold: true,
      fontSize: 16,
      fontFace: "Arial",
      align: "left",
      color: "0097E0",
    })
    .addText(projectProperty.fullname, {
      w: 8.05,
      h: 0.4,
      x: 1.18,
      y: 6.68,
      fontSize: 18,
      fontFace: "Arial",
      align: "left",
      color: "0097E0",
    })
    .addText(projectID, {
      w: 1.2,
      h: 0.3,
      x: 12.07,
      y: 7.2,
      fontSize: 12,
      fontFace: "Arial",
      align: "center",
      color: "FFFFFF",
    });

  const fileName = `COVER_${new Date().getTime()}.pptx`;
  await pres.writeFile({ fileName: `${TEMP_OUTPUT}/${fileName}` });
  return {
    Path: fileName,
  };
}

async function genEquipmentList(data, company, sections) {
  const sortOrder = sections.map((x) => {
    if ([CU_F_SECTION_ID, CU_S_SECTION_ID].includes(x.SectionID)) {
      return "CU";
    }
    if ([FCU_F_SECTION_ID, FCU_S_SECTION_ID].includes(x.SectionID)) {
      return "FCU";
    }
    if ([CC_F_SECTION_ID, CC_S_SECTION_ID].includes(x.SectionID)) {
      return "Centralised Controller";
    }
  });

  data.sort((a, b) => {
    // Pass a function to the sort that takes 2 elements to compare
    if (a.Class == b.Class) {
      // If the elements both have the same `type`,
      return a.Class.localeCompare(b.Class); // Compare the elements by `name`.
    } else {
      // Otherwise,
      return sortOrder.indexOf(a.Class) - sortOrder.indexOf(b.Class); // Substract indexes, If element `a` comes first in the array, the returned value will be negative, resulting in it being sorted before `b`, and vice versa.
    }
  });

  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";

  // x is width(h), y is height(v)
  let start_x = 0.09;
  let start_y = 1.82;
  let nx = 0;
  let ny = 0;
  let multiply = 0;
  let slide = null;

  for (let i = 0; i < data.length; i++) {
    // New page every 10 items
    if (i % 10 == 0) {
      slide = pres
        .addNewSlide()
        .addImage({
          path: "./templates/EquipmentSummary_Gradient.png",
          x: 0,
          y: 0.95,
          w: 0.96,
          h: 0.3,
        })
        .addText("Equipment Summary", {
          w: 6.8,
          h: 0.65,
          x: 1.21,
          y: 0.77,
          bold: true,
          fontFace: "Arial",
          fontSize: 32,
          color: "0097E0",
        })
        .addImage({
          path: "./templates/EquipmentSummary_Footer.png",
          x: 0,
          y: 7.01,
          w: 13.33,
          h: 0.51,
        })
        .addText(company.Name, {
          w: 5.35,
          h: 0.47,
          x: 7.59,
          y: 7.03,
          fontFace: "Arial",
          fontSize: 16,
          color: "FFFFFF",
          align: "right",
        });
      start_x = 0.8;
      start_y = 1.88;
      nx = 0;
      ny = 0;
      multiply = 0;
    }
    // New column every 5 items
    if (i % 5 == 0 && i % 10 !== 0) {
      nx = 6.59;
      multiply = 0;
    }
    ny = multiply * 0.9;
    multiply++;

    const each = data[i];
    slide
      .addText(each.Model, {
        w: 2.4,
        h: 0.44,
        x: start_x + nx,
        y: start_y + ny,
        fontFace: "Arial",
        fontSize: 16,
      })
      .addText(
        `(${each.Quantity})${each.Series}${
          each.Description ? " " + each.Description : ""
        }`,
        {
          w: 2.69,
          h: 0.44,
          x: start_x + 3.13 + nx,
          y: start_y + ny,
          fontFace: "Arial",
          fontSize: 16,
        }
      );
    const seriesData = await Series.findByPk(each.Series);
    if (seriesData) {
      if (seriesData.ImagePath) {
        const filepath = await downloadToTemp(
          seriesData.ImagePath,
          MEDIA
        ).catch((err) => {
          console.log(`Unable to load image : ${seriesData.ImagePath}`);
          console.error(err);
        });
        if (filepath) {
          slide.addImage({
            path: filepath,
            w: 0.54,
            h: 0.54,
            x: start_x + 2.2 + nx,
            y: start_y - 0.07 + ny,
          });
        }
      }
    }
  }

  const fileName = `EQUIPMENT_LIST_${new Date().getTime()}.pptx`;
  await pres.writeFile({ fileName: `${TEMP_OUTPUT}/${fileName}` });
  return {
    Path: fileName,
  };
}

async function getSection(array, user, lang) {
  const sectionArray = new Set();
  const subSectionArray = new Set();
  const dataArray = [];

  const companyProfileFile = await CompanyProfileFile.findOne({
    where: { CompanyCode: user.CompanyCode },
  });
  if (companyProfileFile && user.CompanyCode.startsWith("INT")) {
    sectionArray.add(PROFILE_SECTION_ID);
  }

  sectionArray.add(EQUIP_SECTION_ID);

  for (const data of array) {
    //--------------------------------------------------------------------------------------------------------------
    //-------------- model file section ----------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------
    const model = await Model.findByPk(data.ModelID);
    if (!model) {
      continue;
    }

    const modelClassName = convertClass(model.ClassID);
    const modelFiles = await model.getModelFiles({
      // where: { LangID: lang }
    });
    if (modelFiles.length == 0) {
      continue;
    }

    const modelGlobalLangs = [];
    const modelLocalLangs = [];
    modelFiles.forEach((f) => {
      if (
        [CU_S_GENERAL, FCU_S_GENERAL, CC_S_GENERAL].includes(f.SubSectionID)
      ) {
        // modelLang.add(f.LangID)
        if (f.Zone === ZONE_GLOBAL) {
          modelGlobalLangs.push({ LangID: f.LangID, Path: f.Path });
        }
        if (f.Zone === ZONE_LOCAL) {
          modelLocalLangs.push({ LangID: f.LangID, Path: f.Path });
        }
      }
    });
    if (modelGlobalLangs.length == 0 && modelLocalLangs.length == 0) {
      continue;
    }
    const modelLang = {
      globalLangs: modelGlobalLangs,
      localLangs: modelLocalLangs,
    };

    /*const series = await Series.findByPk(model.SeriesID)
        const sfileLang = new Set()
        const s_files = await series.getSeriesFiles({
            where: { LangID: lang }
        })
        s_files.forEach(x => {
            sfileLang.add(x.LangID)
        })*/

    // Add SubSection
    for (const file of modelFiles) {
      subSectionArray.add(file.SubSectionID);
    }

    // Add Model Class (Spec)
    switch (modelClassName) {
      case "FCU":
        sectionArray.add(FCU_S_SECTION_ID);
        break;
      case "CU":
        sectionArray.add(CU_S_SECTION_ID);
        break;
      case "CC":
        sectionArray.add(CC_S_SECTION_ID);
        break;
    }
    //---------------------------------------------------------------------------------------------------------------
    //-------------- series file section ----------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------------------------
    const series = await Series.findByPk(model.SeriesID);
    if (!series) {
      continue;
    }
    const seriesClassName = convertClass(series.ClassID);
    const seriesFiles = await series.getSeriesFiles({});
    //if(seriesFiles.length == 0){ continue }

    const seriesGlobalLangs = [];
    const seriesLocalLangs = [];
    seriesFiles.forEach((f) => {
      if (f.Zone === ZONE_GLOBAL) {
        seriesGlobalLangs.push(f.LangID);
      }
      if (f.Zone === ZONE_LOCAL) {
        seriesLocalLangs.push(f.LangID);
      }
    });

    const seriesLang = {
      globalLangs: seriesGlobalLangs,
      localLangs: seriesLocalLangs,
    };
    //if(seriesLang.size == 0){ continue }

    // Add Sereies Class (Feature)
    switch (seriesClassName) {
      case "FCU":
        sectionArray.add(FCU_F_SECTION_ID);
        break;
      case "CU":
        sectionArray.add(CU_F_SECTION_ID);
        break;
      case "CC":
        sectionArray.add(CC_F_SECTION_ID);
        break;
    }

    dataArray.push({
      Model: model.ModelID,
      Class: modelClassName,
      Series: model.SeriesID,
      Quantity: data.Quantity,
      Description: data.Description,
      CreatedDate: model.CreatedDate,
      ModelLanguage: modelLang,
      SeriesLanguage: seriesLang,
      SelectedLanguage: data.LangID || null,
    });
  }

  let sections = [];
  if (null != sectionArray) {
    for (const secId of sectionArray) {
      let sectionOb = await Section.findByPk(secId);
      sections.push({
        Id: sectionOb.SectionID,
        Name: sectionOb.Name,
      });
    }
  }

  return {
    sectionArray: sections,
    subSectionArray: Array.from(subSectionArray),
    dataArray,
  };
}

async function getSequenceNumber(type) {
  const result = await sequelize.transaction(async (t) => {
    const data = await ProposalSequence.findByPk(type, {
      lock: true,
      transaction: t,
    });
    if (!data) {
      throw Error("No Sequence!");
    }
    data.Num += 1;
    await data.save({
      lock: true,
      transaction: t,
    });
    switch (type) {
      case PROJECT:
        return "P" + String(data.Num).padStart(8, "0");
      case GENERIC:
        return "G" + String(data.Num).padStart(8, "0");
    }
  });
  return result;
}
