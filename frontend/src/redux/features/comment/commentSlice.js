import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../../utils/axios'

const initialState = {
    comments: [],
    loading: false,
}

export const createComment = createAsyncThunk(
    'comment/createComment',
    async ({recipeId, comment}) => {
        try {
            const {data} = await axios.post(`/comments/${recipeId}`, {
                recipeId,
                comment,
            })
            return data;
        } catch (error) {
            console.log(error);
        }
    },
)

export const getRecipeComments = createAsyncThunk(
    'comment/getRecipeComments', 
    async(recipeId) =>{
    try {
        const {data} = await axios.get(`/recipes/comments/${recipeId}`)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers:(builder) => {
                builder
                //create comment
                .addCase(createComment.pending, (state) =>{
                    state.loading = true
                })
                .addCase(createComment.fulfilled, (state, action) =>{
                    state.loading = false
                    state.comments.push(action.payload)
                })
                .addCase(createComment.rejected, (state) =>{
                    state.loading = false
                })
                //get comment
                .addCase(getRecipeComments.pending, (state) =>{
                    state.loading = true
                })
                .addCase(getRecipeComments.fulfilled, (state, action) =>{
                    state.loading = false
                    state.comments = action.payload || [];
                })
                .addCase(getRecipeComments.rejected, (state) =>{
                    state.loading = false
                })
    }
})


export default commentSlice.reducer