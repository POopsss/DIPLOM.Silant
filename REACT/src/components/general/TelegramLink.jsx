import React from "react";

import "./styles/TelegramLink.css"

export default function TelegramLink() {
    return(
        <div className="telegram-link" onClick={() => window.open("https://t.me/+78352201209", '_blank')}>
            <img src="../../media/icons/default/telegram.svg" alt="" />
            <h4>Telegram: +7-8352-20-12-09</h4>
            <img src="../../media/icons/silat/Hotline.svg" alt="" />
        </div>
    )
}