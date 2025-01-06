//댓글 쓰는 창

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createCommentThunk, updateCommentThunk } from '../../featurs/commentSlice'

function Comment({ initialValues = {}, onSuccess }) {
   const [content, setContent] = useState(initialValues.content || '') // 초기 값 설정
   const dispatch = useDispatch()

   const handleSubmit = (e) => {
      e.preventDefault()

      if (!content.trim()) {
         alert('댓글 내용을 입력해주세요.')
         return
      }

      const commentData = { content }

      // 수정 또는 등록 요청
      if (initialValues.id) {
         // 수정 요청
         dispatch(updateCommentThunk({ ...commentData, id: initialValues.id }))
            .unwrap()
            .then(() => {
               alert('댓글이 수정되었습니다.')
               if (onSuccess) onSuccess()
            })
            .catch((error) => {
               console.error('댓글 수정 실패:', error)
            })
      } else {
         // 등록 요청
         dispatch(createCommentThunk(commentData))
            .unwrap()
            .then(() => {
               alert('댓글이 등록되었습니다.')
               setContent('')
               if (onSuccess) onSuccess()
            })
            .catch((error) => {
               console.error('댓글 등록 실패:', error)
            })
      }
   }

   return (
      <>
         <div className="comment-container">
            <h1>댓글 작성 중....</h1>
            <form action="." onSubmit={handleSubmit}>
               <textarea
                  className="comment-content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  style={{
                     textAlign: 'center',
                     marginTop: '40px',
                     width: '800px',
                     height: '700px',
                     backgroundColor: '#D9D9D9',
                     borderRadius: '20px',
                     border: 'none',
                     fontSize: '30px',
                     padding: '20px',
                  }}
               ></textarea>
               <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>
                  {initialValues.id ? '수정' : '등록'} {/* 수정인지 등록인지에 따라 버튼 라벨 변경 */}
               </button>
            </form>
         </div>
      </>
   )
}

export default Comment
