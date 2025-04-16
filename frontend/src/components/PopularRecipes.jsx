import React from 'react';
import { Link } from 'react-router-dom';

export const PopularRecipes = ({recipe}) => {
  return (
    <div className='bg-gray-600 my-1'>
        <Link to={`${recipe._id}`} className='flex text-xs p-2 text-gray-300 hover:bg-gray-800 hover:text-white'>
             {recipe.title}
        </Link>
    </div>
  )
}
