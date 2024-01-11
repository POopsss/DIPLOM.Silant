import React from "react"

import "./styles/Table.css"
import { get } from "../../../../../static/api"


export default function Table(props) {
    const model = props.model
    const newURL = new URL(location.href)

    const [limit, setLimit] = React.useState(10)
    const [ready, setReady] = React.useState(false)
    const [data, setData] = React.useState([])

    async function getMore() {
        setLimit(limit + 10)
        getModel()
    }

    async function getModel() {
        newURL.searchParams.set("limit", limit)
        setData(await get(model.path, newURL.search, model.auth))
    }

    function sort(e) {
        let order_by = e.target.dataset.sort
        if (newURL.searchParams.get("order_by") == order_by ) order_by = "-" + order_by
        newURL.searchParams.delete("order_by")
        newURL.searchParams.append("order_by", order_by)
        location.replace(newURL)
    }

    React.useEffect(() => {
        getModel()
        setLimit(limit + 10)
    }, [])

    React.useEffect(() => {
        setTimeout(() => setReady(true), 500)
    }, [data])


    const tableRef = React.useRef()
    let isDown = false
    let startX
    let scrollLeft
    
    function sliderMouseDown(e) {
        isDown = true
        tableRef.current.classList.add("active")
        startX = e.pageX - tableRef.current.offsetLeft
        scrollLeft = tableRef.current.scrollLeft
    }
    function sliderMouseLeave() {
        isDown = false
        tableRef.current.classList.remove("active");
    }
    function sliderMouseUp() {
        isDown = false
        tableRef.current.classList.remove("active")
    }
    function sliderMouseMove(e) {
        if(!isDown) return
        e.preventDefault()
        const x = e.pageX - tableRef.current.offsetLeft
        const walk = (x - startX) * 1.2
        tableRef.current.scrollLeft = scrollLeft - walk
    }

    return(
    <div className="list-of-objects-table-container">
        <h3>Результат поиска:</h3>
        <div>
            <table id="table" ref={tableRef} onMouseDown={sliderMouseDown} onMouseLeave={sliderMouseLeave} onMouseUp={sliderMouseUp} onMouseMove={sliderMouseMove}>
                <thead>
                    <tr>
                        <td>№<br/>п/п</td>
                        { 
                            model.fields.map((field, id) => 
                            <td 
                                key={id} 
                                className={ 
                                    newURL.searchParams.get("order_by") == field.field ? "pointer sort-direct" : 
                                    newURL.searchParams.get("order_by") == `-${field.field}` ? "pointer sort-revers" : 
                                    field.order_by ? "pointer" : ""
                                }
                                data-sort={ field.order_by ? field.field : ""} 
                                onClick={ field.order_by ? sort : () => {}}
                            >
                                {field.name}
                            </td>
                        )}
                    </tr>
                </thead>
                <tbody >
                        {
                        data.length ?                        
                        data.map((object, id) => 
                            <tr key={id} className="pointer" onClick={() => location.href = `${location.origin}/info${model.path}?lookup=${object[model.lookup]}`}>
                            <td>{id + 1}</td>
                            {
                                model.fields.map((field, id) => 
                                <td key={id}>
                                    {
                                        ready ?
                                        Array.isArray(field.field.split("__").reduce((obj, key) => obj[key], object)) ?
                                        field.field.split("__").reduce((obj, key) => obj[key], object).map((value, id) => <p key={id}>{value}</p>)
                                        : 
                                        field.field.split("__").reduce((obj, key) => obj[key], object)
                                        : ""
                                    }
                                </td>
                            )}
                            </tr>
                        ): <tr></tr>}
                </tbody>
            </table>
        </div>
            <button onClick={getMore}>Показать больше</button>
    </div>
    )
}
