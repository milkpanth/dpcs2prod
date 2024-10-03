"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInUseStatusWithDeletedOrBroken = exports.getInUseStatus = exports.getInLiveStatus = void 0;
const DataStateEnum_1 = require("../../shared/enum/DataStateEnum");
const DataStateEnum_2 = require("./../../shared/enum/DataStateEnum");
const getInUseStatus = (live, use) => {
    if (use === DataStateEnum_2.Use.Deleted || use === DataStateEnum_2.Use.EOL) {
        return use;
    }
    return live === DataStateEnum_1.Live.New ? DataStateEnum_2.Use.New : DataStateEnum_2.Use.Using;
};
exports.getInUseStatus = getInUseStatus;
const getInLiveStatus = (live) => {
    if (live === DataStateEnum_1.Live.EOL || live === DataStateEnum_1.Live.Queued) {
        return live;
    }
    return live === DataStateEnum_1.Live.New ? DataStateEnum_1.Live.New : DataStateEnum_1.Live.Pending;
};
exports.getInLiveStatus = getInLiveStatus;
const getInUseStatusWithDeletedOrBroken = (use) => {
    return use === DataStateEnum_2.Use.Deleted ? DataStateEnum_2.Use.Deleted : DataStateEnum_2.Use.Broken;
};
exports.getInUseStatusWithDeletedOrBroken = getInUseStatusWithDeletedOrBroken;
//# sourceMappingURL=status.js.map