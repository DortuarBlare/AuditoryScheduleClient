import {
    URL_SCHEDULE, METHOD_PUT, METHOD_DELETE, URL_DELETE_PUT_SCHEDULE,
    METHOD_POST, URL_GET_POST_AUDITORY, URL_DELETE_PUT_AUDITORY, api, URL_GET_POST_GROUP, URL_DELETE_PUT_GROUP
} from './Api'
import {ScheduleRequest} from './entity/request/ScheduleRequest'
import {ScheduleResponse} from './entity/response/ScheduleResponse'
import {AuditoryRequest} from './entity/request/AuditoryRequest'
import {AuditoryResponse} from './entity/response/AuditoryResponse'
import {GroupRequest} from './entity/request/GroupRequest'
import {GroupResponse} from './entity/response/GroupResponse'

export function addAuditory(auditory: AuditoryRequest): Promise<AuditoryResponse> {
    return api<AuditoryResponse>(URL_GET_POST_AUDITORY(), METHOD_POST(auditory) )
}

export function getAuditoryList(): Promise<Array<AuditoryResponse>> {
    return api<Array<AuditoryResponse>>(URL_GET_POST_AUDITORY())
}

export function updateAuditory(auditoryID: number, auditory: AuditoryRequest): Promise<AuditoryResponse> {
    return api(URL_DELETE_PUT_AUDITORY(auditoryID), METHOD_PUT(auditory))
}

export function deleteAuditory(auditoryID: number) {
    return api(URL_DELETE_PUT_AUDITORY(auditoryID), METHOD_DELETE())
}


export function addGroup(group: GroupRequest): Promise<GroupResponse> {
    return api<GroupResponse>(URL_GET_POST_GROUP(), METHOD_POST(group) )
}

export function getGroupList(): Promise<Array<GroupResponse>> {
    return api<Array<GroupResponse>>(URL_GET_POST_GROUP())
}

export function updateGroup(groupID: number, group: GroupRequest): Promise<GroupResponse> {
    return api(URL_DELETE_PUT_GROUP(groupID), METHOD_PUT(group))
}

export function deleteGroup(groupID: number) {
    return api(URL_DELETE_PUT_GROUP(groupID), METHOD_DELETE())
}


export function addSchedule(schedule: ScheduleRequest): Promise<ScheduleResponse> {
    return api<ScheduleResponse>(URL_SCHEDULE(), METHOD_POST(schedule) )
}

export function getScheduleList(): Promise<Array<ScheduleResponse>> {
    return api<Array<ScheduleResponse>>(URL_SCHEDULE())
}

export function updateSchedule(scheduleID: number, schedule: ScheduleRequest): Promise<ScheduleResponse> {
    return api(URL_DELETE_PUT_SCHEDULE(scheduleID), METHOD_PUT(schedule))
}

export function deleteSchedule(scheduleID: number) {
    return api(URL_DELETE_PUT_SCHEDULE(scheduleID), METHOD_DELETE())
}