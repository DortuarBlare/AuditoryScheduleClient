import React, {useEffect, useState} from 'react'
import {GroupForm} from './GroupForm'
import {Property} from '../../Property'
import {GroupResponse} from '../../api/entity/response/GroupResponse'
import {GroupRequest} from '../../api/entity/request/GroupRequest'
import {deleteGroup, getGroupList, updateGroup} from "../../api/ScheduleApi";
import '../schedule/ScheduleCard.css'
import '../../main.css'


interface Props {
    group: GroupResponse
    groupRequest: (g: GroupRequest) => void
}

export const GroupCard: React.FC<Props> = ({ group }) => {
    const [isGroup, setGroup] = useState<GroupResponse[]>()
    const [isEdit, setIsEdit] = useState(false)

    const refresh = () => {
        return isGroup != undefined && isGroup?.map(gr => getGroupList().then(res => setGroup(res)))
    }

    useEffect(() => {
        refresh()
    }, [])

    const onEdit = (newGroup: GroupRequest) => {
        updateGroup(group.id, newGroup).finally(() => refresh())
        setIsEdit(false)
    }

    const onDelete = () => {
        deleteGroup(group.id).finally(() => refresh())
    }

    return (
        <div className="card schedule-card">
            {isEdit ?
                <GroupForm group={group} onSubmit={onEdit} />
                :
                <div className="schedule-card-main">
                    <Property title="Группа:" value={group.groupName} />
                </div>
            }
            <div className="schedule-card-controls">
                <button className="button buttonDarkBlue" onClick={() => setIsEdit(!isEdit)}>
                    {isEdit ? 'Удалить' : 'Редактировать'}
                </button>
                <button className="button buttonRed" onClick={onDelete}>Удалить</button>
            </div>
        </div>
    )
}