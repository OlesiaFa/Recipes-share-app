import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {RecipeItem} from '../components/RecipeItem';
import {useNavigate, useParams} from 'react-router-dom';
import { searchRecipeByTitle } from '../redux/features/resipe/recipeSlice';

export const SearchRecipePage = () => {
  const { recipes, loading, error } = useSelector((state) => state.recipe);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {title} = useParams();
  
  useEffect(() =>{
    if (title){
      dispatch(searchRecipeByTitle(title));
    }
  }, [title, dispatch]);
  
  if (loading) return <p className="text-white text-center py-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center py-10">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-6 flex justify-center">
      <div className="w-full max-w-6xl pl-4">
        <button 
          onClick={() => navigate('/')}
          className="bg-gray-600 text-xs text-white rounded-sm py-2 px-4 mb-4"
        >
          ← Back to All Recipes
        </button>

        {recipes.length > 0 ? (
          <div className="py-10 flex flex-col gap-10">
            {recipes.map((recipe, idx) => (
              <RecipeItem recipe={recipe} key={idx} />
            ))}
          </div>
        ) : (
          <p className="text-white text-xl text-center py-10">No matching recipes found.</p>
        )}
      </div>
    </div>
  );
};


