"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forceJsonStringify = void 0;
function forceJsonStringify(object) {
    if (!object) {
        return '{}';
    }
    try {
        return JSON.stringify(object);
    }
    catch (_a) {
        return JSON.stringify({ rawData: object });
    }
}
exports.forceJsonStringify = forceJsonStringify;
//# sourceMappingURL=utils.js.map