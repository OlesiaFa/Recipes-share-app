import {Router} from 'express';
import {checkAuth} from '../utils/checkAuth.js'
<<<<<<< HEAD
import { createRecipe, getAll } from '../controllers/recipes.js';
=======
import { createRecipe, getAll, getById, getMyRecipes, removeRecipe, updateRecipe, getRecipeComments } from '../controllers/recipes.js';
>>>>>>> recovery-branch

const router = new Router();

//Create recipe
//http://localhost:3002/api/recipes
router.post('/', checkAuth, createRecipe);

//Get all recipes
//http://localhost:3002/api/recipes
router.get('/', getAll);

<<<<<<< HEAD
=======
//Get recipy by Id
//http://localhost:3002/api/recipes/:id
router.get('/:id', getById);

//Get my recipy
//http://localhost:3002/api/recipes/user/me
router.get('/user/me', checkAuth, getMyRecipes);

//Remove Recipe
//http://localhost:3002/api/recipes/:id
router.delete('/:id', checkAuth, removeRecipe);

//Update Recipe
//http://localhost:3002/api/recipes/:id
router.put('/:id', checkAuth, updateRecipe);

//Get Recipe comments
//http://localhost:3002/api/recipes/comments/:id
router.get('/comments/:id', getRecipeComments);
>>>>>>> recovery-branch

export default router;