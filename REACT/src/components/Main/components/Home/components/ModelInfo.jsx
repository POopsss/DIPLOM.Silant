import React from "react"
import { useSelector, useDispatch } from "react-redux"

import "./styles/ModelInfo.css"
import Table from "./Table.jsx"
import SearchParamsInput from "./SearchParamsInput.jsx"
import CreateObject from "../../../../general/CreateObject.jsx"
import { setForm } from "../../../../../store/slice/FormSlice"
import { setFieldError } from "../../../../../store/slice/FieldErrorSlice.js"
import { post } from "../../../../../static/api.js"


export default function ModelInfo(props) {
    const dispatch = useDispatch()
    const set_fieldError = (obj) => dispatch(setFieldError(obj))
    const userInfo = useSelector(state => state.UserInfo)
    const set_form = (obj) => dispatch(setForm(obj))
    const form = useSelector(state => state.Form.form)

    const [create, setCreate] = React.useState(false)
    const [createPermission, setCreatePermission] = React.useState(false)

    const model = props.model

    function buttonCreateInitClick() {
        setCreate(true)
        set_form(model.formInit)        
    }

    async function buttonPostClick() {
        const request = await post(form, `${model.path.slice(1)}/`, true)
        if (!(request == 'create')) {
            set_fieldError(Object.keys(request))
        } else { location.href = location.origin }
    }

    React.useEffect(() => {
        userInfo.groups.map((group) => model.create.includes(group) ? setCreatePermission(true) : "")
    },[userInfo])

    return(
        <>
        { create ?
        <>
        <CreateObject model={model}/>
        <button className="button-post" onClick={buttonPostClick}>Отправить</button>
        </>
        :
        <>
        <SearchParamsInput model={model}/>
        <Table model={model}/>
        { createPermission ?
        <button onClick={buttonCreateInitClick}>Создать</button>
        : ""}
        </>
        }
        </>
    )
}