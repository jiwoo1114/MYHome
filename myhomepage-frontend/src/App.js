import './style/common.css'
import Navbar from './components/shared/Navvar'
import SharedBox from './components/shared/Shardebox';

import React from 'react';
import { Route, Routes } from 'react-router-dom'


import Home from './pages/Home'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
//import DiaryDetailPage from './pages/DiaryDetailPage'
//import DiaryCreditPage from './pages/DiaryCreditPage'
//import DiaryEditPage from './pages/DiaryEditPage'
//import MyProfilePage from './pages/MyProfilePage'
//import ProfileChangePage from './pages/ProfileChang'
//import CommentCreditPage from './pages/CommentCreditForm'
//import CommentEditPage from './pages/CommentEditPage'

//import { useEffect } from 'react'
//import { checkAuthStatusThunk } from './features/authSlice'

function App() {
/*
   const dispatch = useDispatch()
   const { isAuthenticated, user } = useSelector((state) => state.auth) //로그인 상태 가져오기

   //새로고침시 redux 데이터가 사라지거나 서버에서 문제 발생 가능성이 있으므로 지속적인 로그인 상태 확인을 위해 사용
   useEffect(() => {
      dispatch(checkAuthStatusThunk())
   }, [dispatch])
*/
  return (
      <>
      <Navbar />
       <SharedBox>
        <Routes>
          <Route path="/" element={<Home />} />
          
         <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} /> 
          {/*다이어리 관련 컴포넌트 부분*/}
          {/*<Route path="/diary" element={<DiaryDetailPage />} />
          <Route path="/diary/create" element={<DiaryCreditPage />} />
          <Route path="/diary/update/:id" element={<DiaryEditPage />} /> */}
           {/*프로필 관련 컴포넌트 부분*/}
        {/*<Route path="/profile" element={<MyProfilePage />} />
          <Route path="/profile/update-profile" element={<ProfileChangePage />} />*/}
          {/*댓글 작성 부분*/}
        {/* <Route path="/comment/comments" element={<CommentCreditPage />} />
          <Route path="/comments/:id" element={<CommentEditPage/>} /> */}
          {/* 추가적으로 다른 경로를 설정할 수 있습니다. */}
        </Routes>
        </SharedBox>
       </> 
  );
}

export default App;
