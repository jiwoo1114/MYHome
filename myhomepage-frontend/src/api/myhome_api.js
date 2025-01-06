import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_URL

//axios 인스턴스 생성
const myhomeApi = axios.create({
   baseURL: BASE_URL,
   headers: {
      'Content-Type': 'application/json',
   },
   withCredentials: true, //세션 쿠키를 요청에 포함
})

//회원가입
export const registerUser = async (userData) => {
   try {
      // userData: 회원가입 창에서 입력한 데이터
      const response = await myhomeApi.post('/auth/join', userData)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error //request 할때 오류 발생시 에러를 registerUser() 함수를 실행한 곳으로 던짐
   }
}

//로그인
export const loginUser = async (credentials) => {
   try {
      const response = await myhomeApi.post('/auth/login', credentials)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//로그아웃
export const logoutUser = async () => {
   try {
      const response = await myhomeApi.get('/auth/logout')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//로그인 상태 확인
export const checkAuthStatus = async () => {
   try {
      const response = await myhomeApi.get('/auth/status')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 다이어리(게시물) 작성
export const diarycreate = async (diaryData) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data', // 파일 전송 시 지정
         },
      }
      const response = await myhomeApi.post(`/diary/create`, diaryData, config)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 다이어리 수정
export const updatePost = async (id, diaryData) => {
   try {
      const config = {
         // try문 내에서 config 정의
         headers: {
            'Content-Type': 'multipart/form-data', // 파일 전송 시 지정
         },
      }
      const response = await myhomeApi.put(`/diary/update/${id}`, diaryData, config)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 다이어리 삭제
export const deletePost = async (id) => {
   try {
      const response = await myhomeApi.delete(`/diary/delete/${id}`) // Base URL 반영
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 전체 포스트 가져오기(페이징)
export const getPosts = async (page) => {
   try {
      const response = await myhomeApi.get(`/diary/all?page=${page}`, { params: { page } }) // 페이지 번호 추가
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 댓글 등록 API
export const createComment = async (commentData) => {
   try {
      const response = await myhomeApi.post('/comment/create', commentData) // `/comments` 경로로 POST 요청
      return response.data // 댓글 등록 성공 데이터 반환
   } catch (error) {
      console.error(`댓글 등록 오류: ${error.message}`)
      throw error
   }
}

// 댓글 수정 API
export const updateComment = async (commentId, updatedContent) => {
   try {
      const response = await myhomeApi.put(`/comment/update/${commentId}`, { content: updatedContent }) // `/comments/:id` 경로로 PUT 요청
      return response.data // 수정된 댓글 데이터 반환
   } catch (error) {
      console.error(`댓글 수정 오류: ${error.message}`)
      throw error
   }
}

// 댓글 삭제 API
export const deleteComment = async (commentId) => {
   try {
      const response = await myhomeApi.delete(`/comment/delete/${commentId}`) // `/comments/:id` 경로로 DELETE 요청
      return response.data // 삭제 성공 메시지 반환
   } catch (error) {
      console.error(`댓글 삭제 오류: ${error.message}`)
      throw error
   }
}

// 댓글 전체 조회 API
export const getComments = async (page = 1) => {
   try {
      const response = await myhomeApi.get(`/comment`, {
         params: { page }, // 쿼리로 페이지 번호 전달
      })
      console.log('API 응답:', response.data) // 서버 응답 데이터 확인
      return response.data // 댓글 데이터와 페이징 정보 반환
   } catch (error) {
      console.error(`댓글 조회 오류: ${error.message}`)
      throw error
   }
}

/// 프로필 및 썸네일 사진 등록/수정 API
export const updateProfile = async (formData) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data', // 파일 전송 시 필수
         },
      }

      const response = await myhomeApi.post('/profile/update-profile', formData, config) // 라우트 경로에 맞게 요청
      return response.data // 성공 메시지 반환
   } catch (error) {
      console.error(`프로필/썸네일 업데이트 오류: ${error.message}`)
      throw error
   }
}

// 프로필 및 썸네일 삭제 API
export const deleteProfile = async () => {
   try {
      const response = await myhomeApi.delete('/profile/delete-profile') // DELETE 요청
      return response.data // 성공 메시지 반환
   } catch (error) {
      console.error(`프로필/썸네일 삭제 오류: ${error.message}`)
      throw error
   }
}
