//상단바

import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/Navvar.css'
import { LuNotebookPen } from "react-icons/lu";

function Navvar() {

    /* const dispatch = useDispatch()
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
   }, [dispatch, navigate]) */

    
    return ( 
        <nav className="Navvar">
             <Link to="/" className="navbar-logo">
                <LuNotebookPen className="navbar-icon" />
            </Link>
            <p>Daily Diary</p>

            <ul className="navbar-links">
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>
     );
}

export default Navvar;