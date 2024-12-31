import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../featurs/authSlice'
import diaryReducer from '../featurs/diarySlice'
import commentReducer from '../featurs/comment'
import profileReducer from '../featurs/profileSlice'


const store = configureStore({
   reducer: {

      auth: authReducer,
      diary: diaryReducer,
      comment: commentReducer,
      profile: profileReducer,
   },
})

export default store