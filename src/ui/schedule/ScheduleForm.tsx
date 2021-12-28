import {getAuditoryList, getGroupList, getScheduleList} from "../../api/ScheduleApi";
import React, {useEffect, useState} from 'react'
import { Property } from '../../Property'
import {ScheduleResponse} from '../../api/entity/response/ScheduleResponse'
import {ScheduleRequest} from '../../api/entity/request/ScheduleRequest'
import {AuditoryResponse} from "../../api/entity/response/AuditoryResponse"
import {GroupResponse} from "../../api/entity/response/GroupResponse";
import './ScheduleForm.css'

interface Props {
    schedule?: ScheduleRequest
    onSubmit: (schedule: ScheduleRequest) => void
}

export const ScheduleForm: React.FC<Props> = ({ schedule, onSubmit }) => {
    const [isSchedule, setIsSchedule] = useState<ScheduleResponse[]>()
    const [isAuditory, setIsAuditory] = useState<AuditoryResponse[]>()
    const [isGroup, setIsGroup] = useState<GroupResponse[]>()

    const [auditory, setAuditory] = useState(schedule?.auditory.auditoryName);
    const [group, setGroup] = useState(schedule?.group.groupName);
    const [week, setWeek] = useState(schedule?.week ?? 0)
    const [day_, setDay_] = useState(schedule?.day.day ?? '')
    const [startTime_, setStartTime_] = useState(schedule?.time.startTime ?? '')
    const [endTime_, setEndTime_] = useState(schedule?.time.endTime ?? '')

    const refresh = () => {
        getScheduleList().then(res => setIsSchedule(res))
        getGroupList().then(res => setIsGroup(res))
        return getAuditoryList().then(res => setIsAuditory(res))
    }

    useEffect(() => {
        refresh()
    },[])

    const onClick = () => {
        if (week == 0 || day_ === '' || startTime_ === '' || endTime_ === '' || auditory === '' || group === '') return
        onSubmit({
            auditory: { auditoryName: auditory ?? '' },
            group: { groupName: group ?? '' },
            week,
            day: {day: day_},
            time: {startTime: startTime_, endTime: endTime_}
        })
    }

    return (
        <div className="schedule-form">
            <Property title="Аудитория:" value={
                <select defaultValue="default-auditory" onChange={e => setAuditory(e.target.value)}>
                    <option disabled value="default-auditory">Выберите аудиторию</option>
                    {
                        isAuditory !== undefined &&
                        isAuditory.map(
                            aud =>
                                <option key={aud.id} value={aud.auditoryName}>
                                    {aud.auditoryName}
                                </option>
                        )
                    }
                </select>
            } />

            <Property title="Группа:" value={
                <select defaultValue="default-group" onChange={e => setGroup(e.target.value)}>
                    <option disabled value="default-group">Выберите группу</option>
                    {
                        isGroup !== undefined &&
                        isGroup.map(
                            gr =>
                                <option key={gr.id} value={gr.groupName}>
                                    {gr.groupName}
                                </option>)
                    }
                </select>
            } />

            <Property title="Неделя:" value={
                <select defaultValue="default-week" onChange={e => setWeek(Number.parseInt(e.target.value))}>
                    <option disabled value="default-week">Выберите неделю</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                    <option>18</option>
                </select>
            } />

            <Property title="День недели:" value={
                <select defaultValue="default-day" onChange={e => setDay_(e.target.value)}>
                    <option disabled value= "default-day">Выберите день недели</option>
                    <option>Понедельник</option>
                    <option>Вторник</option>
                    <option>Среда</option>
                    <option>Четверг</option>
                    <option>Пятница</option>
                    <option>Суббота</option>
                    <option>Воскресенье</option>
                </select>
            } />

            <Property title="Начальное время:" value={
                <select defaultValue="default-time" onChange={e => setStartTime_(e.target.value)}>
                    <option disabled value= "default-time">Выберите время</option>
                    <option value= "8:30">8:30</option>
                    <option value="10:15">10:15</option>
                    <option value="12:00">12:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:45">15:45</option>
                    <option value="17:30">17:30</option>
                    <option value="19:15">19:15</option>
                </select>
            } />

            <Property title="Конечное время:" value={
                <select defaultValue="default-time" onChange={e => setEndTime_(e.target.value)}>
                    <option disabled value= "default-time">Выберите время</option>
                    <option value= "10:00">10:00</option>
                    <option value="11:45">11:45</option>
                    <option value="13:30">13:30</option>
                    <option value="15:30">15:30</option>
                    <option value="17:15">17:15</option>
                    <option value="19:00">19:00</option>
                    <option value="20:45">20:45</option>
                </select>
            } />

            <button className="button buttonGreen" onClick={onClick}>Ок</button>
        </div>
    )
}