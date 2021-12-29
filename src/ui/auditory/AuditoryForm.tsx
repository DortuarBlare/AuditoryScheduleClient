import React, {useState} from 'react'
import {Property} from '../../Property'
import {AuditoryResponse} from '../../api/entity/response/AuditoryResponse'
import {AuditoryRequest} from '../../api/entity/request/AuditoryRequest'
import '../schedule/ScheduleForm.css'

interface Props {
    auditory?: AuditoryResponse
    onSubmit: (auditoryID: number | undefined, auditory: AuditoryRequest) => void
}

export const AuditoryForm: React.FC<Props> = ({auditory, onSubmit}) => {
    const [isAuditory, setAuditory] = useState(auditory?.auditoryName ?? '')

    const onClick = () => {
        if (isAuditory === '') return
        onSubmit(auditory?.id, {auditoryName: isAuditory})
    }

    return (
        <div className="schedule-form">
            <Property title="Аудитория:"
                      value={
                          <input type="text"
                                 value={isAuditory}
                                 onChange={e => setAuditory(e.target.value)}/>
                      }/>
            <button className="button buttonGreen" onClick={onClick}>OK</button>
        </div>
    )
}