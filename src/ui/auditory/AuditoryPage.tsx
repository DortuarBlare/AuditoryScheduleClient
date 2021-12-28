import React, {useEffect, useState} from 'react';
import {AuditoryCard} from './AuditoryCard';
import {AuditoryForm} from './AuditoryForm';
import {AuditoryResponse} from '../../api/entity/response/AuditoryResponse'
import {AuditoryRequest} from '../../api/entity/request/AuditoryRequest'
import {addAuditory, getAuditoryList} from "../../api/ScheduleApi";
import '../schedule/SchedulePage.css'
import '../schedule/ScheduleForm.css'
import '../schedule/ScheduleCard.css'
import '../../main.css'

export const AuditoryPage: React.FC = () => {
    const [isAuditory, setAuditory] = useState<AuditoryResponse[]>()
    const [addFormShow, setAddFormShow] = useState(false)

    const onAddSubmit = (auditory: AuditoryRequest) => {
        addAuditory({auditoryName: auditory.auditoryName}).finally(() => refresh())
        setAddFormShow(false)
    }

    const refresh = () => {
        return getAuditoryList().then(res => setAuditory(res))
    }

    useEffect(() => {
        refresh()
    }, [])

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
                        <AuditoryCard key={aud.id} auditory={aud}
                        auditoryRequest={a => getAuditoryList().finally(() => refresh())}/>
                    )
                }
            </div>
        </div>
    )
}