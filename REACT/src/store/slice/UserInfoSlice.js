import { createSlice } from "@reduxjs/toolkit"


const UserInfoSlice = createSlice({
    name: "UserInfo",
    initialState: {
        username: '',
        groups: [],
        location: "truck",
    },
    reducers: {
        setUserInfo(state, action) {
            state.username = action.payload.username
            state.groups = action.payload.groups
        },
        setLocation(state, action) {
            state.location = action.payload.location
        }
    }
});

export const { setUserInfo, setLocation } = UserInfoSlice.actions;

export default UserInfoSlice.reducer;