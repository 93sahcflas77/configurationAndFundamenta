import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const emailPost = createAsyncThunk(
    "email/emailPost",
    async ({ useremail, subject, test, ctaLink, appName }, thunkAPI) => {
        try {
            const response  = await axios.post("http://localhost:7000/send-email", {
                useremail,
                subject,
                test,
            })

            return response .data

        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || error.message
            );
        }
    }
)

const emailSlie = createSlice({
    name: "email",
    initialState: {
        success: false,
        error: null,
        sendEmail: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(emailPost.pending, (state) => {
            state.success = false;
            state.sendEmail = null;
            state.error = null
        }).addCase(emailPost.fulfilled, (state, action) => {
            state.sendEmail = action.payload.useremail
            state.success = true;
            state.error = null
        }).addCase(emailPost.rejected, (state) => {
            state.error = "SomeThinh went wrong";
            state.sendEmail = null;
            state.success = null
        })
    }
})

export default emailSlie.reducer