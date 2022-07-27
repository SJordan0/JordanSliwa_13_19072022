import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../Reducer/user"

export default configureStore({
  reducer: {
    user: userReducer,
  },
})