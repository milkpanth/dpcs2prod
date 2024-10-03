"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.beforeUpdateStatusInUse = void 0;
const DataStateEnum_1 = require("../shared/enum/DataStateEnum");
const beforeUpdateStatusInUse = (relationKeys, liveStatus, IsEndOfLive) => {
    let status = DataStateEnum_1.Use.Broken;
    if (IsEndOfLive)
        return (status = DataStateEnum_1.Use.EOL);
    if (!relationKeys) {
        if (liveStatus === DataStateEnum_1.Live.Live)
            return (status = DataStateEnum_1.Use.Broken);
    }
    else {
        if (liveStatus === DataStateEnum_1.Live.Live)
            return (status = DataStateEnum_1.Use.Using);
        if (liveStatus === DataStateEnum_1.Live.New)
            return (status = DataStateEnum_1.Use.New);
        if (liveStatus === DataStateEnum_1.Live.Pending)
            return (status = DataStateEnum_1.Use.Using);
    }
    return status;
};
exports.beforeUpdateStatusInUse = beforeUpdateStatusInUse;
//# sourceMappingURL=before-update-status-inuse.js.map