import {configureStore} from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
import recipeSlice from './features/resipe/recipeSlice'
<<<<<<< HEAD
=======
import commentSlice from './features/comment/commentSlice'
>>>>>>> recovery-branch

export const store = configureStore({
    reducer: {
        auth: authSlice,
        recipe: recipeSlice,
<<<<<<< HEAD
=======
        comment: commentSlice,
>>>>>>> recovery-branch
    },
})