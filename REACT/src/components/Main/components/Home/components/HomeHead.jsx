import React from "react"
import { useSelector } from "react-redux"

import "./styles/HomeHead.css"


export default function HomeHead() {
    const userInfo = useSelector(state => state.UserInfo)
    
    return(
        <div className="list-head">
            { userInfo.username ? 
            <div className="list-head-user">
                <h2>{userInfo.username}</h2>
                <h1>Информация о комплектации и технический характеристиках вашей техники</h1>
                <div className="list-head-button">
                    <a href={location.origin + "/delivery_agreement"}>
                    <button className={ location.pathname == "/delivery_agreement" ? "current-location-button" : "" }>Машины</button>
                    </a>
                    <a href={location.origin + "/maintenance"}>
                    <button className={ location.pathname == "/maintenance" ? "current-location-button" : "" }>ТО</button>
                    </a>
                    <a href={location.origin + "/reclamation"}>
                    <button className={ location.pathname == "/reclamation" ? "current-location-button" : "" }>Рекламации</button>
                    </a>
                    <a href={location.origin + "/handbook"}>
                    <button className={ location.pathname == "/handbook" ? "current-location-button" : "" }>Справочник</button>
                    </a>
                    <a href={location.origin + "/openapi"}>
                    <button className={ location.pathname == "/openapi" ? "current-location-button" : "" }>OpenAPI</button>
                    </a>
                </div>
            </div> 
            : 
            <div className="list-head-user">
                <h1>Проверьте комплектацию и технические характеристики техники Силант</h1>
                <div className="list-head-button">
                    <a href={location.origin + "/handbook"}>
                    <button className={ location.pathname == "/handbook" ? "current-location-button" : "" }>Справочник</button>
                    </a>
                </div>
            </div> 
            }
        </div>
    )
}