import React, {useEffect, useState} from 'react';
import {AuditoryForm} from './AuditoryForm';
import {AuditoryResponse} from '../../api/entity/response/AuditoryResponse'
import {AuditoryRequest} from '../../api/entity/request/AuditoryRequest'
import {addAuditory, deleteAuditory, getAuditoryList, updateAuditory} from "../../api/ScheduleApi";
import '../schedule/SchedulePage.css'
import '../schedule/ScheduleForm.css'
import '../schedule/ScheduleCard.css'
import '../../main.css'
import {Property} from "../../Property";

export const AuditoryPage: React.FC = () => {
    const [isAuditory, setAuditory] = useState<AuditoryResponse[]>()
    const [addFormShow, setAddFormShow] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [idToEdit, setIdToEdit] = useState(0)

    const refresh = () => {
        return getAuditoryList().then(res => setAuditory(res))
    }

    useEffect(() => {
        refresh()
    }, [])

    const onAddSubmit = (id: number | undefined, auditory: AuditoryRequest) => {
        addAuditory({auditoryName: auditory.auditoryName}).finally(() => refresh())
        setAddFormShow(false)
    }

    const onEdit = (id: number | undefined, newAuditory: AuditoryRequest) => {
        if (id != undefined) updateAuditory(id, newAuditory).finally(() => refresh())
        setIsEdit(false)
    }

    return (
        <div className="schedule-page">
            <div className="card schedule-form">
                <button className="button buttonDarkBlue" onClick={() => setAddFormShow(!addFormShow)}>
                    {`${addFormShow ? 'Отмена' : 'Добавить новую аудиторию'}`}
                </button>
                {addFormShow &&
                    <AuditoryForm onSubmit={onAddSubmit}/>
                }
            </div>
            <div>
                {
                    isAuditory !== undefined &&
                    isAuditory.map(aud =>
                        <div className="card schedule-card" key={aud.id}>
                            {(isEdit && idToEdit == aud.id) ?
                                <AuditoryForm auditory={aud} onSubmit={onEdit}/>
                                :
                                <div className="schedule-card-main">
                                    <Property title="Аудитория:" value={aud.auditoryName}/>
                                </div>
                            }
                            <div className="schedule-card-controls">
                                <button className="button buttonDarkBlue"
                                        onClick={() => {
                                            setIdToEdit(aud.id)
                                            setIsEdit(!isEdit)
                                        }}>
                                    {(isEdit && idToEdit == aud.id) ? 'Закрыть' : 'Редактировать'}
                                </button>

                                <button className="button buttonRed"
                                        onClick={() => deleteAuditory(aud.id).finally(() => refresh())}>
                                    Удалить
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}