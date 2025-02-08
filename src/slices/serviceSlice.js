import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    service: null,
    editService: false,

}

const serviceSlice = createSlice({
    name: "service",
    initialState,
    reducers: {
        setService: (state, action) => {
            state.service = action.payload
        },
        setEditService: (state, action) => {
            state.editService = action.payload
        },
    },
})

export const {
    setService,
    setEditService,
} = serviceSlice.actions

export default serviceSlice.reducer