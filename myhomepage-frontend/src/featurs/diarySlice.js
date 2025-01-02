// 다이어리 수정 삭제 등록

import '../api/myhome_api'

import { diarycreate, updatePost, deletePost, getPosts } from '../api/myhome_api'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// 다이어리 등록 Thunk
export const createDiaryThunk = createAsyncThunk('diary/create', async (diaryData, { rejectWithValue }) => {
   try {
      const response = await diarycreate(diaryData)
      return response.data // 서버 응답 데이터 반환
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '다이어리 등록 실패')
   }
})

// 다이어리 수정 Thunk
export const updateDiaryThunk = createAsyncThunk('diary/update', async ({ data }, { rejectWithValue }) => {
   try {
      console.log('Thunk 데이터:', data)
      const { id, diaryData } = data
      const response = await updatePost(id, diaryData)
      return response.data // 수정된 다이어리 데이터 반환
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '다이어리 수정 실패')
   }
})

// 다이어리 삭제 Thunk
export const deleteDiaryThunk = createAsyncThunk('diary/delete', async (id, { rejectWithValue }) => {
   try {
      const response = await deletePost(id)
      return id // 삭제된 다이어리 ID 반환
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '다이어리 삭제 실패')
   }
})

// 다이어리 리스트 불러오기 Thunk
export const fetchDiariesThunk = createAsyncThunk('diary/fetchAll', async (page, { rejectWithValue }) => {
   try {
      const response = await getPosts(page)
      console.log('API 응답 데이터:', response.data)
      return response.data // 서버에서 반환한 다이어리 리스트 데이터
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '다이어리 리스트 불러오기 실패')
   }
})

// Slice 정의
const diarySlice = createSlice({
   name: 'diary',
   initialState: {
      diaries: [], // 전체 다이어리 리스트
      diary: null, // 단일 다이어리
      loading: false, // 로딩 상태
      error: null, // 에러 메시지
      pagination: null, // 페이징 데이터
   },
   reducers: {}, // 추가 리듀서가 필요하면 여기에 작성
   extraReducers: (builder) => {
      builder
         // 다이어리 등록
         .addCase(createDiaryThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createDiaryThunk.fulfilled, (state, action) => {
            state.loading = false
            state.diaries.unshift(action.payload) // 등록된 다이어리 리스트에 추가
         })
         .addCase(createDiaryThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         // 다이어리 수정
         .addCase(updateDiaryThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(updateDiaryThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(updateDiaryThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         // 다이어리 삭제
         .addCase(deleteDiaryThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deleteDiaryThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(deleteDiaryThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         // 다이어리 리스트 불러오기
         .addCase(fetchDiariesThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchDiariesThunk.fulfilled, (state, action) => {
            state.loading = false
            state.diaries = action.payload.data // 서버에서 받은 다이어리 리스트 저장
            state.pagination = action.payload.pagination // 페이지네이션 정보 저장
         })
         .addCase(fetchDiariesThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default diarySlice.reducer
