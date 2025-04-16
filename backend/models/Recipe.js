import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
    userName: {type: String},
    title: {type: String, required: true},
    description: {type: String, required: true},
    imgUrl: {type: String, default: ''},
    ingredients: {type: String, required: true},
<<<<<<< HEAD
    instraction: {type: String, required: true},
=======
    instruction: {type: String, required: true},
>>>>>>> recovery-branch
    views:{type: Number, default: 0},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
},
{timestamps: true},
);

export default mongoose.model('Recipe', RecipeSchema)