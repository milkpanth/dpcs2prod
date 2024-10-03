"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIpFromRequest = void 0;
const getIpFromRequest = (req) => {
    const forwardedRemote = req.headers["x-real-ip"] ||
        req.headers["x-forwarded-for"];
    const proxyRemote = req.ip || req.connection.remoteAddress;
    const ip = forwardedRemote ? forwardedRemote : proxyRemote;
    if (ip && ip.substr(0, 7) === "::ffff:") {
        return ip.substr(7);
    }
    return ip;
};
exports.getIpFromRequest = getIpFromRequest;
//# sourceMappingURL=ip-address.helpers.js.map