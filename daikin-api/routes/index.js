const express = require("express");
const userController = require("../controllers/userController");
const roleController = require("../controllers/roleController");
const menuListController = require("../controllers/menuListController");
const actionController = require("../controllers/actionController");
const modelController = require("../controllers/modelController");
const seriesController = require("../controllers/seriesController");
const genericTypeController = require("../controllers/genericTypeController");
const genericSubTypeController = require("../controllers/genericSubTypeController");
const genericFileController = require("../controllers/genericFileController");
const proposalSectionController = require("../controllers/proposalSectionController");
const languageController = require("../controllers/languageController");
const fileController = require("../controllers/fileController");
const companyProfileController = require("../controllers/companyProfileController");
const logController = require("../controllers/logController");
const dashboardController = require("../controllers/dashboardController");
const proposalController = require("../controllers/proposalController");

const {
  uploadExcelFile,
  uploadPowerPointFile,
} = require("../middlewares/multer");
const {
  aadMiddleware,
  roleMiddleware,
  multipleRoleMiddleware,
} = require("../middlewares/azure");
const {
  setPermission,
  setMultiplePermission,
  TYPE_OF_ACTION,
} = require("../helpers/permission");
const authRoleMiddleware = [aadMiddleware, roleMiddleware];
const authMultipleRoleMiddleware = [aadMiddleware, multipleRoleMiddleware];
const router = express.Router();
router.get('/', (req,res)=> res.status(200).end())
// User
router.get("/setRecentLogin", authRoleMiddleware, userController.recentLogin);
router.post("/user", authRoleMiddleware, userController.create);
router.get(
  "/user/list",
  [
    setMultiplePermission([
      {
        menu: 7,
        action: TYPE_OF_ACTION.READ,
      },
      {
        menu: 8,
        action: TYPE_OF_ACTION.READ,
      },
    ]),
    authMultipleRoleMiddleware,
  ],
  userController.list
);
router.put(
  "/user/:user_id",
  [
    setMultiplePermission([
      {
        menu: 7,
        action: TYPE_OF_ACTION.MODIFY,
      },
      {
        menu: 8,
        action: TYPE_OF_ACTION.MODIFY,
      },
    ]),
    authMultipleRoleMiddleware,
  ],
  userController.edit
);
router.delete(
  "/user/:user_id",
  [
    setMultiplePermission([
      {
        menu: 7,
        action: TYPE_OF_ACTION.DELETE,
      },
      {
        menu: 8,
        action: TYPE_OF_ACTION.DELETE,
      },
    ]),
    authMultipleRoleMiddleware,
  ],
  userController.delete
);
router.post(
  "/user/review",
  [setPermission(7, TYPE_OF_ACTION.MODIFY), authRoleMiddleware],
  userController.review
);
router.post(
  "/user/pendingDataTable",
  [setPermission(7, TYPE_OF_ACTION.READ), authRoleMiddleware],
  userController.dataTable
);
router.get("/user/roles", authRoleMiddleware, userController.viewRole);
router.get("/user/self", authRoleMiddleware, userController.viewInfo);
// Role
router.get("/role/allRole", authRoleMiddleware, roleController.allRole);
router.get(
  "/role/list",
  [setPermission(9, TYPE_OF_ACTION.READ), authRoleMiddleware],
  roleController.list
);
router.post(
  "/role/add",
  [setPermission(9, TYPE_OF_ACTION.MODIFY), authRoleMiddleware],
  roleController.save
);
router.put(
  "/role/:role_id",
  [setPermission(9, TYPE_OF_ACTION.MODIFY), authRoleMiddleware],
  roleController.edit
);
router.delete(
  "/role/:role_id",
  [setPermission(9, TYPE_OF_ACTION.DELETE), authRoleMiddleware],
  roleController.delete
);
// Menu
router.get("/menu/list", authRoleMiddleware, menuListController.list);
// Action
router.get("/action/list", authRoleMiddleware, actionController.list);
// Model
router.post(
  "/model/dataTable",
  [setPermission(1, TYPE_OF_ACTION.READ), authRoleMiddleware],
  modelController.dataTable
);
router.get("/model/list", authRoleMiddleware, modelController.list);
router.post(
  "/model/import",
  [setPermission(1, TYPE_OF_ACTION.MODIFY), authRoleMiddleware],
  modelController.add
);
router.patch(
  "/model/:id",
  [setPermission(1, TYPE_OF_ACTION.MODIFY), authRoleMiddleware],
  modelController.edit
);
router.get(
  "/model/download",
  [setPermission(1, TYPE_OF_ACTION.READ), authRoleMiddleware],
  modelController.downloadExcel
);
router.get(
  "/model/download/:fileId",
  [setPermission(1, TYPE_OF_ACTION.READ), authRoleMiddleware],
  modelController.downloadPowerPoint
);
router.get(
  "/model/preview/:fileId",
  [setPermission(1, TYPE_OF_ACTION.READ), authRoleMiddleware],
  modelController.previewPowerPoint
);
// Series
router.post(
  "/series/dataTable",
  [setPermission(2, TYPE_OF_ACTION.READ), authRoleMiddleware],
  seriesController.dataTable
);
router.get("/series/list", authRoleMiddleware, seriesController.list);
router.post(
  "/series/import",
  [setPermission(2, TYPE_OF_ACTION.MODIFY), authRoleMiddleware],
  seriesController.add
);
router.patch(
  "/series/:id",
  [setPermission(2, TYPE_OF_ACTION.MODIFY), authRoleMiddleware],
  seriesController.edit
);
router.get(
  "/series/download",
  [setPermission(2, TYPE_OF_ACTION.READ), authRoleMiddleware],
  seriesController.downloadExcel
);
router.get(
  "/series/download/:fileId",
  [setPermission(2, TYPE_OF_ACTION.READ), authRoleMiddleware],
  seriesController.downloadPowerPoint
);
router.get(
  "/series/preview/:fileId",
  [setPermission(2, TYPE_OF_ACTION.READ), authRoleMiddleware],
  seriesController.previewPowerPoint
);
// GenericType
router.post(
  "/genericType/dataTable",
  [setPermission(4, TYPE_OF_ACTION.READ), authRoleMiddleware],
  genericTypeController.dataTable
);
router.get("/genericType/list", authRoleMiddleware, genericTypeController.list);
router.post(
  "/genericType/add",
  [setPermission(4, TYPE_OF_ACTION.MODIFY), authRoleMiddleware],
  genericTypeController.create
);
router.patch(
  "/genericType/:id",
  [setPermission(4, TYPE_OF_ACTION.MODIFY), authRoleMiddleware],
  genericTypeController.edit
);
router.delete(
  "/genericType/:id",
  [setPermission(4, TYPE_OF_ACTION.DELETE), authRoleMiddleware],
  genericTypeController.delete
);
// GenericSubType
router.post(
  "/genericSubType/dataTable",
  [setPermission(4, TYPE_OF_ACTION.READ), authRoleMiddleware],
  genericSubTypeController.dataTable
);
router.get(
  "/genericSubType/list",
  authRoleMiddleware,
  genericSubTypeController.list
);
router.post(
  "/genericSubType/add",
  [setPermission(4, TYPE_OF_ACTION.MODIFY), authRoleMiddleware],
  genericSubTypeController.create
);
router.patch(
  "/genericSubType/:id",
  [setPermission(4, TYPE_OF_ACTION.MODIFY), authRoleMiddleware],
  genericSubTypeController.edit
);
router.delete(
  "/genericSubType/:id",
  [setPermission(4, TYPE_OF_ACTION.DELETE), authRoleMiddleware],
  genericSubTypeController.delete
);
// GenericFile
router.post(
  "/genericFile/dataTable",
  authRoleMiddleware,
  genericFileController.dataTable
);
router.post(
  "/genericFile/add",
  [setPermission(4, TYPE_OF_ACTION.MODIFY), authRoleMiddleware],
  genericFileController.create
);
router.patch(
  "/genericFile/:id",
  [setPermission(4, TYPE_OF_ACTION.MODIFY), authRoleMiddleware],
  genericFileController.edit
);
router.delete(
  "/genericFile/:id",
  [setPermission(4, TYPE_OF_ACTION.DELETE), authRoleMiddleware],
  genericFileController.delete
);
router.get(
  "/genericFile/download/:fileId",
  [setPermission(4, TYPE_OF_ACTION.READ), authRoleMiddleware],
  genericFileController.downloadPowerPoint
);
router.get(
  "/genericFile/preview/:fileId",
  [setPermission(4, TYPE_OF_ACTION.READ), authRoleMiddleware],
  genericFileController.previewPowerPoint
);
// CompanySection
router.put(
  "/proposalSection/order",
  [setPermission(3, TYPE_OF_ACTION.MODIFY), authRoleMiddleware],
  proposalSectionController.updateOrder
);
router.post(
  "/proposalSection/add",
  [setPermission(3, TYPE_OF_ACTION.MODIFY), authRoleMiddleware],
  proposalSectionController.create
);
router.patch(
  "/proposalSection/:id",
  [setPermission(3, TYPE_OF_ACTION.MODIFY), authRoleMiddleware],
  proposalSectionController.editSection
);
router.patch(
  "/proposalSubSection/:id",
  [setPermission(3, TYPE_OF_ACTION.MODIFY), authRoleMiddleware],
  proposalSectionController.editSubSection
);
router.delete(
  "/proposalSection/:id",
  [setPermission(3, TYPE_OF_ACTION.MODIFY), authRoleMiddleware],
  proposalSectionController.delete
);
router.post(
  "/proposalSection/dataTable",
  [setPermission(3, TYPE_OF_ACTION.READ), authRoleMiddleware],
  proposalSectionController.dataTable
);
router.get(
  "/proposalSection/list",
  authRoleMiddleware,
  proposalSectionController.list
);
// CompanyProfile
router.post(
  "/companyProfile/dataTable",
  [setPermission(5, TYPE_OF_ACTION.READ), authRoleMiddleware],
  companyProfileController.dataTable
);
router.get(
  "/companyProfile/list",
  [setPermission(5, TYPE_OF_ACTION.READ), authRoleMiddleware],
  companyProfileController.list
);
router.post(
  "/companyProfile/save",
  [setPermission(5, TYPE_OF_ACTION.MODIFY), authRoleMiddleware],
  companyProfileController.save
);
router.get(
  "/companyProfile/:fileId",
  [setPermission(5, TYPE_OF_ACTION.READ), authRoleMiddleware],
  companyProfileController.previewPowerPoint
);
// Language
router.get("/language/list", authRoleMiddleware, languageController.list);
// Proposal
router.get(
  "/proposal/summary",
  [setPermission(6, TYPE_OF_ACTION.READ), authRoleMiddleware],
  proposalController.getSummery
);
router.get(
  "/proposal/equipment/:pid",
  [setPermission(6, TYPE_OF_ACTION.MODIFY), authRoleMiddleware],
  proposalController.getEquipment
);
router.post(
  "/proposal/equipment",
  [setPermission(6, TYPE_OF_ACTION.MODIFY), authRoleMiddleware],
  proposalController.readEquipment
);
router.post(
  "/proposal/generate/project",
  [setPermission(6, TYPE_OF_ACTION.MODIFY), authRoleMiddleware],
  proposalController.generateProject
);
router.post(
  "/proposal/generate/generic",
  [setPermission(6, TYPE_OF_ACTION.MODIFY), authRoleMiddleware],
  proposalController.generateGeneric
);
router.post(
  "/proposal/save",
  [setPermission(6, TYPE_OF_ACTION.MODIFY), authRoleMiddleware],
  proposalController.save
);
//router.put('/proposal/generic/:pid', [setPermission(6, TYPE_OF_ACTION.MODIFY), authRoleMiddleware], proposalController.updateGeneric)
router.post(
  "/proposal/dataTable",
  [setPermission(6, TYPE_OF_ACTION.READ), authRoleMiddleware],
  proposalController.dataTable
);

router.get(
  "/proposal/status/:pid",
  [setPermission(6, TYPE_OF_ACTION.READ), authRoleMiddleware],
  proposalController.generateStatus
);
router.get(
  "/proposal/preview/:pid",
  [setPermission(6, TYPE_OF_ACTION.READ), authRoleMiddleware],
  proposalController.previewPowerPoint
);

router.delete(
  "/proposal/:pid",
  [setPermission(6, TYPE_OF_ACTION.DELETE), authRoleMiddleware],
  proposalController.delete
);
router.get(
  "/proposal/download/pptx/:pid",
  [setPermission(6, TYPE_OF_ACTION.READ), authRoleMiddleware],
  proposalController.downloadPowerPoint
);
router.get(
  "/proposal/download/pdf/:pid",
  [setPermission(6, TYPE_OF_ACTION.READ), authRoleMiddleware],
  proposalController.downloadPDF
);
// Dashboard
router.post(
  "/dashboard/dataTable",
  [setPermission(10, TYPE_OF_ACTION.READ), authRoleMiddleware],
  dashboardController.dataTable
);
router.post(
  "/dashboard/chart",
  [setPermission(10, TYPE_OF_ACTION.READ), authRoleMiddleware],
  dashboardController.chartSummary
);
// Log
router.post(
  "/log/dataTable",
  [setPermission(11, TYPE_OF_ACTION.READ), authRoleMiddleware],
  logController.dataTable
);
// File
router.post(
  "/uploadExcel",
  [authRoleMiddleware, uploadExcelFile],
  fileController.uploadExcel
);
router.post(
  "/uploadPowerPoint",
  [authRoleMiddleware, uploadPowerPointFile],
  fileController.uploadPowerPoint
);
//router.get("/previewPowerPoint/:blobName", fileController.previewPowerPoint);
router.get("/previewPowerPoint/:type/:id", fileController.listPreviewImage);

module.exports = router;
