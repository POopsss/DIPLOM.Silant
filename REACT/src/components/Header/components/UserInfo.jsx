import React from "react"
import { useSelector } from "react-redux"

import "./styles/UserInfo.css"

export default function UserInfo(){
    const userInfo = useSelector(state => state.UserInfo)

    function logOut() {
        localStorage.clear()
        location.replace(location.href)
    }

    return(
        <div className="user-info">
            {/* <h3>{userInfo.username}</h3> */}
            <button onClick={logOut}>Выйти</button>
        </div>
    )
}