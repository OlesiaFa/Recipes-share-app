import React, { useEffect, useState, useCallback } from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import { updateRecipe } from '../redux/features/resipe/recipeSlice';

import axios from '../utils/axios'

export const EditRecipePage = () => {
const [title, setTitle] = useState('');
const [description, setDescription] = useState('');
const [ingredients, setIngredients] = useState('');
const [instruction, setInstruction] = useState('');
const [oldImage, setOldImage] = useState('');
const [newImage, setNewImage] = useState('');

const dispatch = useDispatch();
const navigate = useNavigate();
const params = useParams();

 const fetchRecipe = useCallback(async() => {
    const {data} = await axios.get(`/recipes/${params.id}`)
    setTitle(data.title);
    setDescription(data.description);
    setIngredients(data.ingredients);
    setInstruction(data.instruction);
    setOldImage(data.imgUrl);
  }, [params.id]);

  const submitHandler = () => {
    try {
      const updatedRecipe = new FormData()
      updatedRecipe.append('title', title);
      updatedRecipe.append('description', description);
      updatedRecipe.append('ingredients', ingredients);
      updatedRecipe.append('instruction', instruction);
      updatedRecipe.append('id', params.id);
      updatedRecipe.append('image', newImage);
      dispatch(updateRecipe(updatedRecipe));
      navigate('/recipes');
    } catch (error) {
      console.log(error)
    }
  }

  const clearFormHandler =() => {
    setTitle('');
    setDescription('');
setIngredients('');
setInstruction('');
  }

  useEffect(() => {
    fetchRecipe();

  }, [fetchRecipe])

  return (
    <form 
    className='w-1/3 mx-auto py-10'
    onSubmit={(e) => e.preventDefault()}
    >
    <label className='text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'>
      Upload Image
      <input 
      type="file" 
      className='hidden' 
      onChange={(e) => {
        setNewImage(e.target.files[0])
        setOldImage('')
        }
      } />
    </label>
    <div className='flex object-cover py-2'>
    {oldImage && <img src={`http://localhost:3002/${oldImage}`} alt={oldImage.name}/>}
       {newImage && <img src={URL.createObjectURL(newImage)} alt={newImage.name}/>}
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
        Update
      </button>
      <button 
      onClick={clearFormHandler}
      className='flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4'>
        Concel
      </button>
    </div>
    </form>
)}
