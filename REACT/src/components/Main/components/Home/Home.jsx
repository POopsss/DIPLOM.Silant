import React from "react"
import { Route, Routes } from "react-router-dom"
import { useSelector } from "react-redux"

import "./styles/Home.css"
import ModelInfo from "./components/ModelInfo.jsx"
import { model } from "../../../../static/model"


export default function Home() {
    const userInfo = useSelector(state => state.UserInfo)

    return(
        <div className="home">
        <Routes>
            <Route path="/" element={ <ModelInfo model={model.truck}/> } />
            <Route path="/delivery_agreement" element={ userInfo.username ? <ModelInfo model={model.delivery_agreement}/> : "" } />
            <Route path="/maintenance" element={ userInfo.username ? <ModelInfo model={model.maintenance}/> : "" } />
            <Route path="/reclamation" element={ userInfo.username ? <ModelInfo model={model.reclamation}/> : "" } />
        </Routes>
        </div>
    )
}