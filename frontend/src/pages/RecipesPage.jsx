<<<<<<< HEAD
import React from 'react'

export const RecipesPage = () => {
  return (
    <div>RecipesPage</div>
  )
}
=======
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {RecipeItem} from '../components/RecipeItem'
import axios from '../utils/axios';


export const RecipesPage = () => {

const [recipes, setRecipes] = useState([])

const fetchMyRecipes = async()=>{
  try {
    const {data} = await axios.get('/recipes/user/me');
    setRecipes(data)
  } catch (error) {
    console.log(error)
  }
}

useEffect(() =>{
  fetchMyRecipes()
},[]);

  return (
    <div className='w-1/2 mx-auto py-10 flex flex-col gap-10'>
            {recipes?.map((recipe, idx) => (
                <RecipeItem recipe={recipe} key={idx} />
            ))}
        </div>
  );
};
>>>>>>> recovery-branch
