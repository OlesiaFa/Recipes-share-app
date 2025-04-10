import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { createRecipe } from '../redux/features/resipe/recipeSlice';

export const AddRecipePage = () => {
const [title, setTitle] = useState('');
const [description, setDescription] = useState('');
const [ingredients, setIngredients] = useState('');
const [instruction, setInstruction] = useState('');
const [image, setImage] = useState('');

const dispatch = useDispatch();
const navigate = useNavigate();

const submitHandler =() => {
  try{
    const data = new FormData()
    data.append('title', title);
    data.append('description', description);
    data.append('ingredients', ingredients);
    data.append('instruction', instruction);
    data.append('immage', image);
    dispatch(createRecipe(data))
    navigate('/')
   
  }catch (error){
    console.log(error)
  }
}

const clearFormHandler=()=> {
  setTitle('');
  setDescription('');
  setIngredients('');
  setInstruction('');
  
}

  return (
    <form 
    className='w-1/3 mx-auto py-10'
    onSubmit={(e) => e.preventDefault()}
    >
    <label className='text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'>
      Upload Image
      <input type="file" className='hidden' onChange={e => setImage(e.target.files[0])} />
    </label>
    <div className='flex object-cover py-2'>
       {image && <img src={URL.createObjectURL(image)} alt={image.name}/>}
    </div>
    <label className=' text-xs text-white opacity-70'>
      Title
      <input
      type='text'
      value={title}
      onChange={e => setTitle(e.target.value)}
      placeholder='title'
      className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
      >
      </input>
    </label>
    <label className=' text-xs text-white opacity-70'>
      Description
      <textarea
      type='text'
      value={description}
      onChange={e => setDescription(e.target.value)}
      placeholder='description'
      className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700'
      />
      
    </label>
    <label className=' text-xs text-white opacity-70'>
      Ingredients
      <textarea
      type='text'
      value={ingredients}
      onChange={e => setIngredients(e.target.value)}
      placeholder='ingredients'
      className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700'
      />
      </label>
      <label className=' text-xs text-white opacity-70'>
      Instruction
      <textarea
      type='text'
      value={instruction}
      onChange={e => setInstruction(e.target.value)}
      placeholder='instruction'
      className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700'
      />
    </label>
    <div className = 'flex gap-8 items-center justify-center mt-4'>
      <button
      onClick={submitHandler} 
      className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'>
        Add
      </button>
      <button 
      onClick={clearFormHandler}
      className='flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4'>
        Concel
      </button>
    </div>
    </form>
  )
}
