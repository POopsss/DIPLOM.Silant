import { createSlice } from "@reduxjs/toolkit"


const FormSlice = createSlice({
    name: "form",
    initialState: {
        form: {}
    },
    reducers: {
        setForm(state, action) {
            state.form = action.payload
        }
    }
});

export const { setForm } = FormSlice.actions;

export default FormSlice.reducer;