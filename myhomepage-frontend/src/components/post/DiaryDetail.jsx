//작성한 다이어리가 나타는 페이지

import '../../style/diarydetail.css'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDiariesThunk, deleteDiaryThunk } from '../../featurs/diarySlice'

const DiaryDetail = () => {
   const dispatch = useDispatch()
   const { diaries, loading, error, pagination } = useSelector((state) => state.diary)
   const itemsPerPage = 2 // 한 페이지에 보여줄 게시글 개수

   useEffect(() => {
      if (!pagination || !pagination.currentPage) {
         dispatch(fetchDiariesThunk(1)) // 첫 페이지 데이터 요청
      }
   }, [dispatch, pagination])

   // 현재 페이지에 해당하는 데이터만 가져오기
   const startIndex = (pagination?.currentPage - 1) * itemsPerPage
   //const paginatedDiaries = diaries.slice(startIndex, startIndex + itemsPerPage)

   if (loading) return <p>Loading...</p>
   if (error) return <p>Error: {error}</p>
   if (!diaries || diaries.length === 0) {
      return <p>No diaries available.</p>
   }
   const handleDelete = (id) => {
      if (window.confirm('정말로 삭제하시겠습니까?')) {
         // 알림창 추가
         dispatch(deleteDiaryThunk(id))
            .unwrap()
            .then(() => {
               alert('게시물이 삭제되었습니다.') // 성공 메시지
            })
            .catch((error) => {
               console.error('삭제 실패:', error) // 에러 로그
               alert('게시물 삭제에 실패했습니다.') // 실패 메시지
            })
      }
   }

   return (
      <>
         <h1>다이어리</h1>
         <div className="diary-container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginTop: '20px' }}>
            {diaries.map((diary) => {
               console.log(`이미지 경로: http://localhost:8000/diary_images/${diary.img}`)

               return (
                  <form
                     key={diary.id}
                     className="diary-item"
                     style={{
                        width: '48%',
                        marginBottom: '20px',
                        border: '1px solid #ccc',
                        padding: '10px',
                        borderRadius: '8px',
                        backgroundColor: '#D9D9D9',
                        position: 'relative',
                     }}
                  >
                     <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                        {/* 이미지 영역 */}
                        <div
                           className="img"
                           style={{
                              marginBottom: '10px',
                              width: '300px', // 부모 div의 너비
                              height: '300px', // 부모 div의 높이
                              overflow: 'hidden', // 자식 요소가 부모 영역을 넘지 않도록 설정
                           }}
                        >
                           {diary.img ? (
                              <img
                                 src={`http://localhost:8000/diary_images/${diary.img}`}
                                 alt={diary.title}
                                 style={{
                                    width: '100%', // 부모 너비에 맞추기
                                    height: '100%', // 부모 높이에 맞추기
                                    objectFit: 'cover', // 이미지 비율 유지 및 자르기
                                    borderRadius: '10px', // 둥근 모서리
                                 }}
                              />
                           ) : (
                              <p>No Image</p>
                           )}
                        </div>
                        {/* 텍스트 영역 */}
                        <div style={{ flexGrow: 1, marginTop: '60px' }}>
                           <p className="name">작성자:{diary.User?.nick || '알 수 없음'}</p>
                           <p className="title" style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                              제목: {diary.title}
                           </p>
                           <p className="content" style={{ marginBottom: '10px' }}>
                              내용:{diary.content}
                           </p>
                        </div>
                     </div>

                     <div
                        className="textbox"
                        style={{
                           position: 'absolute', // 부모 요소 기준으로 절대 배치
                           bottom: '10px', // 아래에서 10px
                           right: '10px', // 오른쪽에서 10px
                           display: 'flex',
                           gap: '10px', // 수정/삭제 버튼 간 간격
                        }}
                     >
                        <Link to={`/diary/update/${diary.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                           <p style={{ color: 'blue', cursor: 'pointer' }}>수정</p>
                        </Link>
                        <p onClick={() => handleDelete(diary.id)} style={{ color: 'red', cursor: 'pointer' }}>
                           삭제
                        </p>
                     </div>
                  </form>
               )
            })}
         </div>
         <button className="confirm">
            <Link to="/diary/create" style={{ textDecoration: 'none', color: 'inherit' }}>
               등록
            </Link>
         </button>
         {/* 페이지네이션 버튼 */}
         <div className="pagination" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <button disabled={pagination.currentPage === 1} onClick={() => dispatch(fetchDiariesThunk(pagination.currentPage - 1))} style={{ marginRight: '10px' }}>
               이전
            </button>
            <span>
               {pagination.currentPage} / {pagination.totalPages}
            </span>
            <button disabled={pagination.currentPage === pagination.totalPages} onClick={() => dispatch(fetchDiariesThunk(pagination.currentPage + 1))} style={{ marginLeft: '10px' }}>
               다음
            </button>
         </div>
      </>
   )
}

export default DiaryDetail
