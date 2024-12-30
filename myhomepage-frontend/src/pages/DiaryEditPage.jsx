//다이어리 등록

import DiaryForm from '../components/post/DiaryForm'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { useSelector } from 'react-redux';
import {createDiaryThunk} from '../featurs/diarySlice'

function DiaryEditPage() {
      const { loading } = useSelector((state) => state.diary); // 로딩 상태 가져오기
     const navigate = useNavigate()
   const dispatch = useDispatch()

   const handleSubmit = useCallback(
      (diaryData) => {
         //postData: 사용자가 입력한 게시물 데이터
         /*
      postData = {
        content: '여행중입니다',
        img: 파일객체
      }
      */
         dispatch(createDiaryThunk(diaryData))
            .unwrap()
            .then(() => {
               navigate('/') //게시물 등록 후 메인페이지로 이동
            })
            .catch((error) => {
               console.error('게시물 등록 에러: ', error)
               alert('게시물 등록에 실패했습니다.')
            })
      },
      [dispatch, navigate]
   )

    return (
       <> 
           <DiaryForm onSubmit={handleSubmit} />
            {loading && <p>등록 중입니다...</p>} {/* 로딩 상태 표시 */}
        </> 
     );
}

export default DiaryEditPage;