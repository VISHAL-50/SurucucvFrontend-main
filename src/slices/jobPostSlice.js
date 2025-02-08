import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    job: null,
    editJob: false,

}

const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {
        setJob: (state, action) => {
            state.job = action.payload
        },
        setEditJob: (state, action) => {
            state.editJob = action.payload
        },
    },
})

export const {
    setJob,
    setEditJob,
} = jobSlice.actions

export default jobSlice.reducer