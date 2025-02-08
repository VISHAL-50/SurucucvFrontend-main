import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    sector: null,
    editSector: false,
    status: null,
}

const sectorSlice = createSlice({
    name: "sector",
    initialState,
    reducers: {
        setSector: (state, action) => {
            state.sector = action.payload
        },
        setEditSector: (state, action) => {
            state.editSector = action.payload
        },
    },
})

export const {
    setSector,
    setEditSector,
} = sectorSlice.actions

export default sectorSlice.reducer