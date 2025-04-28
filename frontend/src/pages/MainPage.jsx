import React from 'react';
import{useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { RecipeItem } from '../components/RecipeItem';
import {PopularRecipes} from '../components/PopularRecipes';
import {SearchForm} from '../components/SearchForm.jsx';
import { getAllRecipes} from '../redux/features/resipe/recipeSlice.js';
 
export const MainPage = () => {

  const dispatch = useDispatch()
  const {recipes, popularRecipes, loading, error} = useSelector((state) => state.recipe)

  useEffect(() => {
    dispatch(getAllRecipes())
  }, [dispatch])

  if(!recipes.length) {
    return <div className='text-xl text-center text-white py-10'>
       No Recipes
       </div>
  }

 
if (loading) {
  return <div className="text-xl text-center text-white py-10">Loading...</div>;
}

if (error) {
  return <div className="text-xl text-center text-red-500 py-10">{error}</div>;
}

  return (
    <div className='max-w-[900px] mx-auto py-10'>
      <SearchForm />
      <div className='flex justify-betwin gap-8'>
      <div className='flex flex-col gap-10 basis-4/5'>
      {recipes?.map((recipe, idx) =>(
        <RecipeItem key={idx} recipe={recipe}/>
    ))}
      
      </div>
      <div className='basis-1/5'>
      <div className='text-xs uppercase text-white'>
        Popular
      </div>
      {
        popularRecipes?.map((recipe, idx) => (
          <PopularRecipes key={idx} recipe={recipe} />
        )) }
      </div>
    </div>
    </div>
  )
}
