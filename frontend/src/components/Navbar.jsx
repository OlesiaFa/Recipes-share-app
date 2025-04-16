import React from 'react'
import {Link, NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import{checkIsAuth, logout} from '../redux/features/auth/authSlice'
import {toast}from 'react-toastify';
import {useNavigate} from 'react-router-dom'

export const Navbar = () => {
   const isAuth = useSelector(checkIsAuth);
   const dispatch = useDispatch();


    const activeStyles = {
        color: 'white',
    }

    const navigate = useNavigate();

const logoutHandler = () => {
    dispatch(logout())
    window.localStorage.removeItem('token')
    toast('You are logged out')
    navigate('/login');
}

  return (
    <div className = 'flex py-4 justify-between items-center'>
        <span className='flex justify-center items-center w-6 h-6 text-xs text-white rounded-sm '>
            
            </span>
        {isAuth &&(
        <ul className="flex gap-8">
            <li>
                <NavLink 
                to={'/'} 
                href="/" 
                className='text-xs text-gray-400 hover:text-white'
                style={({isActive}) =>
                    isActive ? activeStyles: undefined
                    }
                >
                Main
                </NavLink>
            </li>
            <li>
                <NavLink 
                to={'/recipes'} 
                href="/" 
                className='text-xs text-gray-400 hover:text-white'
                style={({isActive}) =>
                    isActive ? activeStyles: undefined
                    }
                >
                My Recipes
                </NavLink>
            </li>
            <li>
                <NavLink 
                to='/new' 
                href="/" 
                className='text-xs text-gray-400 hover:text-white'
                style={({isActive}) =>
                    isActive ? activeStyles: undefined
                    }
                >
                Add Recipe
                </NavLink>
            </li>
        </ul>
        )}
        <div className = 'flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2'>
            {isAuth ? (
                <button onClick={logoutHandler}>Log Out</button>
            ) :(
                <Link to={'/login'}> Log In </Link>
            )}
        </div>
    </div>
  )
}
