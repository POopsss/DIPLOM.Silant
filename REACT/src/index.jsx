import React from "react"
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"

import "./styles/styles.css"
import App from "./components/App.jsx"
import store from "./store/store.js"


createRoot(document.getElementById('root')).render(
<React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
</React.StrictMode>
)