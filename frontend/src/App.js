import { Layout } from "./components/Layout.jsx";
import {Routes, Route} from 'react-router-dom';
import {MainPage} from './pages/MainPage';
import {RecipesPage} from './pages/RecipesPage';
import {RecipePage} from './pages/RecipePage';
import {AddRecipePage} from './pages/AddRecipePage.jsx';
import {EditRecipePage} from './pages/EditRecipePage.jsx';
import {LoginPage} from './pages/LoginPage.jsx';
import {RegisterPage} from './pages/RegisterPage.jsx';
import {SearchRecipePage} from './pages/SearchRecipePage';
import {FavoritesRecipesPage} from './pages/FavoritesRecipesPage.jsx';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import { getMe} from './redux/features/auth/authSlice.js';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  return (
  <Layout>
    <Routes>
      <Route path='/' element = {<MainPage />} />
      <Route path='recipes' element = {<RecipesPage />} />
      <Route path=':id' element = {<RecipePage />} />
      <Route path='new' element = {<AddRecipePage />} />
      <Route path='register' element = {<RegisterPage />} />
      <Route path='login' element = {<LoginPage />} />
      <Route path=':id/edit' element = {<EditRecipePage />} />
      <Route path='search/:title' element = {<SearchRecipePage />} />
      <Route path='/favorites' element={<FavoritesRecipesPage />} />
    </Routes>

<ToastContainer position='bottom-right' />
  </Layout>
  );
}

export default App;

