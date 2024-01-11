import React from "react"

import "./styles/LoginForm.css"
import { post } from "../../../static/api"


export default function LoginForm() {
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [error, setError] = React.useState(false)

    const username_input_ref = React.useRef()
    const password_input_ref = React.useRef()

    function inputChange(e) {
        setError(false)
        e.target.value = e.target.value.replace(/\s/g, "")
        e.target.name == "username" ? setUsername(e.target.value) : setPassword(e.target.value)
    }

    async function login(){
        const data = {
            username: username,
            password: password
        }
        const token = await post(data, "token/", false)
        if (token.token) {
            localStorage.setItem("token", token.token)
            location.replace(location.origin)
        } else {
            setError(true)
            setPassword("")
            password_input_ref.current.value = ""
        }
    }

    return(
        <div className="login-container-main">
            <div className="login username">
                <input 
                name="username" 
                className="login-input-username" 
                type="text" 
                placeholder="Логин" 
                onChange={inputChange} 
                ref={username_input_ref}
                />
            </div>
            <div className="login password">
                <input 
                name="password" 
                className={ error ? "login-input-password error" : "login-input-password"} 
                type="password" 
                placeholder="Пароль" 
                onChange={inputChange} 
                onKeyDown={(e) => e.key === "Enter" ? login() : ""}
                ref={password_input_ref}/>
            </div>
            <button className={ username && password ? "login-button" : "hidden"}  onClick={login}>Войти</button>
        </div>
    )
}