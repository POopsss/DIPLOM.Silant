import React from "react"
import { Route, Routes } from "react-router-dom"

import "./styles/Info.css"
import InfoTable from "./components/InfoTable.jsx"
import { model } from "../../../../static/model"


export default function Info() {
    

    return(
    <div className="info">
        <h2>Техническая характеристика техники</h2>
        <div className="info-content">
            <Routes>
                <Route path="/truck" element={ <InfoTable model={model.truck}/> } />
                <Route path="/delivery_agreement" element={ <InfoTable model={model.delivery_agreement}/> } />
                <Route path="/maintenance" element={ <InfoTable model={model.maintenance}/> } />
                <Route path="/reclamation" element={ <InfoTable model={model.reclamation}/> } />
            </Routes>
        </div>
    </div>
    )
}