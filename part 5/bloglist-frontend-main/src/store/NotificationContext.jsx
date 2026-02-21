import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTI':
      return {
        message: action.payload.message,
        type: action.payload.type,
      }
    case 'CLEAR_NOTI':
      return {
        message: null,
        type: "standard-notification",
      }
    default: 
      return state;
  }
}

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    message: null,
    type: "standard-notification",
  });

  const showNotification = (payload) => {
    notificationDispatch({
      type: 'SET_NOTI',
      payload,
    });

    setTimeout(() => {
      notificationDispatch({
        type: 'CLEAR_NOTI',
      });
    });
  }

  const notificationCtxValue = {
    notification,
    showNotification,
  }

  return (
    <NotificationContext.Provider value={notificationCtxValue}>
      {children}
    </NotificationContext.Provider>
  );
}