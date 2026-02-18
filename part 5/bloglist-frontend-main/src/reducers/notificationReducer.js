import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: null,
    type: "standard-notification",
  },
  reducers: {
    setNotification(state, action) {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    removeNotification(state) {
      state.message = null;
      state.type = "standard-notification";
    },
  },
});

const { setNotification, removeNotification } = notificationSlice.actions;

export function showNotification(notificationObject, time) {
  return (dispatch) => {
    dispatch(setNotification(notificationObject));

    setTimeout(() => dispatch(removeNotification()), time * 1000);
  };
}

export default notificationSlice.reducer;
