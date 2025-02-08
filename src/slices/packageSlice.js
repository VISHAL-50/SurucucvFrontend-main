import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    package: null,
    editPackage: false,

}

const packageSlice = createSlice({
    name: "package",
    initialState,
    reducers: {
        setPackage: (state, action) => {
            state.service = action.payload
        },
        setEditPackage: (state, action) => {
            state.editPackage = action.payload
        },
    },
})

export const {
    setPackage,
    setEditPackage,
} = packageSlice.actions

export default packageSlice.reducer