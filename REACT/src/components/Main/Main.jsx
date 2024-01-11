import React from "react"
import { Route, Routes } from "react-router-dom"

import "./styles/Main.css"
import Info from "./components/Info/Info.jsx"
import Home from "./components/Home/Home.jsx"
import Handbook from "./components/Handbook/Handbook.jsx"
import HomeHead from "./components/Home/components/HomeHead.jsx"
import Swagger from "./components/Swagger/Swagger.jsx"


export default function Main() {

    return(
        <main>
            <HomeHead/>
            <Routes>
                <Route path="*" element={ <Home/> } />
                <Route path="info/*" element={ <Info/> } />
                <Route path="handbook/" element={ <Handbook/> } />
                <Route path="openapi/" element={<Swagger/>} />
            </Routes>
        </main>
    )
}