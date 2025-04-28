import React from 'react';
import {useState, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import{AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete, AiOutlineHeart, AiFillHeart} from 'react-icons/ai';
import dayjs from 'dayjs';
import {Link, useParams, useNavigate} from 'react-router-dom';
import{toast} from 'react-toastify';
import { removeRecipe } from '../redux/features/resipe/recipeSlice';
import { CommentItem } from '../components/CommentItem';
import { saveToFavorites } from '../redux/features/resipe/recipeSlice';

import axios from '../utils/axios';
import { createComment, getRecipeComments } from '../redux/features/comment/commentSlice';

export const RecipePage = () => {
  const [recipe, setRecipe] = useState(null);
  const [comment, setComment] = useState('');

  const {user} = useSelector((state) => state.auth);
  const {comments} = useSelector((state) => state.comment);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const {favorites} = useSelector((state) => state.recipe);

  

  const handleSaveFavorite = () => {
      dispatch(saveToFavorites(recipe));
    };

  const removeRecipeHandler =() => {
    try {
      dispatch(removeRecipe(params.id));
      toast ('Recipe deleted');
      navigate('/recipes');
    } catch (error) {
    console.log(error)      
    }
  }

  
  const handleSubmit =() =>{
    try {
      const recipeId = params.id
      dispatch(createComment({recipeId, comment}))
      setComment('');
    } catch (error) {
      console.log(error)
    }
  }

  const fetchComments = useCallback(async ()=> {
    try {
      dispatch(getRecipeComments(params.id))
    } catch (error) {
      console.log(error)
    }
  }, [params.id, dispatch])

  
  const fetchRecipe = useCallback(async() => {
    const {data} = await axios.get(`/recipes/${params.id}`)
    setRecipe(data);
  }, [params.id]);

  useEffect(() => {
    fetchRecipe()
  }, [fetchRecipe])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])



  if (!recipe) {
    return (
      <div className='text-xl text-center text-white py-10'>
        Loading ...
      </div>
    )
  }

  const isFavorite = recipe && favorites.some(fav => fav._id === recipe._id);


 return (
      <div className="min-h-screen bg-gray-900 px-4 py-6 flex justify-center">
        <div className="w-full max-w-6xl pl-4">
          
          <button className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4 mb-4">
            <Link className="flex" to="/">Back</Link>
          </button>
    
          <div className="flex flex-col lg:flex-row gap-10 py-8">
         
            <div className="w-full lg:w-2/3">
              <div className="flex flex-col basis-1/4 flex-grow">
                <div className={recipe?.imgUrl ? 'flex rounded-sm h-80' : 'flex rounded-sm'}>
                  {recipe?.imgUrl && (
                    <img
                      src={`http://localhost:3002/${recipe.imgUrl}`}
                      alt="img"
                      className="object-cover w-full rounded-sm"
                    />
                  )}
                </div>
              </div>
    
              <div className="flex justify-between items-center pt-2">
                <div className="text-xs text-white opacity-50">{recipe.userName}</div>
                <div className="text-xs text-white opacity-50">
                  {dayjs(recipe.createdAt).format('MMM.DD, YYYY')}
                </div>
              </div>
    
              <div className="text-white text-xl mt-2">{recipe.title}</div>
              <p className="text-white opacity-60 text-xs pt-4 whitespace-pre-line">{recipe.description}</p>
              <p className="text-white opacity-60 text-xs pt-4 whitespace-pre-line">{recipe.ingredients}</p>
              <p className="text-white opacity-60 text-xs pt-4 whitespace-pre-line">{recipe.instruction}</p>
    
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center mt-4 justify-between">
                <div className="flex gap-3">
                  <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                    <AiFillEye /> <span>{recipe.views}</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                    <AiOutlineMessage /> <span>{recipe.comments?.length || 0}</span>
                  </button>
                </div>
    
                {user?._id === recipe.author && (
                  <div className="flex gap-3 mt-2 sm:mt-0">
                    <Link to={`/${params.id}/edit`} className="text-white opacity-50">
                      <AiTwotoneEdit />
                    </Link>
                    <button
                      type="submit"
                      onClick={removeRecipeHandler}
                      className="text-white opacity-50"
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                )}
  
           {user?._id !== recipe.author && (
            <div className="flex justify-end">
            <button
            onClick={handleSaveFavorite}
            className={`mt-4 px-4 py-2 ${isFavorite ? 'bg-gray-600' : 'bg-green-700'} text-white rounded-lg`}
           >
          {isFavorite ? <AiFillHeart/> : <AiOutlineHeart/>}
        </button>
        </div>
           )}
              </div>
            </div>
            
    
            <div className="w-full lg:w-1/3 p-8 bg-gray-700 flex flex-col gap-2 rounded-sm">
              <form className="flex flex-col sm:flex-row gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Comment"
                  className="text-black w-full rounded-sm bg-gray-400 border p-2 text-xs outline-none placeholder:text-gray-700"
                />
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
                >
                  Submit
                </button>
              </form>
    
              {comments?.map((cmt) => (
                <CommentItem key={cmt._id} cmt={cmt} />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  
}
