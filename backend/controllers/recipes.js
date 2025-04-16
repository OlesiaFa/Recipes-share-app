import Recipe from '../models/Recipe.js';
import User from '../models/User.js';
<<<<<<< HEAD
=======
import Comment from '../models/Comment.js'
>>>>>>> recovery-branch
import path, {dirname} from 'path';
import {fileURLToPath} from 'url'

//Create Recipe
export const createRecipe = async (req, res) =>{
try {
<<<<<<< HEAD
    const {title, text} = req.body;
=======
    const {title, description, ingredients, instruction} = req.body;
>>>>>>> recovery-branch
    const user = await User.findById(req.userId);

if(req.files) {
    let fileName = Date.now().toString() + req.files.image.name;
    const _dirname = dirname(fileURLToPath(import.meta.url))
    req.files.image.mv(path.join(_dirname, '..', 'uploads', fileName))

    const newRecipeWithImage = new Recipe({
        userName: user.userName,
        title,
        description,
        imgUrl: fileName,
        ingredients,
        instruction,
        author: req.userId,
    })

<<<<<<< HEAD
    await newRecipeWithImage.seve();
    await User.findByIdAndUpdate(req.userId, {
        $push: {recipes: newRecipeWithImage},
    })

=======
    await newRecipeWithImage.save();
    await User.findByIdAndUpdate(req.userId, {
        $push: {recipes: newRecipeWithImage},
    })
    
>>>>>>> recovery-branch
    return res.json({newRecipeWithImage});
}

const newRecipeWithoutImg =new Recipe({
    userName: user.userName,
    title,
    description,
    imgUrl: '',
    ingredients,
    instruction,
    author: req.userId,
})

await newRecipeWithoutImg.save();
await User.findByIdAndUpdate(req.userId, {
    $push: {recipes: newRecipeWithoutImg},
})
<<<<<<< HEAD
res.json(newRecipeWithoutImg)

} catch (error) {
=======
return  res.json(newRecipeWithoutImg)

} catch (error) {
    console.log(error)
>>>>>>> recovery-branch
    res.json({message: 'Something went wrong'})
}
}

//Get all recipes

export const getAll = async(req,res) => {
    try {
        const recipes = await Recipe.find(). sort('-createdAt')
        const popularRecipes = await Recipe.find().limit(5).sort('-views')
        if(!recipes){
            return res.json({message: 'No recipes'});
<<<<<<< HEAD

            res.json({recipes, popularRecipes})
        }
=======
        }
            res.json({recipes, popularRecipes})
        
>>>>>>> recovery-branch
    } catch (error) {
        res.json({message: 'Somesing get wrong' })
    }
}
<<<<<<< HEAD
=======

//Get recipe by Id

export const getById = async(req,res) => {
    try {
        const recipe = await Recipe.findByIdAndUpdate(req.params.id, {
            $inc: {views: 1},
        })
        
            res.json(recipe)
        
    } catch (error) {
        res.json({message: 'Somesing get wrong' })
    }
}

export const getMyRecipes = async(req,res) => {
    try {
        const user = await User.findById(req.userId)
        const list = await Promise.all(
            user.recipes.map((recipe) => {
                return Recipe.findById(recipe._id)
            }),
        )
        res.json(list)
    } catch (error) {
        res.json({message: 'Somesing get wrong' })
    }
}

//Remove Recipe
export const removeRecipe = async(req,res) => {
    try {
       const recipe = await Recipe.findByIdAndDelete(req.params.id)
        if(!recipe) return res.json({message: 'recipe not found'})

            await User.findByIdAndUpdate(req.userId, {
                $pull: {recipes: req.params.id},
            })

            res.json({message: 'Recipe removed'})
        
    } catch (error) {
        res.json({message: 'Somesing get wrong' })
    }
}

//Update Recipe
export const updateRecipe = async(req,res) => {
    try {
      const {title, description, ingredients, instruction, id} = req.body
      const recipe = await Recipe.findById(id);

if(req.files) {
    let fileName = Date.now().toString() + req.files.image.name;
    const _dirname = dirname(fileURLToPath(import.meta.url))
    req.files.image.mv(path.join(_dirname, '..', 'uploads', fileName))
    recipe.imgUrl = fileName || ''
}

recipe.title = title
recipe.description = description;
recipe.ingredients = ingredients;
recipe.instruction = instruction;

await recipe.save()

        res.json(recipe)
    } catch (error) {
        res.json({message: 'Somesing get wrong' })
    }
}

// Get Recipe Comments
export const getRecipeComments = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        const list = await Promise.all(
            recipe.comments.map((comment) => {
                return Comment.findById(comment)
            })
        )
        res.json(list)
    } catch (error) {
        res.json({message: 'Somesing get wrong' })
    }
}
>>>>>>> recovery-branch
