
import {  CircularProgress } from '@mui/material'
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUserThunk } from '../../featurs/authSlice'

import '../../style/Signup.css'




function Signup() {
    const [email, setEmail] = useState('')
   const [nick, setNick] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [isSignupComplete, setIsSignupComplete] = useState(false) // 회원가입 완료 상태 추가
   const dispatch = useDispatch()
   const { loading, error } = useSelector((state) => state.auth)

   const handleSignup = useCallback(() => {
      if (!email.trim() || !nick.trim() || !password.trim() || !confirmPassword.trim()) {
         alert('모든 필드를 입력해주세요!')
         return
      }

      if (password !== confirmPassword) {
         alert('비밀번호가 일치하지 않습니다!')
         return
      }

      dispatch(registerUserThunk({ email, nick, password }))
         .unwrap()
         .then(() => {
            //회원가입 성공시
            setIsSignupComplete(true) //회원가입 완료 상태 true로 변경
         })
         .catch((error) => {
            //회원가입 중 에러 발생시
            console.error('회원가입 에러:', error)
         })
   }, [email, nick, password, confirmPassword, dispatch])

      //회원가입이 완료 되었을때 보일 컴포넌트
    if (isSignupComplete) {
      return (
         <div className='complete'>
            <h2>
               회원가입이 완료되었습니다!
            </h2>
            <p style={{
               color: 'black',
               fontSize:'25px'
            }}>
               로그인 페이지로 이동하거나 다른 작업을 계속 진행할 수 있습니다.
            </p>
            <button
               style={{ marginTop: '20px',color:'#BEEEEA',borderRadius:'5px'}}
               onClick={() => (window.location.href = '/login')} // 로그인 페이지로 이동
            >
               <p style={{color:'black', fontSize:'20px'}}>로그인 하러 가기</p>
            </button>
         </div>
      )
   }

   return ( 
      <>
       <h1>회원가입</h1>
       
         {error && (
            <h3>
               {error}
            </h3>
         )}
      <form action="submit">
         <div
             style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '20px'
  }}        
         >

         <input label="이메일"  value={email} onChange={(e) => setEmail(e.target.value)} placeholder='아이디를 입력해주세요' />

         <input  label="사용자 이름"  value={nick} onChange={(e) => setNick(e.target.value)}  placeholder='사용자이름을 입력해주세요'/>

         <input  label="비밀번호"  type="password"  value={password} onChange={(e) => setPassword(e.target.value)}  placeholder='비밀번호를 입력해주세요' />

         <input  label="비밀번호 확인"  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}  placeholder='비밀번호를 다시 입력해주세요' />

         <button  onClick={handleSignup} disabled={loading} style={{ marginTop: '20px' }}>
            {loading ? <CircularProgress size={24} /> : '회원가입'}
         </button>
         </div>
         </form>
      </> 
        
     );
}

export default Signup;