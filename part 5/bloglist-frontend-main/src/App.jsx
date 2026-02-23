import { useState, useEffect, useRef, useContext } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

import "./App.css";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import UserForm from "./components/UserForm";
import Togglable from "./components/Togglable";
import { NotificationContext } from "./store/NotificationContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const App = () => {
  const queryClient = useQueryClient();

  const [user, setUser] = useState(null);
  const { showNotification } = useContext(NotificationContext);

  const noteFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem("blogAppUser");

    if (loggedUserJSON) {
      const parsedUser = JSON.parse(loggedUserJSON);

      blogService.setToken(parsedUser.token);
      setUser(parsedUser);
    }
  }, []);

  const result = useQuery({
    queryKey: ['blogs'], 
    queryFn: blogService.getAllBlogs,
    refetchOnWindowFocus: false,
  });
  const newBlogMutation = useMutation({
    mutationFn: blogService.createNewBlog,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries(['blogs']);

      showNotification({
        message: `a new blog "${newBlog.title}" by ${newBlog.author} added`,
        type: "standard-notification",
      });

      noteFormRef.current.handleToggleVisibility();
    },
    onError: (error) => {
      console.log("something went wrong: ", error);
      showNotification({
        message: "something went wrong", 
        type: "error"
      });
    },
  });
  const likeBlogMutation = useMutation({
    mutationFn: blogService.updateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs']);
    },
    onError: (error) => {
      console.log("something went wrong: ", error);
      showNotification({
        message: "something went wrong", 
        type: "error"});
    }
  });
  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: (deletedBlog) => {
      queryClient.invalidateQueries(['blogs']);
      showNotification({
        message: `a blog "${deletedBlog.title}" was deleted`,
        type: "standard-notification",
      });
    },
    onError: (error) => {
      console.log("something went wrong: ", error);
      showNotification({
        message: "something went wrong", 
        type: "error"
      });
    },
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const blogs = result.data.sort((a, b) => b.likes - a.likes);

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

  function handleAddBlog(blog) {
    newBlogMutation.mutate(blog);
  }
  function handleLikeBlog(id, blog) {
    const newBlog = {
      likes: blog.likes + 1,
    };

    likeBlogMutation.mutate({ id, newBlog });
  }
  function handleDeleteBlog(id, blog) {
    const isDelete = window.confirm(
      `Remove blog "${blog.title}" by ${blog.author}?`,
    );

    if (isDelete) {
      deleteBlogMutation.mutate({ id });
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

        <ul>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLikeBlog={handleLikeBlog}
              handleDeleteBlog={handleDeleteBlog}
              name={user.name}
            />
          ))}
        </ul>
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
