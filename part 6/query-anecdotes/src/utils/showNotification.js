export function showNotification(dispatch, message, time) {
  dispatch({ 
    type: 'SET', 
    payload: {
      message,
    }, 
  })
  setTimeout(() => dispatch({ type: 'CLEAR' }), time * 1000)
}