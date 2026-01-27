import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      state = action.payload
      return state
    },
    removeNotification(state, action) {
      state = ''
      return state
    },
  }
})

const { setNotification, removeNotification, } = notificationSlice.actions

export const showNotification = (msg, time) => {
  return (dispatch) => {
    dispatch(setNotification(msg))

    setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)
  }
}

export default notificationSlice.reducer