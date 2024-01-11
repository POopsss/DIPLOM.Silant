import React from "react"

import "./styles/SearchParamsInput.css"


export default function SearchParamsInput(props) {
    const [display, setDisplay] = React.useState(false)

    const params = props.model.filter
    const newURL = new URL(location.href)
    
    return(
    <div className="search_params-container">
    <h2 onClick={() => setDisplay(!display)} className="pointer">Параметры поиска:</h2>
        <div className={ display ? "search-params-input" : "display-none"}>
            <div className="search-params-input-container">
            { params.map((obj, id) =>
                <div className="label-input" key={id}>
                    <label htmlFor={obj.field}>{obj.name}:</label>
                    { obj.type == "date" ? 
                    <>
                    <input 
                        className="date-input"
                        type="text" 
                        name={obj.field} 
                        placeholder="ПОСЛЕ" 
                        defaultValue={newURL.searchParams.get(`${obj.field}__gte`) ? newURL.searchParams.get(`${obj.field}__gte`) : ""} 
                        onChange={(e) => {
                            newURL.searchParams.set(`${obj.field}__gte`, e.target.value)
                        }} 
                        onFocus={(e) => e.target.type = "date"} 
                        onBlur={(e) => e.target.type = "text"}
                    />
                    <input 
                        className="date-input"
                        type="text" 
                        name={obj.field} 
                        placeholder="ДО" 
                        defaultValue={newURL.searchParams.get(`${obj.field}__lte`) ? newURL.searchParams.get(`${obj.field}__lte`) : ""} 
                        onChange={(e) => {
                            newURL.searchParams.set(`${obj.field}__gte`, e.target.value)
                        }} 
                        onFocus={(e) => e.target.type = "date"} 
                        onBlur={(e) => e.target.type = "text"}
                    />
                    </>
                    :
                    obj.type == "number" ? 
                    <>
                    <input 
                        className="number-input"
                        type={obj.type} 
                        name={obj.field} 
                        placeholder="БОЛЬШЕ" 
                        defaultValue={newURL.searchParams.get(`${obj.field}__gte`) ? newURL.searchParams.get(`${obj.field}__gte`) : ""} 
                        onChange={(e) => {
                            newURL.searchParams.set(`${obj.field}__gte`, e.target.value)
                        }} 
                    />
                    <input 
                        className="number-input"
                        type={obj.type} 
                        name={obj.field} 
                        placeholder="МЕНЬШЕ" 
                        defaultValue={newURL.searchParams.get(`${obj.field}__lte`) ? newURL.searchParams.get(`${obj.field}__lte`) : ""} 
                        onChange={(e) => {
                            newURL.searchParams.set(`${obj.field}__gte`, e.target.value)
                        }}
                    />
                    </>
                    :
                    <input 
                        type={obj.type} 
                        name={obj.field} 
                        placeholder={obj.name}
                        defaultValue={newURL.searchParams.get(obj.field) ? newURL.searchParams.get(obj.field) : ""}
                        onChange={(e) => {
                            newURL.searchParams.set(obj.field, e.target.value)
                        }}
                    />
                    }
                </div>
            )}
            </div>
            <button onClick={() => location.replace(newURL)}>Найти</button>
        </div>
    </div>
    )
}