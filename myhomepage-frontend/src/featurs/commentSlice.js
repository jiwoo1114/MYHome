//댓글 수정 등록 삭제

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createComment, updateComment, deleteComment, getComments } from '../api/myhome_api' // API 경로 수정 필요

// 댓글 등록 Thunk
export const createCommentThunk = createAsyncThunk('comments/createComment', async (commentData, { rejectWithValue }) => {
   try {
      const response = await createComment(commentData)
      return response // 등록된 댓글 반환
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '댓글 등록 실패')
   }
})

// 댓글 수정 Thunk
export const updateCommentThunk = createAsyncThunk('comments/updateComment', async ({ commentId, updatedContent }, { rejectWithValue }) => {
   try {
      const response = await updateComment(commentId, updatedContent)
      return response // 수정된 댓글 반환
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '댓글 수정 실패')
   }
})

// 댓글 삭제 Thunk
export const deleteCommentThunk = createAsyncThunk('comments/deleteComment', async (commentId, { rejectWithValue }) => {
   try {
      const response = await deleteComment(commentId)
      return commentId // 삭제된 댓글 ID 반환
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '댓글 삭제 실패')
   }
})

// 댓글 조회 Thunk
export const fetchCommentThunk = createAsyncThunk('comments/fetchComments', async (page = 1, { rejectWithValue }) => {
   try {
      const response = await getComments(page)
      return response // 댓글 리스트와 페이징 정보 반환
   } catch (error) {
      console.error('오류 발생:', error) // 전체 오류 로그
      return rejectWithValue(error.response?.data?.message || '댓글 조회 실패')
   }
})

const commentSlice = createSlice({
   name: 'comment',
   initialState: {
      comments: [], // 댓글 리스트
      pagination: { currentPage: 1, totalPages: 1 },
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         // 댓글 등록
         .addCase(createCommentThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createCommentThunk.fulfilled, (state, action) => {
            state.loading = false
            state.comments.unshift(action.payload) // 새 댓글을 리스트 앞에 추가
         })
         .addCase(createCommentThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         // 댓글 수정
         .addCase(updateCommentThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(updateCommentThunk.fulfilled, (state, action) => {
            state.loading = false
            const index = state.comments.findIndex((c) => c.id === action.payload.id)
            if (index !== -1) {
               state.comments[index] = action.payload // 수정된 댓글 갱신
            }
         })
         .addCase(updateCommentThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         // 댓글 삭제
         .addCase(deleteCommentThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deleteCommentThunk.fulfilled, (state, action) => {
            state.loading = false
            state.comments = state.comments.filter((c) => c.id !== action.payload) // 삭제된 댓글 제외
         })
         .addCase(deleteCommentThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         // 댓글 조회
         .addCase(fetchCommentThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchCommentThunk.fulfilled, (state, action) => {
            state.loading = false
            state.comments = action.payload.comments // 댓글 리스트 갱신
            state.pagination = {
               // 페이징 데이터
               currentPage: action.payload.currentPage,
               totalPages: action.payload.totalPages,
            }
         })
         .addCase(fetchCommentThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default commentSlice.reducer
