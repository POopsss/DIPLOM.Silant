import React from "react"
import { useSelector, useDispatch } from "react-redux"

import { get } from "../../static/api"
import { setForm } from "../../store/slice/FormSlice"


export default function SelectOption(props) {
    const dispatch = useDispatch()
    const set_form = (obj) => dispatch(setForm(obj))
    const form = useSelector(state => state.Form.form)
    const fieldError = useSelector(state => state.FieldError.field)

    const selectRef = React.useRef()

    const field = props.field
    const defaultValue = props.defaultValue

    const [options, setOptions] = React.useState([])

    async function getOptions() {
        setOptions(await get(field.path, "", true))
        if (field.type == "select") {
            selectRef.current.value = defaultValue
        } else {
            if (defaultValue) {
                for (let i = 0; i < selectRef.current.options.length; i++) {
                      if (defaultValue.includes(selectRef.current.options[i].value)) {
                        selectRef.current.options[i].selected = true
                      }
            }}
        }
    }

    function change(e) {
        const changeForm = {}
        Object.assign(changeForm, form)
        changeForm[field.field] = e.target.value
        e.target.value = e.target.value
        set_form(changeForm)
    }

    function multiChange(e) {
        const values = []
        for (let i = 0; i < e.target.options.length; i++) {
          if (e.target.options[i].selected)
             values.push(e.target.options[i].value);
        }
        const changeForm = {}
        Object.assign(changeForm, form)
        changeForm[field.field] = values
        set_form(changeForm)
    }

    React.useEffect(() => {
        getOptions()
    }, [])

    return(
        <>
        {field.type == "multiple" ? 
        <select multiple 
        className={ fieldError.includes(field.field) ? "error" : "" } 
        onChange={multiChange}
        ref={selectRef}
        >
            {options.map((elem, id) => 
            <option key={id}>
                {elem[field.lookup]}
            </option>
            )}
        </select>
        :
        <select 
        className={ fieldError.includes(field.field) ? "error" : "" } 
        onChange={change}
        ref={selectRef}
        >
            {options.map((elem, id) => 
            <option key={id}>
                {elem[field.lookup]}
            </option>
            )}
        </select>
        }
        </>
    )
}