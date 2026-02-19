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

  async function handleAddBlog(blog) {
    try {
      const returnedBlog = await blogService.createNewBlog(blog);
      setBlogs((prevBlogs) =>
        prevBlogs.concat(returnedBlog).sort((a, b) => b.likes - a.likes),
      );

      dispatch(
        showNotification(
          {
            message: `a new blog "${blog.title}" by ${blog.author} added`,
            type: "standard-notification",
          }, 5
        ),
      );

      noteFormRef.current.handleToggleVisibility();
    } catch (error) {
      setBlogs(blogs);

      console.log("something went wrong: ", error);
      dispatch(showNotification({
        message: "something went wrong", 
        type: "error",
      }, 5));
    }
  }
  async function handleLikeBlog(id, blog) {
    try {
      const newBlog = {
        likes: blog.likes + 1,
      };

      const updatedBlog = await blogService.updateBlog(id, newBlog);
      setBlogs((prevBlogs) =>
        prevBlogs
          .filter((blog) => blog.id !== id)
          .concat(updatedBlog)
          .sort((a, b) => b.likes - a.likes),
      );
    } catch (error) {
      setBlogs(blogs);

      console.log("something went wrong: ", error);
      dispatch(showNotification({
        message: "something went wrong", 
        type: "error",
      }, 5));
    }
  }
  async function handleDeleteBlog(id, blog) {
    const isDelete = window.confirm(
      `Remove blog "${blog.title}" by ${blog.author}?`,
    );

    if (isDelete) {
      try {
        const data = await blogService.deleteBlog(id);

        dispatch(
          showNotification(
            {
              message: `a blog "${blog.title}" was deleted`,
              type: "standard-notification",
            }, 5
          ),
        );

        setBlogs((prevBlogs) => prevBlogs.filter((bl) => bl.id !== id));
      } catch (error) {
        setBlogs(blogs);

        console.log("something went wrong: ", error);
        dispatch(showNotification({
          message: "something went wrong", 
          type: "error"}, 5));
      }
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
          <BlogForm addBlog={handleAddBlog} />
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
