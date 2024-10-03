import { Live } from "../../shared/enum/DataStateEnum";
import { Use } from "./../../shared/enum/DataStateEnum";
declare const getInUseStatus: (live: Live, use: Use) => Use;
declare const getInLiveStatus: (live: Live) => Live;
declare const getInUseStatusWithDeletedOrBroken: (use: Use) => Use;
export { getInLiveStatus, getInUseStatus, getInUseStatusWithDeletedOrBroken };
