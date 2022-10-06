import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from 'axios';
import { POSTS_API } from "../Api";

const initialState = {
    posts: [],
    status: 'idle',
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (thunkApi) => {
    try {
        const response = await axios.get(POSTS_API);
        return response.data;
    } catch(err) {
        if(!err.response) {
            throw err.message;
        }

        throw thunkApi.rejectWithValue(err.response.data.message);
    }
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    }
})

export default postsSlice.reducer;
export const selectAllPosts = state => state.posts.posts;
export const getStatusPosts = state => state.posts.status;
export const getErrorPosts = state => state.posts.error;