import { configureStore } from "@reduxjs/toolkit"

import UserInfoSlice from "./slice/UserInfoSlice"
import FormSlice from "./slice/FormSlice"
import FieldErrorSlice from "./slice/FieldErrorSlice"


export default configureStore({
    reducer: {
        UserInfo: UserInfoSlice,
        Form: FormSlice,
        FieldError: FieldErrorSlice,
    }
})