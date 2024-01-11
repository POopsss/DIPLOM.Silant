import React from "react"
import { useDispatch } from "react-redux"

import "./styles/Header.css"
import LoginForm from "./components/LoginForm.jsx"
import UserInfo from "./components/UserInfo.jsx"
import TelegramLink from "../general/TelegramLink.jsx"
import { get } from "../../static/api"
import { setUserInfo } from "../../store/slice/UserInfoSlice"


export default function Header() {

    const dispatch = useDispatch()
    const setUser = (obj) => dispatch(setUserInfo(obj))

    async function getUserData() {
        const data = await get('user/', '', true)
        if (data.detail) {
            localStorage.clear()
            location.href = location.origin
            return
        }
        if (data[0].is_superuser) {
            data[0].groups.push('managers')
        }
        setUser({username: data[0].first_name, groups: data[0].groups})
    }

    React.useEffect(() => {
        if (localStorage.getItem('token')) {
            getUserData()
        }
    }, [])

    return(
        <header>
            <div className="header">
                <a className="logo-wraper" href={location.origin}>
                <div className="logo"/>
                <div className="logo-2"/>
                </a>
                <div className="telegram-header">
                    <TelegramLink/>
                </div>
                <div className="user-panel">
                    { localStorage.getItem("token") ? <UserInfo/> : <LoginForm/> }                    
                </div>
                <div className="header-title"><h3>Электронная сервисная книжка "Мой Силант"</h3></div>
            </div>
        </header>
    )
}