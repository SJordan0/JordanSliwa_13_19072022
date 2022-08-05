import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../Slice/user"

export default configureStore({
  reducer: {
    user: userReducer,
  },
})