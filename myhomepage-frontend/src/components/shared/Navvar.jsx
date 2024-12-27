//상단바

import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import '../../style/Navvar.css'
import { LuNotebookPen } from "react-icons/lu";

import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { logoutUserThunk } from '../../featurs/authSlice'

import { GiNotebook } from "react-icons/gi";
import { IoHome } from "react-icons/io5";


const Navvar = ({ isAuthenticated, user }) => {

    const dispatch = useDispatch()
   const navigate = useNavigate()

   const handleLogout = useCallback(() => {
      dispatch(logoutUserThunk())
         .unwrap()
         .then(() => {
            navigate('/') //로그아웃 완료 후 메인페이지로 이동
         })
         .catch((error) => {
            alert(error)
         })
   }, [dispatch, navigate]) 

    
    return ( 
        <nav className="Navvar">
             <Link to="/" className="navbar-logo">
                <LuNotebookPen className="navbar-icon" />
            </Link>
            <p>Daily Diary</p>
         <ul className="navbar-links">
                {isAuthenticated ? (
                    <>
                   <p>{user?.nick}님</p>
                   <li><Link to = "/diary">< GiNotebook /></Link></li>
                         <li><Link to = "/Profile"><IoHome /></Link></li>
                      
                        <li><Link to="/signup">Sign Up</Link></li>
                        <li><Link to="/logout" onClick={ handleLogout }>Logout</Link></li>
                    </>
                ) : (
                   <>
                        <li><Link to = "/diary">< GiNotebook /></Link></li>
                         <li><Link to = "/Profile"><IoHome /></Link></li>
                      
                        <li><Link to="/signup">Sign Up</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </>
                )}
               </ul>
         </nav>
     );
}

export default Navvar;