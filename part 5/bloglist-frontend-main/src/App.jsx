import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

import './App.css'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({message: null, type: 'standard-notification'});

  const usernameRef = useRef()
  const passwordRef = useRef()

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('blogAppUser')

    if (loggedUserJSON) {
      const parsedUser = JSON.parse(loggedUserJSON);

      blogService.setToken(parsedUser.token);
      setUser(parsedUser);
    }
  }, [])
  useEffect(() => {
    blogService.getAllBlogs().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  function handleSetNotification(message, type) {
    setNotification({message, type});
    setTimeout(() => setNotification({message: null, type: 'standard-notification'}), 3000);
  }
  async function handleLogin(e) {
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
  function handleLogout() {
    localStorage.removeItem('blogAppUser');

    setUser(null);
    blogService.setToken(null);
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
      setBlogs(prevBlogs => prevBlogs.concat(returnedBlog))

      handleSetNotification(
        `a new blog "${blog.title}" by ${blog.author} added`, 
        'standard-notification'
      );
    }
    catch (error) {
      console.log('something went wrong: ', error);
      handleSetNotification('something went wrong', 'error');
    }

    title.current.value = '';
    author.current.value = '';
    url.current.value = '';
  }

  let mainElem = (
    <>
      <form onSubmit={handleLogin}>
        <fieldset>
          <label htmlFor='user-form-username'>username</label>
          <input type='text' id='user-form-username' name='user-form-username' ref={usernameRef} />
        </fieldset>

        <fieldset>
          <label htmlFor='user-form-password'>password</label>
          <input type='password' id='user-form-password' name='user-form-password' ref={passwordRef} />
        </fieldset>
        <button type='submit' className='user-form__btn form__btn'>Log In</button>
      </form>
    </>
  )
  if (user) {
    mainElem = (
      <>
        <p>
          {user.name} logged in 
          <button onClick={handleLogout}>Logout</button>
        </p>
        
        <BlogForm handleAddBlog={handleAddBlog} />

        <ul>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </ul>
      </>
    )
  }

  return (
    <main>
      <section>
        <h2>{user ? "blogs" : "log in to application"}</h2>
        <Notification message={notification.message} type={notification.type} />
        {mainElem}
      </section>
    </main>
  )
}

export default App