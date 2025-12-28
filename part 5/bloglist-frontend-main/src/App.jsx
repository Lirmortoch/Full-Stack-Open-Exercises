import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

import './App.css'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import UserForm from './components/UserForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({message: null, type: 'standard-notification'});

  const noteFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('blogAppUser')

    if (loggedUserJSON) {
      const parsedUser = JSON.parse(loggedUserJSON);

      blogService.setToken(parsedUser.token);
      setUser(parsedUser);
    }
  }, [])
  useEffect(() => {
    blogService.getAllBlogs().then(blogs => {
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    })  
  }, [])

  function handleSetNotification(message, type) {
    setNotification({message, type});
    setTimeout(() => setNotification({message: null, type: 'standard-notification'}), 3000);
  }
  function handleLogout() {
    localStorage.removeItem('blogAppUser');

    setUser(null);
    blogService.setToken(null);
  }

  async function handleLogin(e, usernameRef, passwordRef) {
    e.preventDefault()

    try {
      const username = usernameRef.current.value
      const password = passwordRef.current.value

      const user = await loginService.login({ username, password })

      localStorage.setItem('blogAppUser', JSON.stringify(user));
      blogService.setToken(user.token)

      setUser(user)

      usernameRef.current.value = ''
      passwordRef.current.value = ''

      handleSetNotification(
        `You'are successfully logged in`, 
        'standard-notification'
      );
    }
    catch(error) {
      console.log('wrong credentials', error.message)
      handleSetNotification('wrong username or password', 'error');
    }
  }
  
  async function handleAddBlog(e, title, author, url) {
    e.preventDefault()

    try {
      const blog  = {
        title: title.current.value,
        author: author.current.value,
        url: url.current.value,
      };
      
      const returnedBlog = await blogService.createNewBlog(blog);
      setBlogs(prevBlogs => prevBlogs.concat(returnedBlog).sort((a, b) => b.likes - a.likes))

      handleSetNotification(
        `a new blog "${blog.title}" by ${blog.author} added`, 
        'standard-notification'
      );

      noteFormRef.current.handleToggleVisibility();
    }
    catch (error) {
      setBlogs(blogs);

      console.log('something went wrong: ', error);
      handleSetNotification('something went wrong', 'error');
    }

    title.current.value = '';
    author.current.value = '';
    url.current.value = '';
  }
  async function handleLikeBlog(id, blog) {
    try {
      const newBlog  = {
        likes: blog.likes + 1,
      };

      const updatedBlog = await blogService.updateBlog(id, newBlog);
      setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== id).concat(updatedBlog).sort((a, b) => b.likes - a.likes));    
    } catch (error) {
      setBlogs(blogs);

      console.log('something went wrong: ', error);
      handleSetNotification('something went wrong', 'error');
    }
  }
  async function handleDeleteBlog(id, blog) {
    const isDelete = window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`);

    if (isDelete) {
      try {
        const data = await blogService.deleteBlog(id);

        handleSetNotification(
          `a blog "${blog.title}" was deleted`, 
          'standard-notification'
        );

        setBlogs(prevBlogs => prevBlogs.filter(bl => bl.id !== id))
      } 
      catch (error) {
        setBlogs(blogs);

        console.log('something went wrong: ', error);
        handleSetNotification('something went wrong', 'error');
      }
    }
  }

  let mainElem = (
    <UserForm handleLogin={handleLogin} />
  )
  if (user) {
    mainElem = (
      <>
        <p>
          {user.name} logged in 
          <button onClick={handleLogout}>Logout</button>
        </p>
        
        <Togglable buttonLabel={'create new blog'} ref={noteFormRef} >
          <BlogForm handleAddBlog={handleAddBlog} />
        </Togglable>

        <ul>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleLikeBlog={handleLikeBlog} handleDeleteBlog={handleDeleteBlog} name={user.name} />
          )}
        </ul>
      </>
    )
  }

  return (
    <main>
    <h1>Blogs</h1>
      <section>
        <Notification message={notification.message} type={notification.type} />
        {mainElem}
      </section>
    </main>
  )
}

export default App