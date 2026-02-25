import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, Link, useMatch } from 'react-router-dom';

import { initializeBlogs } from "./reducers/blogReducer";

import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import UserForm from "./components/UserForm";
import Togglable from "./components/Togglable";

import "./App.css";
import Blogs from "./components/Blogs";
import { initializeUser, logout } from "./reducers/userReducer";
import Users from "./components/Users";
import User from "./components/User";

const App = () => {
  const users = useSelector(({ users }) => users);
  const user = useSelector(({ user }) => user);

  const dispatch = useDispatch();

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const matchUser = useMatch('/users/:id');
  const userById = matchUser ? users.find(u => u.id === matchUser.params.id) : null;

  let mainElem = <UserForm />;
  if (user) {
    mainElem = (
      <>
        <p>
          {user.name} logged in
          <button onClick={() => dispatch(logout())}>Logout</button>
        </p>

        {
          /* <Togglable buttonLabel={"create new blog"} ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef} />
          </Togglable> */
        }

        <Routes>
          <Route path="/" element={ <Users /> } />
          <Route path="/users/:id" element={ <User user={userById} /> } />
        </Routes>
      </>
    );
  }

  return (
    <main>
      <h1>Blogs</h1>
      <Notification />

      <section>  
        {mainElem}
      </section>
    </main>
  );
};

export default App;
