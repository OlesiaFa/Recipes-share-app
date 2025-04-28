import React from 'react';
import {RecipeItem} from '../components/RecipeItem';
import {useDispatch, useSelector} from 'react-redux';
import { saveToFavorites } from '../redux/features/resipe/recipeSlice';
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai';
 
export const FavoritesRecipesPage = () => {
  const { favorites } = useSelector((state) => state.recipe);
  const dispatch = useDispatch();

  if (!favorites.length) {
    return (
      <div className="text-white text-center py-10 text-xl">
        No favorite recipes yet
      </div>
    );
  }

  return (
    <div className="w-1/2 mx-auto py-10 flex flex-col gap-10">
      {favorites.map((recipe, idx) => {
        const isFavorite = favorites.some(fav => fav._id === recipe._id);

        return (
          <div key={idx} className="flex flex-col gap-4">
            <RecipeItem recipe={recipe} />

            <div className="flex justify-end">
              <button
                onClick={() => dispatch(saveToFavorites(recipe))}
                className={`mt-4 px-4 py-2 ${isFavorite ? 'bg-gray-600' : 'bg-green-700'} text-white rounded-lg`}
              >
                {isFavorite ? <AiFillHeart/> : <AiOutlineHeart/>}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};