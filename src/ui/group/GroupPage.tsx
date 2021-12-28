import React, {useEffect, useState} from 'react';
import {GroupCard} from './GroupCard';
import {GroupForm} from './GroupForm';
import {addGroup, getGroupList} from "../../api/ScheduleApi";
import {GroupRequest} from '../../api/entity/request/GroupRequest'
import {GroupResponse} from '../../api/entity/response/GroupResponse'
import '../schedule/SchedulePage.css'
import '../schedule/ScheduleForm.css'
import '../schedule/ScheduleCard.css'
import '../../main.css'

export const GroupPage: React.FC = () => {
    const [isGroup, setIsGroup] = useState<GroupResponse[]>()
    const [addFormShow, setAddFormShow] = useState(false)

    const refresh = () => {
        return getGroupList().then(res => setIsGroup(res))
    }

    useEffect(() => {
        refresh()
    }, [])

    const onAddSubmit = (group: GroupRequest) => {
        addGroup(group).finally(() => refresh())
        setAddFormShow(false)
    }

    return (
        <div className="schedule-page">
            <div className="card schedule-form">
                <button className="button buttonDarkBlue" onClick={() => setAddFormShow(!addFormShow)}>
                    {`${addFormShow ? 'Отмена действия' : 'Добавить новую группу'}`}
                </button>
                {addFormShow &&
                    <GroupForm onSubmit={onAddSubmit}/>
                }
            </div>
            <div>
                {
                    isGroup != undefined &&
                    isGroup.map(gr =>
                        <GroupCard key={gr.id} group={gr}
                                   groupRequest={g => getGroupList().finally(() => refresh())}/>)
                }
            </div>
        </div>
    )
}