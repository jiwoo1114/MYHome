//다이어리 수정

import DiaryForm from '../components/post/DiaryForm'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { updateDiaryThunk } from '../featurs/diarySlice'

function DiaryEditPage() {
   const { id } = useParams() // URL에서 ID 가져오기
   console.log('URL에서 가져온 id:', id)
   const { loading } = useSelector((state) => state.diary) // 로딩 상태 가져오기
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
         dispatch(updateDiaryThunk({ data: { id, diaryData } }))
            .unwrap()
            .then(() => {
               window.location.href = '/'
            })
            .catch((error) => {
               console.error('게시물 수정 에러: ', error)
               alert('게시물 수정에 실패했습니다.')
            })
      },
      [dispatch, navigate, id]
   )

   return (
      <>
         <DiaryForm onSubmit={handleSubmit} />
         {loading && <p>수정 중입니다...</p>} {/* 로딩 상태 표시 */}
      </>
   )
}

export default DiaryEditPage
