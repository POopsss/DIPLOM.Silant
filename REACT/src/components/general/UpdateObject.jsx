import React from "react"
import { useSelector, useDispatch } from "react-redux"

import "./styles/UpdateObject.css"
import SelectOption from "./SelectOption.jsx"
import { setForm } from "../../store/slice/FormSlice"

export default function UpdateObject(props) {
    const dispatch = useDispatch()
    const set_form = (obj) => dispatch(setForm(obj))
    const form = useSelector(state => state.Form.form)
    const fieldError = useSelector(state => state.FieldError.field)

    const object = props.object
    const model = props.model

    function changeInput(e) {
        const changeForm = {}
        Object.assign(changeForm, form)
        changeForm[e.target.dataset.field] = e.target.value
        set_form(changeForm)
    }

    return(
        <div className="update-object">
            <div>
            <table>
                <thead></thead>
                <tbody>
                    { model.form.map((elem, id) =>
                    <tr key={id}>
                        <td>{elem.name}</td>
                        <td>
                            {elem.type == "select" ? 
                            <SelectOption 
                            model={model} 
                            field={elem}
                            defaultValue={ elem.field_lookup ? object[elem.field][elem.lookup] : object[elem.field]}
                            />
                            :
                            elem.type == "multiple" ? 
                            <SelectOption model={model} field={elem} defaultValue={object[elem.field]}/>
                            :
                            elem.type == "date" ? 
                            <input type="text"                             
                            className={ fieldError.includes(elem.field) ? "error" : "" } 
                            data-field={elem.field} defaultValue={object[elem.field]} onChange={changeInput} onFocus={(e) => e.target.type = "date"} onBlur={(e) => e.target.type = "text"}/>
                            :
                            elem.type == "textarea" ? 
                            <textarea 
                            className={ fieldError.includes(elem.field) ? "error" : "" } 
                            data-field={elem.field} defaultValue={object[elem.field]} onChange={changeInput}/>
                            :
                            <input type={elem.type} 
                            className={ fieldError.includes(elem.field) ? "error" : "" } 
                            data-field={elem.field} defaultValue={object[elem.field]} onChange={changeInput}/>
                            }
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
            <p><span>*</span> Обязательное поле</p>
            </div>
        </div>        
    )
}