import React, {useEffect, useState} from 'react'
import {ScheduleForm} from './ScheduleForm'
import {Property} from '../../Property'
import {ScheduleResponse} from '../../api/entity/response/ScheduleResponse'
import {ScheduleRequest} from '../../api/entity/request/ScheduleRequest'
import {deleteSchedule, getScheduleList, updateSchedule} from "../../api/ScheduleApi";
import './ScheduleCard.css'
import '../../main.css'

interface Props {
    schedule: ScheduleResponse
    scheduleRequest: (s: ScheduleRequest) => void
}

export const ScheduleCard: React.FC<Props> = ({schedule}) => {
    const [isSchedule, setIsSchedule] = useState<ScheduleResponse[]>()
    const [isEdit, setIsEdit] = useState(false)

    const refresh = () => {
        return getScheduleList().then(res => setIsSchedule(res))
    }

    useEffect(() => {
        refresh()
    }, [])

    const onEdit = (newSchedule: ScheduleRequest) => {
        updateSchedule(schedule.id, newSchedule).finally(() => refresh())
        setIsEdit(false)
    }

    const onDelete = () => {
        deleteSchedule(schedule.id).finally(() => refresh())
    }

    return (
        <div className="card schedule-card">
            {isEdit ?
                <ScheduleForm schedule={schedule} onSubmit={onEdit}/>
                :
                <div className="schedule-card-main">
                    <Property title="Аудитория:"
                              value={schedule.auditory.auditoryName}/>
                    <Property title="Группа:"
                              value={schedule.group.groupName}/>
                    <Property title="Неделя:" value={schedule.week}/>
                    <Property title="День недели:" value={schedule.day.day}/>
                    <Property title="Время:" value={schedule.time.startTime + " - " + schedule.time.endTime}/>
                </div>
            }
            <div className="schedule-card-controls">
                <button className="button buttonDarkBlue"
                        onClick={() => setIsEdit(!isEdit)}>{isEdit ? 'Закрыть' : 'Редактировать'}</button>
                <button className="button buttonRed" onClick={onDelete}>Удалить</button>
            </div>
        </div>
    )
}