"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartDashboardQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const table_dashboard_query_dto_1 = require("./table-dashboard-query.dto");
class ChartDashboardQueryDto extends (0, swagger_1.OmitType)(table_dashboard_query_dto_1.TableDashboardQueryDto, [
    "limit",
    "page",
]) {
}
exports.ChartDashboardQueryDto = ChartDashboardQueryDto;
//# sourceMappingURL=chart-dashboard-query.dto.js.map