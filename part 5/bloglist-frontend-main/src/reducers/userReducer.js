import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { showNotification } from "./notificationReducer";

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      const user = action.payload;
      return user;
    }
  }
});

const { setUser } = userSlice.actions;

const initializeUser = () => {
  return (dispatch) => {
    const loggedUserJSON = localStorage.getItem("blogAppUser");

    if (loggedUserJSON) {
      const parsedUser = JSON.parse(loggedUserJSON);

      blogService.setToken(parsedUser.token);
      dispatch(setUser(parsedUser));
    }
  }
}

const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });
      
      localStorage.setItem("blogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);

      dispatch(setUser(user));

      dispatch(
        showNotification(
          {
            message: `You'are successfully logged in`,
            type: "standard-notification",
          }, 5
        ),
      );
    }
    catch(error) {
      console.log("wrong username or password", error.message);
      dispatch(showNotification({
        message: "wrong username or password", 
        type: "error",
      }, 5));
    }
  }
}

const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("blogAppUser");
    
    dispatch(setUser(null));
    blogService.setToken(null);
  }
}

export { login, logout, initializeUser }
export default userSlice.reducer;