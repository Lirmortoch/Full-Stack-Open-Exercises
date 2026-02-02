import { createContext, useReducer } from "react"

const notificationReducer = (state, action) => {
  if (action.type === 'SET') {
    return action.payload.message
  }
  else if (action.type === 'CLEAR') {
    return null
  }

  return state
}

const NotificationCtx = createContext()

export const NotificationCtxProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationCtx.Provider value={{ notification, notificationDispatch }}>
      {props.children}
    </NotificationCtx.Provider>
  )
}

export default NotificationCtx