import React, { useState } from 'react'
import {Property} from '../../Property'
import {GroupResponse} from '../../api/entity/response/GroupResponse'
import {GroupRequest} from '../../api/entity/request/GroupRequest'
import '../schedule/ScheduleForm.css'

interface Props {
    group?: GroupResponse
    onSubmit: (group: GroupRequest) => void
}

export const GroupForm: React.FC<Props> = ({ group, onSubmit }) => {
    const [isGroup, setIsGroup] = useState(group?.groupName ?? '')

    const onClick = () => {
        if (isGroup === '') return
        onSubmit({groupName: isGroup})
    }

    return (
        <div className="schedule-form">
            <Property title="Группа:" value={<input type="text" value={isGroup} onChange={e => setIsGroup(e.target.value)} />} />
            <button className="button buttonGreen" onClick={onClick}>Ок</button>
        </div>
    )
}