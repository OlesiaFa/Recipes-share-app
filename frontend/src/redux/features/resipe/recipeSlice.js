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

<<<<<<< HEAD
export const getAllRecipes = createAsyncThunk('recipe/getRecipes', async() => {
=======
export const getAllRecipes = createAsyncThunk('recipe/getAllRecipes', async() => {
>>>>>>> recovery-branch
    try{
        const {data} = await axios.get('/recipes');
        return data;
    }catch(error){
        console.log(error)
    }
})

<<<<<<< HEAD
=======
export const removeRecipe = createAsyncThunk('recipe/removeRecipe', async(id)=>{
    try {
        const {data} = await axios.delete(`/recipes/${id}`, id)
        return data;
    } catch (error) {
        console.log(error)
        
    }
})

export const updateRecipe = createAsyncThunk(
    'recipe/updateRecipe', 
    async(updatedRecipe)=>{
    try {
        const {data} = await axios.put(
            `/recipes/${updatedRecipe.id}`, 
            updatedRecipe, )
        return data;
    } catch (error) {
        console.log(error)
        
    }
})

>>>>>>> recovery-branch
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
<<<<<<< HEAD
        //get all recipe
=======
        //get all recipes
>>>>>>> recovery-branch
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
<<<<<<< HEAD
=======
        //delete recipe
        .addCase(removeRecipe.pending, (state) =>{
            state.loading = true
        })
        .addCase(removeRecipe.fulfilled, (state, action) =>{
            state.loading = false
            state.recipes = state.recipes.filter((recipe)=>recipe._id !== action.payload._id,)
            
        })
        .addCase(removeRecipe.rejected, (state) =>{
            state.loading = false
        })
         //update recipe
         .addCase(updateRecipe.pending, (state) =>{
            state.loading = true
        })
        .addCase(updateRecipe.fulfilled, (state, action) =>{
            state.loading = false
            const index = state.recipes.findIndex((recipe) => recipe._id === action.payload._id,)
            state.recipes[index] = action.payload
            
        })
        .addCase(updateRecipe.rejected, (state) =>{
            state.loading = false
        })
>>>>>>> recovery-branch
    },
})

export default recipeSlice.reducer;
