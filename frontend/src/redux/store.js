import {configureStore} from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
import recipeSlice from './features/resipe/recipeSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        recipe: recipeSlice,
    },
})