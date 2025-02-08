import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ads: [], // Renamed to 'ads' to reflect that it stores multiple advertisements
    editAd: false,
};

const adsSlice = createSlice({
    name: "ads", // Slice name adjusted to 'ads'
    initialState,
    reducers: {
        setAds: (state, action) => {
            state.ads = action.payload;
        },
        setEditAds: (state, action) => {
            state.editAd = action.payload;
        },
    },
});

export const {
    setAds,
    setEditAds,
} = adsSlice.actions;

export default adsSlice.reducer;
