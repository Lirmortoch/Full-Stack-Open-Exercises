import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, Link } from 'react-router-dom';

import { initializeBlogs } from "./reducers/blogReducer";

import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import UserForm from "./components/UserForm";
import Togglable from "./components/Togglable";

import "./App.css";
import Blogs from "./components/Blogs";
import { initializeUser, logout } from "./reducers/userReducer";
import Users from "./components/Users";

const App = () => {
  const user = useSelector(({ user }) => user);

  const dispatch = useDispatch();

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  let mainElem = <UserForm />;
  if (user) {
    mainElem = (
      <>
        <p>
          {user.name} logged in
          <button onClick={() => dispatch(logout())}>Logout</button>
        </p>

        {/* <Togglable buttonLabel={"create new blog"} ref={blogFormRef}>
          <BlogForm blogFormRef={blogFormRef} />
        </Togglable>

        <Blogs /> */}

        <Routes>
          <Route path="/" element={ <Users /> } />
        </Routes>
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
