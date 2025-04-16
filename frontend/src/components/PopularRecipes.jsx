<<<<<<< HEAD
import React from 'react'
=======
import React from 'react';
import { Link } from 'react-router-dom';
>>>>>>> recovery-branch

export const PopularRecipes = ({recipe}) => {
  return (
    <div className='bg-gray-600 my-1'>
<<<<<<< HEAD
        <div className='flex text-xs p-2 text-gray-300 hover:bg-gray-800 hover:text-white'>
             {recipe.title}
        </div>
=======
        <Link to={`${recipe._id}`} className='flex text-xs p-2 text-gray-300 hover:bg-gray-800 hover:text-white'>
             {recipe.title}
        </Link>
>>>>>>> recovery-branch
    </div>
  )
}
