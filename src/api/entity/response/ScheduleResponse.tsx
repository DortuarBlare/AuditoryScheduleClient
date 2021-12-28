import {AuditoryResponse} from "./AuditoryResponse";
import {GroupResponse} from "./GroupResponse";
import {DayResponse} from "./DayResponse";
import {TimeResponse} from "./TimeResponse";

export interface ScheduleResponse {
    id: number
    auditory: AuditoryResponse
    group: GroupResponse
    week: number
    day: DayResponse
    time: TimeResponse
}