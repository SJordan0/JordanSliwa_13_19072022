import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../Features/user"

export default configureStore({
  reducer: {
    user: userReducer,
  },
})