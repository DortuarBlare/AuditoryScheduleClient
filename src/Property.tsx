import React, { ReactElement } from 'react'

import './Property.css'

interface Props {
    title: string
    value?: string | number | ReactElement
    children?: ReactElement
}

export const Property: React.FC<Props> = ({ title, value, children }) => (
    <div className = "property">
        <span className = "property-title">{title}</span>
        {children ?? <span className = "property-value">{value}</span>}
    </div>
)