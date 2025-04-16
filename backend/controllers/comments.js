import Comment from '../models/Comment.js';
import Recipe from '../models/Recipe.js';

export const createComment = async (req, res) => {
    try {
        const {recipeId, comment} = req.body

        if(!comment) 
            return res.jason({message: 'Comment can not be empty'})

        const newComment = new Comment({comment})
        await newComment.save()

        try{
            await Recipe.findByIdAndUpdate(recipeId, {
                $push: {comments: newComment._id}, 
            })
        }catch(error) {
            console.log(error);
        }

        res.json(newComment)
    } catch (error) {
        res.json({message: 'Somesing get wrong'})
    }
}