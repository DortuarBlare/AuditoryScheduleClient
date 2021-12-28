import React, {useEffect, useState} from 'react'
import {AuditoryForm} from './AuditoryForm'
import {Property} from '../../Property'
import {AuditoryResponse} from '../../api/entity/response/AuditoryResponse'
import {AuditoryRequest} from '../../api/entity/request/AuditoryRequest'
import {deleteAuditory, getAuditoryList, updateAuditory} from "../../api/ScheduleApi";
import '../schedule/ScheduleCard.css'
import '../../main.css'

interface Props {
    auditory: AuditoryResponse
    auditoryRequest: (a: AuditoryRequest) => void
}

export const AuditoryCard: React.FC<Props> = ({auditory}) => {
    const [isAuditory, setAuditory] = useState<AuditoryResponse[]>()
    const [isEdit, setIsEdit] = useState(false)

    const refresh = () => {
        return isAuditory != undefined && isAuditory?.map(aud => getAuditoryList().then(res => setAuditory(res)))
    }

    useEffect(() => {
        refresh()
    }, [])

    const onEdit = (newAuditory: AuditoryRequest) => {
        updateAuditory(auditory.id, newAuditory).finally(() => refresh())
        setIsEdit(false)
    }

    const onDelete = () => {
        deleteAuditory(auditory.id).finally(() => refresh())
    }

    return (
        <div className="card schedule-card">
            {isEdit ?
                <AuditoryForm auditory={auditory} onSubmit={onEdit}/>
                :
                <div className="schedule-card-main">
                    <Property title="Аудитория:" value={auditory.auditoryName}/>
                </div>
            }
            <div className="schedule-card-controls">
                <button className="button buttonDarkBlue"
                        onClick={() => setIsEdit(!isEdit)}>
                    {isEdit ? 'Закрыть' : 'Редактировать'}
                </button>

                <button className="button buttonRed"
                        onClick={onDelete}>
                    Удалить
                </button>
            </div>
        </div>
    )
}