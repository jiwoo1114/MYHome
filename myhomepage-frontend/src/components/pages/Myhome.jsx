//마이홈(댓글작성,프로필 수정하는 거)

import '../../style/Myhome.css'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateProfile } from '../../api/myhome_api'
import { fetchCommentThunk, deleteCommentThunk } from '../../featurs/commentSlice'

const Myhome = () => {
   const dispatch = useDispatch()
   const { comments, loading, pagination } = useSelector((state) => state.comment)
   const [profileImage, setProfileImage] = useState(null)
   const [thumbnailImage, setThumbnailImage] = useState(null)
   const [nickname, setNickname] = useState('')
   const [email, setEmail] = useState('')
   const [comment, setComment] = useState('')

   //프로필 등록 기능 함수
   const handleProfileUpload = async () => {
      const formData = new FormData()
      if (profileImage) formData.append('profileImage', profileImage)
      if (thumbnailImage) formData.append('thumbnailImage', thumbnailImage)
      formData.append('nick', nickname)
      formData.append('email', email)
      formData.append('comment', comment)
      try {
         const response = await updateProfile(formData)
         alert('프로필이 성공적으로 등록되었습니다.')
      } catch (error) {
         console.error('프로필 등록 실패:', error)
         alert('프로필 등록에 실패했습니다.')
      }
   }
   //댓글 삭제 로직
   const handleDelete = (commentId) => {
      if (window.confirm('댓글을 삭제하시겠습니까?')) {
         dispatch(deleteCommentThunk(commentId))
            .unwrap()
            .then(() => {
               alert('댓글이 삭제되었습니다.')
            })
            .catch((error) => {
               console.error('댓글 삭제 실패:', error)
               alert('댓글 삭제에 실패했습니다.')
            })
      }
   }
   useEffect(() => {
      const currentPage = pagination?.currentPage || 1 // 기본값 설정
      dispatch(fetchCommentThunk(currentPage))
   }, [dispatch, pagination?.currentPage])

   //페이징버튼
   const handlePageChange = (newPage) => {
      dispatch(fetchCommentThunk(newPage))
   }

   //로딩
   if (loading) return <p>Loading...</p>

   //console.log(comments, pagination)
   console.log(pagination)

   return (
      <>
         <h1>마이 홈</h1>
         <div className="container">
            <div className="header">My Home</div>

            <div className="profile-section">
               <div className="profile-box">
                  <p>프로필 이미지 부분</p>
                  <input type="file" accept="image/*" onChange={(e) => setProfileImage(e.target.files[0])} />
               </div>
               <div className="profile-box">
                  <p>nick:</p>
                  <input type="text" placeholder="닉네임 입력" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                  <p>email:</p>
                  <input type="email" placeholder="이메일 입력" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <p>comment:</p>
                  <input type="text" placeholder="코멘트 입력" value={comment} onChange={(e) => setComment(e.target.value)} />
               </div>
               <div className="profile-box">
                  <p>썸네일 이미지 부분</p>
                  <input type="file" accept="image/*" onChange={(e) => setThumbnailImage(e.target.files[0])} />
               </div>
            </div>

            <button className="create" onClick={handleProfileUpload}>
               프로필 등록
            </button>
            <div className="comment-container">
               <Link to="/comment/create" className="create">
                  댓글 작성
               </Link>
            </div>

            <div className="comment-section">
               <table className="comment-table">
                  <thead>
                     <tr>
                        <th>작성자</th>
                        <th>댓글</th>
                        <th>작성일</th>
                        <th>수정</th>
                        <th>삭제</th>
                     </tr>
                  </thead>
                  <tbody>
                     {comments.map((comment) => (
                        <tr key={comment.id}>
                           <td>{comment.User?.nick || '익명'}</td>
                           <td>{comment.content}</td>
                           <td>{new Date(comment.createdAt || Date.now()).toLocaleDateString()}</td>
                           <td>
                              <Link to={`/comment/update/${comment.id}`}>수정</Link>
                           </td>
                           <td>
                              <p onClick={() => handleDelete(comment.id)} style={{ color: 'red', cursor: 'pointer' }}>
                                 삭제
                              </p>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
               <div className="pagination" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <button disabled={!pagination || pagination.currentPage === 1} onClick={() => handlePageChange(pagination?.currentPage - 1 || 1)}>
                     이전
                  </button>
                  <span>
                     {pagination?.currentPage || 1} / {pagination?.totalPages || 1}
                  </span>
                  <button disabled={!pagination || pagination.currentPage === pagination.totalPages} onClick={() => handlePageChange((pagination?.currentPage || 1) + 1)}>
                     다음
                  </button>
               </div>
            </div>
         </div>
      </>
   )
}

export default Myhome
