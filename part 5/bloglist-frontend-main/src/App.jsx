import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useMatch } from 'react-router-dom';

import { initializeBlogs } from "./reducers/blogReducer";

import Notification from "./components/Notification";
import UserForm from "./components/UserForm";

import "./App.css";
import Blog from "./components/Blog";
import { initializeUser } from "./reducers/userReducer";
import Users from "./components/Users";
import User from "./components/User";
import Blogs from "./components/Blogs";
import Menu from "./components/Menu";

const App = () => {
  const users = useSelector(({ users }) => users);
  const user = useSelector(({ user }) => user);
  const blogs = useSelector(({ blogs }) => blogs);
  
  const [initialized, setInitialized] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUser());
    setInitialized(true);
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeBlogs());
    setInitialized(true);
  }, [dispatch]);
;
  const userMatch = useMatch('/users/:id');
  const userById = userMatch 
    ? users.find(u => u.id === userMatch.params.id) 
    : null;

  const blogMatch = useMatch('/blogs/:id');
  const blogById = blogMatch 
    ? blogs.find(b => b.id === blogMatch.params.id) 
    : null;

  let mainElem = <UserForm />;
  if (user) {
    mainElem = (
      <>
        <Routes>
          <Route path="/" element={ <Blogs blogs={blogs} /> } />
          <Route path="/users" element={ <Users /> } />
          <Route path="/users/:id" element={ <User user={userById} /> } />
          <Route path="/blogs/:id" element={ <Blog blog={blogById} /> }/>
        </Routes>
      </>
    );
  }

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <Menu />
      <Notification />

      <section className="p-2">  
        <h1 className="text-3xl mb-8">Blogs</h1>
        {mainElem}
      </section>
    </main>
  );
};

export default App;