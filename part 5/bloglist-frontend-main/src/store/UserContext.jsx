import { createContext, useContext, useReducer, useEffect } from "react";
import { NotificationContext } from "./NotificationContext";
import loginService from "../services/login";
import blogService from "../services/blogs";

const userReducer = (state, action) => {
  if (action.type === 'SET_USER') {
    return action.payload;
  }
  else if (action.type === 'CLEAR_USER') {
    return null;
  }
  else {
    return null;
  }
}

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(userReducer, null);
  const { showNotification } = useContext(NotificationContext);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem("blogAppUser");

    if (loggedUserJSON) {
      const parsedUser = JSON.parse(loggedUserJSON);

      blogService.setToken(parsedUser.token);
      userDispatch({type: 'SET_USER', payload: parsedUser});
    }
  }, []);

  const userLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });

      localStorage.setItem("blogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);

      userDispatch({type: 'SET_USER', payload: user});

      showNotification({
        message: `You'are successfully logged in`,
        type: "standard-notification",
      });
    } catch (error) {
      console.log("wrong username or password", error.message);
      showNotification({
        message: "wrong username or password", 
        type: "error",
      });
    }
  }
  const userLogout = () => {
    localStorage.removeItem("blogAppUser");
    
    userDispatch({ type: 'CLEAR_USER' });
    blogService.setToken(null);
  }

  const userCtxValue = {
    user,
    userLogin,
    userLogout,
  }

  return (
    <UserContext.Provider value={userCtxValue}>
      {children}
    </UserContext.Provider>
  )
}