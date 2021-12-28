import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

export const Header: React.FC = () => {

    return (
        <div className="header-outer">
            <div className="header container">
                <div className="header-title">
                    <p>Расписание аудиторий</p>
                </div>

                <div className="header-links">
                    <Link className="header-link" to="/schedules">Расписания</Link>
                    <div className="header-line"/>
                    <Link className="header-link" to="/auditories">Аудитории</Link>
                    <div className="header-line" />
                    <Link className="header-link" to="/groups">Группы</Link>
                </div>
            </div>
        </div>
    )
}