import React from "react"
import { useSelector, useDispatch } from "react-redux"

import "./styles/InfoTable.css"
import { del, get, put } from "../../../../../static/api"
import { setForm } from "../../../../../store/slice/FormSlice"
import { setFieldError } from "../../../../../store/slice/FieldErrorSlice"
import UpdateObject from "../../../../general/UpdateObject.jsx"


export default function InfoTable(props) {

    const dispatch = useDispatch()
    const set_form = (obj) => dispatch(setForm(obj))
    const userInfo = useSelector(state => state.UserInfo)
    const form = useSelector(state => state.Form.form)
    const set_fieldError = (obj) => dispatch(setFieldError(obj))

    const model = props.model
    const newURL = new URL(location.href)
    const [data, setData] = React.useState({})
    const [ready, setReady] = React.useState(false)
    const [change, setChange] = React.useState(false)
    const [createPermission, setCreatePermission] = React.useState(false)

    async function getObj() {
        newURL.searchParams.get("lookup")
        const d = await get(`${model.path}/${newURL.searchParams.get("lookup")}`, "", model.auth)
        if (!d.detail){
            setData(d)
            setTimeout(() => setReady(true), 500)
        }
    }

    function delObj() {
        del(`${model.path}/${newURL.searchParams.get("lookup")}/`)
        location.href = location.origin
    }

    function buttonChangeClick() {
        setChange(true)
        const changeForm = {}
        Object.assign(changeForm, form)
        model.form.map((elem) => {
            if (elem.lookup && elem.type == "select" && elem.field_lookup) {
                changeForm[elem.field] = data[elem.field][elem.lookup]
            } else {
                changeForm[elem.field] = data[elem.field]
            }
        })
        set_form(changeForm)
    }

    async function buttonPost() {
        const request = await (put(form, `${model.path}/${newURL.searchParams.get("lookup")}/`, true))
        if (!(request == "update")) {
            console.log(request)
            set_fieldError(request)
        } else { location.href = location.origin }
    }

    React.useEffect(() => {
        getObj()
        set_form(model.formInit)
    }, [])

    React.useEffect(() => {
        userInfo.groups.map((group) => model.create.includes(group) ? setCreatePermission(true) : "")
    },[userInfo])

    return(
        <>
        { ready ?
        change ? 
            <UpdateObject model={model} object={data}/>
            :
        <table className="object-info">
            <thead>
            </thead>
            <tbody>
                {model.fields.map((field, id) =>
                <tr key={id}>
                    <td>{field.name}</td>
                    <td 
                    className={field.handbook & !Array.isArray(field.field.split("__").reduce((obj, key) => obj[key], data)) ? 
                    "pointer"    
                    :""}
                    onClick={field.handbook & !Array.isArray(field.field.split("__").reduce((obj, key) => obj[key], data)) ? () => 
                    location.href = location.origin + "/handbook/?lookup=" + field.field.split("__").reduce((obj, key) => obj[key], data) 
                    : () => {}}
                    >
                        {
                        Array.isArray(field.field.split("__").reduce((obj, key) => obj[key], data)) ?
                        field.field.split("__").reduce((obj, key) => obj[key], data).map((value, id) => 
                        <p 
                        key={id}
                        onClick={() => location.href = location.origin + "/handbook/?lookup=" + value }
                        >
                            {value}
                        </p>
                        )
                        : 
                        field.field.split("__").reduce((obj, key) => obj[key], data)
                        }
                    </td>
                </tr>
                )}
            </tbody>
        </table>
        : ""}
        { createPermission ? 
        <div className="info-action">
            { change ? 
            <>
            <button className="button-post" onClick={buttonPost}>Отправить</button>
            <button onClick={() => setChange(false)}>Назад</button>
            </>
            : 
            <>
            <button onClick={buttonChangeClick}>Изменить</button>
            <button className="button-del" onClick={delObj}>Удалить</button>
            </>
            }            
        </div>
        : ""}
        </>
    )
}