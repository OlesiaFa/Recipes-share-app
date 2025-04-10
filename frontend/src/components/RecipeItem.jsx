import React from 'react'
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
        <div className='flex gap-3 items-center'>
            <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                <AiFillEye /> <span>{recipe.views}</span>
            </button>
            <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                <AiOutlineMessage /> <span>{recipe.comments?.length}</span>
            </button>
        </div>
    </div>
  )
}
