import React from 'react'
<<<<<<< HEAD
import{AiFillEye, AiOutlineMessage} from 'react-icons/ai'

export const RecipeItem = (recipe) => {
    if(!recipe) {
        return <div className='text-xl text-center text-white py-10'>
       No Recipes
       </div>
    }
  return (
    <div className='flex flex-col basis-1/4 flex-grow'>
        <div>IMAGE</div>
        <div className='flex justify-between items-center pt-2'>
            <div className='text-xs text-white opacity-50'>{recipe.userName}</div>
            <div className='text-xs text-white opacity-50'>{recipe.createAt}</div>
        </div>
        <div className='text-white text-xl'>{recipe.title}</div>
        <p className='text-white opacity-60 text-xs pt-4'>{recipe.description} </p>
        <p className='text-white opacity-60 text-xs pt-4'>{recipe.ingredients} </p>
        <p className='text-white opacity-60 text-xs pt-4'>{recipe.instruction} </p>
=======
import{AiFillEye, AiOutlineMessage} from 'react-icons/ai';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom'

export const RecipeItem = ({recipe}) => {

    if(!recipe){
        return(
            <div className='text-xl text-center text-white py-10'>
                Loading...
            </div>
        )
    }
   
  return (
    <Link to={`/${recipe._id}`}>    
    <div className='flex flex-col basis-1/4 flex-grow'>
        <div 
        className={recipe.imgUrl ? 'flex rounded-sm h-80' : 'flex rounded-sm'}
        >
            {recipe.imgUrl &&(
                <img 
                src={`http://localhost:3002/${recipe.imgUrl}`} 
                alt='img' 
                className='object-cover w-full' />
            )}
        </div>
        <div className='flex justify-between items-center pt-2'>
            <div className='text-xs text-white opacity-50'>{recipe.userName}</div>
            <div className='text-xs text-white opacity-50'>
                {dayjs (recipe.createdAt).format('MMM.DD, YYYY')}
            </div>
        </div>
        <div className='text-white text-xl'>{recipe.title}</div>
        <p className='text-white opacity-60 text-xs pt-4'>{recipe.description} </p>
        
>>>>>>> recovery-branch
        <div className='flex gap-3 items-center'>
            <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                <AiFillEye /> <span>{recipe.views}</span>
            </button>
            <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
<<<<<<< HEAD
                <AiOutlineMessage /> <span>{recipe.comments?.length}</span>
            </button>
        </div>
    </div>
=======
                <AiOutlineMessage /> <span>{recipe.comments?.length || 0}</span>
            </button>
        </div>
    </div>
    </Link>
>>>>>>> recovery-branch
  )
}
