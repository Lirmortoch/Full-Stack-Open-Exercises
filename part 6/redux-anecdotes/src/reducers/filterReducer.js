const filterChange = filter => {
  return {
    type: 'SET_FILTER',
    payload: filter,
  }
}

const filterReducer = (state = 'ALL', action) => {
  if (action.type === 'SET_FILTER') {
    return action.payload
  }
  
  return state
}

export { filterReducer, filterChange }