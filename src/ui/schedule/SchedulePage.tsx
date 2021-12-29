import {addSchedule, deleteSchedule, getScheduleList, updateSchedule} from "../../api/ScheduleApi";
import React, {useEffect, useState} from 'react';
import {ScheduleForm} from './ScheduleForm';
import {ScheduleRequest} from '../../api/entity/request/ScheduleRequest'
import {ScheduleResponse} from '../../api/entity/response/ScheduleResponse'
import './SchedulePage.css'
import './ScheduleForm.css'
import './ScheduleCard.css'
import '../../main.css'
import {Property} from "../../Property";

export const SchedulePage: React.FC = () => {
    const [addFormShow, setAddFormShow] = useState(false)
    const [schedules, setSchedules] = useState<ScheduleResponse[]>()
    const [idToEdit, setIdToEdit] = useState(0)

    const [isEdit, setIsEdit] = useState(false)

    const refresh = () => {
        return getScheduleList().then(res => setSchedules(res))
    }

    useEffect(() => {
        refresh()
    }, [])

    const onAddSubmit = (id: number | undefined, schedule: ScheduleRequest) => {
        addSchedule(schedule).finally(() => refresh())
        setAddFormShow(false)
    }

    const onEdit = (id: number | undefined, newSchedule: ScheduleRequest) => {
        if (id != undefined) updateSchedule(id, newSchedule).finally(() => refresh())
        setIsEdit(false)
    }

    return (
        <div className="schedule-page">
            <div className="card schedule-form">
                <button className="button buttonDarkBlue" onClick={() => setAddFormShow(!addFormShow)}>
                    {`${addFormShow ? 'Закрыть' : 'Добавить'}`}
                </button>
                {addFormShow && <ScheduleForm onSubmit={onAddSubmit}/>}
            </div>

            <div>
                {
                    schedules !== undefined &&
                    schedules.map(sched =>
                        <div className="card schedule-card" key={sched.id}>
                            {
                                (isEdit && idToEdit == sched.id) ? <ScheduleForm schedule={sched} onSubmit={onEdit}/>
                                :
                                <div className="schedule-card-main">
                                    <Property title="Аудитория:"
                                              value={sched.auditory.auditoryName}/>
                                    <Property title="Группа:"
                                              value={sched.group.groupName}/>
                                    <Property title="Неделя:" value={sched.week}/>
                                    <Property title="День недели:" value={sched.day.day}/>
                                    <Property title="Время:" value={sched.time.startTime + " - " + sched.time.endTime}/>
                                </div>
                            }
                            <div className="schedule-card-controls">
                                <button className="button buttonDarkBlue" onClick={() => {
                                    setIdToEdit(sched.id)
                                    setIsEdit(!isEdit)
                                }}>
                                    {(isEdit && idToEdit == sched.id) ? 'Закрыть' : 'Редактировать'}
                                </button>
                                <button className="button buttonRed" onClick={() =>deleteSchedule(sched.id).finally(() => refresh())}>Удалить</button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}