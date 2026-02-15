import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: null,
    type: "standard-notification",
  },
  reducers: {
    setNotification(state, action) {
      const { message, type } = action.payload;
      state = { message, type }

      return state;
    },
    removeNotification(state, action) {
      state = {
        message: null,
        type: 'standard-notification',
      }

      return state;
    },
  },
});

const { setNotification, removeNotification } = notificationSlice.actions;

export function showNotification(notificationObject, time) {
  return (dispatch) => {
    dispatch(setNotification(notificationObject));

    setTimeout(() => dispatch(removeNotification()), time * 1000);
  }
}

export default notificationSlice.reducer;