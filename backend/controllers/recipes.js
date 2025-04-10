import Recipe from '../models/Recipe.js';
import User from '../models/User.js';
import path, {dirname} from 'path';
import {fileURLToPath} from 'url'

//Create Recipe
export const createRecipe = async (req, res) =>{
try {
    const {title, text} = req.body;
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

    await newRecipeWithImage.seve();
    await User.findByIdAndUpdate(req.userId, {
        $push: {recipes: newRecipeWithImage},
    })

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
res.json(newRecipeWithoutImg)

} catch (error) {
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

            res.json({recipes, popularRecipes})
        }
    } catch (error) {
        res.json({message: 'Somesing get wrong' })
    }
}
