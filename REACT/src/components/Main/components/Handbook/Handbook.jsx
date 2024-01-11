import React from "react"
import { useSelector, useDispatch } from "react-redux"

import "./styles/HandBook.css"
import { get, post, put } from "../../../../static/api"
import { model } from "../../../../static/model"
import { setForm } from "../../../../store/slice/FormSlice"
import { setFieldError } from "../../../../store/slice/FieldErrorSlice"
import UpdateObject from "../../../general/UpdateObject.jsx"
import CreateObject from "../../../general/CreateObject.jsx"

export default function Handbook() {
    const [data, setData] = React.useState([])
    const [handbookName, setHandbookName] = React.useState([])
    const [handbook, setHandbook] = React.useState([])
    const [description, setDescription] = React.useState({})
    const [create, setCreate] = React.useState(false)
    const [changeInit, setChangeInit] = React.useState(false)
    const [createPermission, setCreatePermission] = React.useState(false)

    const dispatch = useDispatch()
    const set_form = (obj) => dispatch(setForm(obj))
    const set_fieldError = (obj) => dispatch(setFieldError(obj))
    const form = useSelector(state => state.Form.form)
    const userInfo = useSelector(state => state.UserInfo)

    const newURL = new URL(location.href)

    const list = []
    
    async function getHandBook() {
        const data = await get("/hand_book", "", false)
        setData(data)
        data.map((obj) => {
            if (!list.includes(obj.handbookName)) {
                list.push(obj.handbookName)
            }
            setHandbookName(list)
        })
    }

    function selectHandbookName(e) {
        setChangeInit(false)
        data.map((obj) => {
            if (e.target.value == obj.handbookName) {
                list.push(obj.name)
            }
            setHandbook(list)
        })
    }

    function selectHandbook (e) {
        setChangeInit(false)
        data.map((obj) => {
            if (e.target.value == obj.name) {
                setDescription(obj)
            }
        })
    }

    async function getDescription() {
        const data = await get(`/hand_book/${newURL.searchParams.get("lookup")}`, "", false)
        setDescription(data)
    }

    function buttonCreateInitClick() {
        setCreate(true)
        set_form(model.handbook.formInit)        
    }

    function buttonСhangeInitClick() {
        setChangeInit(true)
        const changeForm = {}
        Object.assign(changeForm, form)
        model.handbook.form.map((elem) => {
            if (elem.lookup && elem.type == "select" && elem.field_lookup) {
                changeForm[elem.field] = description[elem.field][elem.lookup]
            } else {
                changeForm[elem.field] = description[elem.field]
            }
        })
        set_form(changeForm)
    }

    async function buttonPostClick() {
        const request = await post(form, `hand_book/`, true)
        if (!(request == 'create')) {
            set_fieldError(Object.keys(request))
        } 
        // else { location.href = location.origin }
    }

    async function buttonPutClick() {
        const request = await put(form, `/hand_book/${description.name}/`, true)
        if (!(request == 'update')) {
            set_fieldError(request)
        } 
        // else { location.href = location.origin }
    }

    React.useEffect(() => {
        if (newURL.searchParams.get("lookup")) {
            getDescription()
        }
        getHandBook()
    }, [])

    React.useEffect(() => {
        userInfo.groups.map((group) => model.handbook.create.includes(group) ? setCreatePermission(true) : "")
    },[userInfo])

    return(
        <div className="handbook-info">
            <h2>Справочник</h2>
        { create ?
        <div className="handbook-info-content">
        <CreateObject model={model.handbook}/>
            <button className="button-post" onClick={buttonPostClick}>Отправить</button>
            <button onClick={() => setCreate(false)}>Назад</button>
        </div>
        :
        <>
        <div className="handbook-search">
            <div className="handbook-search-container">
                <label htmlFor="handbookName">Заголовок:</label>
                <select name="handbookName" onChange={selectHandbookName}>
                    <option value=""></option>
                {
                    handbookName.map((value, id) =>
                        <option key={id} value={value} >
                            {value}
                        </option>
                    )
                }
                </select>
            </div>
            <div className="handbook-search-container">
                { handbook.length ?
                <>
                <label htmlFor="handbook">Название:</label>
                <select name="handbook" onChange={selectHandbook}>
                    <option value=""></option>
                {
                    handbook.map((value, id) =>
                        <option key={id} value={value} >
                            {value}
                        </option>
                    )
                }
                </select>
                </>
                : 
                <>
                    <label htmlFor="handbook">Название:</label>
                    <select name="handbook"></select>
                </> }
            </div>
        </div>
        <div className="handbook-info-content">
        { Object.keys(description).length ?
            <>
            { changeInit ? 
            <>
            <UpdateObject object={description} model={model.handbook}/>
            <button className="button-post" onClick={buttonPutClick}>Отправить</button>
            <button onClick={() => setChangeInit(false)}>Назад</button>
            </>
            :
            <>
            <table>
                <thead></thead>
                <tbody>
                    <tr>
                        <td>Название:</td>
                        <td>{description.name}</td>
                    </tr>
                    <tr>
                        <td>Описание:</td>
                        <td><p>{description.description ? description.description : "  "}</p></td>
                    </tr>
                </tbody>
            </table>
            { createPermission ? 
            <button onClick={buttonСhangeInitClick}>Изменить</button>
            : "" }
            </>
            }
            </>
        : "" }
        { createPermission & !changeInit ? 
        <button onClick={buttonCreateInitClick}>Создать</button>
        : "" }
        </div>
        </>
        }
        </div>
    )
}