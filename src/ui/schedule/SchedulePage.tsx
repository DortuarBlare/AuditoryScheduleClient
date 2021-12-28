import React, {useEffect, useState } from 'react';
import { ScheduleCard } from './ScheduleCard';
import { ScheduleForm } from './ScheduleForm';
import {ScheduleRequest} from '../../api/entity/request/ScheduleRequest'
import {ScheduleResponse} from '../../api/entity/response/ScheduleResponse'
import {addSchedule, getScheduleList} from "../../api/ScheduleApi";
import './SchedulePage.css'
import './ScheduleForm.css'
import './ScheduleCard.css'
import '../../main.css'

export const SchedulePage: React.FC = () => {
    const [addFormShow, setAddFormShow] = useState(false)
    const [isSchedule, setIsSchedule] = useState<ScheduleResponse[]>()

    const refresh = () => {
        isSchedule !== undefined && isSchedule.map(sched => console.log(sched))
        return getScheduleList().then(res => setIsSchedule(res))
    }

    useEffect(() => {
        refresh()
    },[])

    const onAddSubmit = (schedule: ScheduleRequest) => {
        addSchedule(schedule).finally(() => refresh())
        setAddFormShow(false)
    }

    return (
        <div className="schedule-page">
            <div className="card schedule-form">
                <button className="button buttonDarkBlue" onClick={() => setAddFormShow(!addFormShow)}>
                    {`${addFormShow ? 'Закрыть' : 'Добавить'}`}
                </button>
                {addFormShow && <ScheduleForm onSubmit={onAddSubmit} />}
            </div>

            <div>
                {
                    isSchedule !== undefined &&
                    isSchedule.map(sched => <ScheduleCard key={sched.id} schedule={sched}
                    scheduleRequest={s => getScheduleList().finally(() => refresh())}/>)
                }
            </div>
        </div>
    )
}