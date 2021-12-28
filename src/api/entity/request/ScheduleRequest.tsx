import {AuditoryRequest} from "./AuditoryRequest";
import {GroupRequest} from "./GroupRequest";
import {DayRequest} from "./DayRequest";
import {TimeRequest} from "./TimeRequest";

export interface ScheduleRequest {
    auditory: AuditoryRequest
    group: GroupRequest
    week: number
    day: DayRequest
    time: TimeRequest
}