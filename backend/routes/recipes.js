import {Router} from 'express';
import {checkAuth} from '../utils/checkAuth.js'
import { createRecipe, getAll } from '../controllers/recipes.js';

const router = new Router();

//Create recipe
//http://localhost:3002/api/recipes
router.post('/', checkAuth, createRecipe);

//Get all recipes
//http://localhost:3002/api/recipes
router.get('/', getAll);


export default router;