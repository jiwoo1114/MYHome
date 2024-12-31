//마이홈 창 프로필이미지,자기정보,썸네일 사진 수정등록

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateProfile, deleteProfile } from '../api/myhome_api'

// 프로필 및 썸네일 사진 등록/수정 Thunk
export const updateProfileThunk = createAsyncThunk(
    'profile/updateProfile',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await updateProfile(formData);
            return response; // 성공 시 API 응답 반환
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || '프로필/썸네일 업데이트 실패');
        }
    }
);

// 프로필 및 썸네일 사진 삭제 Thunk
export const deleteProfileThunk = createAsyncThunk(
    'profile/deleteProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await deleteProfile();
            return response; // 성공 시 API 응답 반환
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || '프로필/썸네일 삭제 실패');
        }
    }
);

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profileImage: null, // 현재 등록된 프로필 이미지
        thumbnailImage: null, // 현재 등록된 썸네일 이미지
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // 프로필 및 썸네일 업데이트
            .addCase(updateProfileThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfileThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.profileImage = action.payload.profileImage || state.profileImage;
                state.thumbnailImage = action.payload.thumbnailImage || state.thumbnailImage;
            })
            .addCase(updateProfileThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // 프로필 및 썸네일 삭제
            .addCase(deleteProfileThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProfileThunk.fulfilled, (state) => {
                state.loading = false;
                state.profileImage = null;
                state.thumbnailImage = null;
            })
            .addCase(deleteProfileThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default profileSlice.reducer;
