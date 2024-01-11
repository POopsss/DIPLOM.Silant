import React from "react"

import "./styles/Footer.css"
import TelegramLink from "../general/TelegramLink.jsx"


export default function Footer() {
    
    return(
        <footer>
            <div className="footer">
                <TelegramLink/>
                <h4>Мой Силант 2024</h4>
            </div>
        </footer>
    )
}