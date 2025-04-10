import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

const initialState = {
    recipes: [],
    popularRecipes: [],
    loading: false,
}

export const createRecipe = createAsyncThunk(
    'recipe/createRecipe',
    async (params) => {
        try{
            const {data} = await axios.post('/recipes', params)
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const getAllRecipes = createAsyncThunk('recipe/getRecipes', async() => {
    try{
        const {data} = await axios.get('/recipes');
        return data;
    }catch(error){
        console.log(error)
    }
})

export const recipeSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
        //create recipe
        .addCase(createRecipe.pending, (state) =>{
            state.loading = true
        })
        .addCase(createRecipe.fulfilled, (state, action) =>{
            state.loading = false
            state.recipes.push(action.payload)
        })
        .addCase(createRecipe.rejected, (state) =>{
            state.loading = false
        })
        //get all recipe
        .addCase(getAllRecipes.pending, (state) =>{
            state.loading = true
        })
        .addCase(getAllRecipes.fulfilled, (state, action) =>{
            state.loading = false
            state.recipes = action.payload.recipes
            state.popularRecipes = action.payload.popularRecipes
        })
        .addCase(getAllRecipes.rejected, (state) =>{
            state.loading = false
        })
    },
})

export default recipeSlice.reducer;
