"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergePPTX = void 0;
const asposeslidescloud_1 = require("asposeslidescloud");
const fs_1 = require("fs");
const file_1 = require("../shared/constants/file");
const slidesApi = new asposeslidescloud_1.SlidesApi(null, null, "http://localhost:8088");
const mergePPTX = async (fileList, fileName) => {
    console.log("Merging PPTX via ASPOSE...");
    for (let i = 0; i < fileList.length; i++) {
        const eachFile = fileList[i];
        if (i == 0) {
            await slidesApi.convertAndSave((0, fs_1.createReadStream)(`${file_1.TEMP_OUTPUT}/${eachFile.file}`), asposeslidescloud_1.ExportFormat.Pptx, `${file_1.TEMP_OUTPUT}/${fileName}`, null, null, null, [eachFile.Page]);
        }
        else {
            await slidesApi.copySlide(fileName, eachFile.Page, null, `${file_1.TEMP_OUTPUT}/${eachFile.file}`, null, null, null, file_1.TEMP_OUTPUT);
        }
    }
    console.log("Writing merged PPTX file to local...");
};
exports.mergePPTX = mergePPTX;
//# sourceMappingURL=proposal-helper.js.map