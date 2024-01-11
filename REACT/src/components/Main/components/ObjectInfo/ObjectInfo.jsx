import React from "react"
import { truck_fields } from "../../../../static/const"

import "./styles/ObjectInfo.css"
import InfoTable from "../Info/components/InfoTable.jsx"


export default function ObjectInfo() {
    const curent_location = new URL(location.href)
    const serial_number = curent_location.searchParams.get("serialNumber")

    return(
    <div className="truck">
        <h1>Техническая характеристика техники</h1>
        <div className="truck-content">
            <h3>Машина: Заводской №{serial_number}</h3>
            <InfoTable title={truck_fields} path={`truck/${serial_number}/`} auth={false} />
        </div>
    </div>
    )
}