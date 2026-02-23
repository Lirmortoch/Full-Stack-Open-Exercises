import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers: (state, action) => {
      const users = action.payload;
      return users;
    }
  }
});

const { setUsers } = usersSlice.actions;

const initializeUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAllUsers();
    dispatch(setUsers(users));
  }
}

export { initializeUsers,  }
export default usersSlice.reducer;