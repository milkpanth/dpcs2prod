"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.beforeUpdateStatusInLive = void 0;
const DataStateEnum_1 = require("../shared/enum/DataStateEnum");
const beforeUpdateStatusInLive = (relationKeys, liveStatus) => {
    let status = DataStateEnum_1.Live.New;
    if (liveStatus === DataStateEnum_1.Live.New) {
        return (status = DataStateEnum_1.Live.New);
    }
    else {
        return (status = DataStateEnum_1.Live.Pending);
    }
};
exports.beforeUpdateStatusInLive = beforeUpdateStatusInLive;
//# sourceMappingURL=before-update-status-inlive.js.map