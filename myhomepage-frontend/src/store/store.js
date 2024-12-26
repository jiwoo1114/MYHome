import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../featurs/authSlice'


const store = configureStore({
   reducer: {

      auth:authReducer
      
   },
})

export default store