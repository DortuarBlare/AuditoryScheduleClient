import React, {useEffect, useState} from 'react';
import {GroupForm} from './GroupForm';
import {addGroup, deleteGroup, getGroupList, updateGroup} from "../../api/ScheduleApi";
import {GroupRequest} from '../../api/entity/request/GroupRequest'
import {GroupResponse} from '../../api/entity/response/GroupResponse'
import '../schedule/SchedulePage.css'
import '../schedule/ScheduleForm.css'
import '../schedule/ScheduleCard.css'
import '../../main.css'
import {Property} from "../../Property";

export const GroupPage: React.FC = () => {
    const [isGroup, setIsGroup] = useState<GroupResponse[]>()
    const [addFormShow, setAddFormShow] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [idToEdit, setIdToEdit] = useState(0)

    const refresh = () => {
        return getGroupList().then(res => setIsGroup(res))
    }

    useEffect(() => {
        refresh()
    }, [])

    const onAddSubmit = (id: number | undefined, group: GroupRequest) => {
        addGroup(group).finally(() => refresh())
        setAddFormShow(false)
    }

    const onEdit = (id: number | undefined, newGroup: GroupRequest) => {
        if (id != undefined) updateGroup(id, newGroup).finally(() => refresh())
        setIsEdit(false)
    }

    return (
        <div className="schedule-page">
            <div className="card schedule-form">
                <button className="button buttonDarkBlue" onClick={() => setAddFormShow(!addFormShow)}>
                    {`${addFormShow ? 'Отмена' : 'Добавить новую группу'}`}
                </button>
                {addFormShow &&
                    <GroupForm onSubmit={onAddSubmit}/>
                }
            </div>
            <div>
                {
                    isGroup != undefined &&
                    isGroup.map(gr =>
                        <div className="card schedule-card" key={gr.id}>
                            {
                                (isEdit && idToEdit == gr.id) ?
                                    <GroupForm group={gr} onSubmit={onEdit}/>
                                    :
                                    <div className="schedule-card-main">
                                        <Property title="Группа:" value={gr.groupName}/>
                                    </div>
                            }
                            <div className="schedule-card-controls">
                                <button className="button buttonDarkBlue" onClick={() => {
                                    setIdToEdit(gr.id)
                                    setIsEdit(!isEdit)
                                }}>
                                    {(isEdit && idToEdit == gr.id) ? 'Закрыть' : 'Редактировать'}
                                </button>
                                <button className="button buttonRed"
                                        onClick={() => deleteGroup(gr.id).finally(() => refresh())}>Удалить
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}