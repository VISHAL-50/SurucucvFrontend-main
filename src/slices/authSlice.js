import {createSlice} from "@reduxjs/toolkit"
// import { sendOtp, verifyOtp } from "../services/operations/authAPI";
const initialState = {
    signupData:null,
    loading:false,
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
};

const authSlice = createSlice({
    name:"auth",
    initialState: initialState,
    reducers:{
        setSignupData(state, value) {
            state.signupData = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
        setToken(state, value) {
            state.token = value.payload;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //       .addCase(sendOtp.pending, (state) => {
    //         state.loading = true;
    //       })
    //       .addCase(sendOtp.fulfilled, (state) => {
    //         state.loading = false;
    //       })
    //       .addCase(sendOtp.rejected, (state) => {
    //         state.loading = false;
    //       })
    //       .addCase(verifyOtp.pending, (state) => {
    //         state.loading = true;
    //       })
    //       .addCase(verifyOtp.fulfilled, (state) => {
    //         state.loading = false;
    //       })
    //       .addCase(verifyOtp.rejected, (state) => {
    //         state.loading = false;
    //       });
    //   },
});

console.log(authSlice);
export const {setSignupData, setLoading, setToken} = authSlice.actions;
export default authSlice.reducer;