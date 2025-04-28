import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

const initialState = {
    recipes: [],
    popularRecipes: [],
    loading: false,
    favorites: [],
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

export const getAllRecipes = createAsyncThunk('recipe/getAllRecipes', async() => {
    try{
        const {data} = await axios.get('/recipes');
        return data;
    }catch(error){
        console.log(error)
    }
})

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

export const searchRecipeByTitle = createAsyncThunk(
    'recipes/searchByTitle',
    async (title, {rejectWithValue}) => {
        try {
            const response = await axios.get(`/recipes/search/${title}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || 'Failed to fetch recipes');
        }
    }
);

export const recipeSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {
        setRecipes: (state, action) => {
            state.recipes = action.payload;
    },
    saveToFavorites: (state, action) =>{
        const recipe = action.payload;
        if(state.favorites.some(fav => fav._id === recipe._id)){
            state.favorites = state.favorites.filter(fav => fav._id !== recipe._id);
        }else{
            state.favorites.push(recipe);
        }
      },
    },
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
        //get all recipes
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
         //search recipe by title
         .addCase(searchRecipeByTitle.pending, (state) =>{
            state.loading = true;
            state.error = null;
        })
        .addCase(searchRecipeByTitle.fulfilled, (state, action) =>{
            state.loading = false;
            state.recipes = action.payload;
            
        })
        .addCase(searchRecipeByTitle.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.payload;
        })
    },
});

export const { saveToFavorites } = recipeSlice.actions;

export default recipeSlice.reducer;
