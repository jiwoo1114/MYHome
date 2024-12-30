import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../featurs/authSlice'
import diaryReducer from '../featurs/diarySlice'


const store = configureStore({
   reducer: {

      auth: authReducer,
      diary: diaryReducer,
   },
})

export default store