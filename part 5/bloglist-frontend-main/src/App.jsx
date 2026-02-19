import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { showNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from './reducers/blogReducer';

import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import UserForm from "./components/UserForm";
import Togglable from "./components/Togglable";

import "./App.css";
import Blogs from "./components/Blogs";

const App = () => {
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  const noteFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem("blogAppUser");

    if (loggedUserJSON) {
      const parsedUser = JSON.parse(loggedUserJSON);

      blogService.setToken(parsedUser.token);
      setUser(parsedUser);
    }
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  function handleLogout() {
    localStorage.removeItem("blogAppUser");

    setUser(null);
    blogService.setToken(null);
  }

  async function handleLogin(username, password) {
    try {
      const user = await loginService.login({ username, password });

      localStorage.setItem("blogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);

      setUser(user);

      dispatch(
        showNotification(
          {
            message: `You'are successfully logged in`,
            type: "standard-notification",
          }, 5
        ),
      );
    } catch (error) {
      console.log("wrong username or password", error.message);
      dispatch(showNotification({
        message: "wrong username or password", 
        type: "error",
      }, 5));
    }
  }

  let mainElem = <UserForm login={handleLogin} />;
  if (user) {
    mainElem = (
      <>
        <p>
          {user.name} logged in
          <button onClick={handleLogout}>Logout</button>
        </p>

        <Togglable buttonLabel={"create new blog"} ref={noteFormRef}>
          <BlogForm />
        </Togglable>

        <Blogs user={user} />
      </>
    );
  }

  return (
    <main>
      <h1>Blogs</h1>
      <section>
        <Notification />
        {mainElem}
      </section>
    </main>
  );
};

export default App;
