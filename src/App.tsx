import React from 'react'
import {Route, Routes} from 'react-router'
import {BrowserRouter} from 'react-router-dom'
import {SchedulePage} from './ui/schedule/SchedulePage'
import {AuditoryPage} from './ui/auditory/AuditoryPage'
import {GroupPage} from './ui/group/GroupPage'
import {Header} from './Header'
import './App.css'

export const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Header/>
            <div className="container">
                <Routes>
                    <Route path="/schedules" element={<SchedulePage/>}/>
                    <Route path="/auditories" element={<AuditoryPage/>}/>
                    <Route path="/groups" element={<GroupPage/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}