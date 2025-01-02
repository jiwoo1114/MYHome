import React, { useState, useCallback, useMemo } from 'react'
import '../../style/diaryform.css'

function DiaryForm({ onSubmit, initialValues = {} }) {
   const [imgUrl, setImgUrl] = useState(initialValues.img ? process.env.REACT_APP_API_URL + initialValues.img : '')
   const [imgFile, setImgFile] = useState(null)
   const [content, setContent] = useState(initialValues.content || '')
   const [title, setTitle] = useState(initialValues.title || '') // 제목 추가

   // 이미지 파일 미리보기
   const handleImageChange = useCallback((e) => {
      const file = e.target.files && e.target.files[0]
      if (!file) return

      setImgFile(file)

      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onload = (event) => {
         setImgUrl(event.target.result)
      }
   }, [])

   // 작성한 내용 전송
   const handleSubmit = useCallback(
      (e) => {
         e.preventDefault()

         if (!title.trim()) {
            alert('제목을 입력하세요.')
            return
         }

         if (!content.trim()) {
            alert('내용을 입력하세요.')
            return
         }

         if (!imgFile && !initialValues.id) {
            alert('이미지 파일을 추가하세요.')
            return
         }

         const formData = new FormData()
         formData.append('id', initialValues.id) // 수정할 다이어리의 ID
         formData.append('title', title)
         formData.append('content', content)
         if (imgFile) {
            formData.append('img', imgFile) // 이미지가 있으면 추가
         }

         console.log('전송 데이터:', { id: initialValues.id, title, content, imgFile })
         onSubmit(formData) // 상위 컴포넌트로 데이터 전송
      },

      [title, content, imgFile, onSubmit, initialValues.id]
   )

   // 버튼 라벨 설정 (등록/수정)
   const submitButtonLabel = useMemo(() => (initialValues.id ? '수정하기' : '등록하기'), [initialValues.id])

   return (
      <>
         <h1>다이어리 작성중......</h1>
         <form className="form" onSubmit={handleSubmit}>
            <p>사진 파일</p>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imgUrl && (
               <div style={{ marginTop: '20px' }}>
                  <h3>미리보기</h3>
                  <img src={imgUrl} alt="Uploaded Preview" style={{ width: '300px', borderRadius: '10px' }} />
               </div>
            )}
            <p>제목</p>
            <input type="text" className="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <p>글 내용</p>
            <textarea className="text" value={content} onChange={(e) => setContent(e.target.value)} rows="5" style={{ width: '100%', padding: '10px' }} />
            <button type="submit" className="submit-button">
               {submitButtonLabel}
            </button>
         </form>
      </>
   )
}

export default DiaryForm
