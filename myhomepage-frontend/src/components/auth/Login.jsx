import React, { useState, useMemo, useCallback } from 'react'
import {  CircularProgress } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUserThunk } from '../../featurs/authSlice'

import '../../style/Login.css'

function Login() {
     const [email, setEmail] = useState('') // 이메일 상태
   const [password, setPassword] = useState('') // 비밀번호 상태
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { loading, error } = useSelector((state) => state.auth)

   const handleLogin = useCallback(
      (e) => {
         e.preventDefault()
         if (email.trim() && password.trim()) {
            //이메일과 패스워드가 둘다 입력이 되어있다면
            dispatch(loginUserThunk({ email, password }))
               .unwrap()
               .then(() => navigate('/')) //로그인 성공시 메인페이지로 이동
               .catch((error) => console.error('로그인 실패:', error)) //로그인 실패시 에러 출력
         }
      },
      [dispatch, email, password, navigate]
    )
    
    const loginButtonContent = useMemo(
      () =>
         loading ? (
            <CircularProgress
               size={24}
               sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
               }}
            />
         ) : (
            '로그인'
         ),
      [loading]
    ) // 로딩 상태가 변경될 때만 버튼 내용이 다시 렌더링됨
    


    return ( 

        
        <>
            <h1>로그인</h1>
          

         {error && (
            <p>
               {error}
            </p>
         )}


         <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <input label="이메일" name="email"  margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} className='email' placeholder='아이디를 입력하세요'/>

            <input label="비밀번호" type="password" name="password" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} className='password' placeholder='비밀번호를 입력하세요'/>

             <button style={{backgroundColor:'#BEEEEA'}}>
               {loginButtonContent}
            </button>
         </form>

         <p style={{ textAlign: 'center', marginTop: '16px' }}>
            아직 회원이 아니신가요? <Link to="/signup"> 회원가입 페이지로 이동</Link>
         </p>

        </> 
     );
}

export default Login;