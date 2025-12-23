import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

import './App.css'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const usernameRef = useRef()
  const passwordRef = useRef()

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('blogAppUser')

    if (loggedUserJSON) {
      const parsedUser = JSON.parse(loggedUserJSON)

      setUser(parsedUser)
      blogService.setToken(parsedUser.token)
    }
  }, [])
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

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
    }
    catch(error) {
      console.log('wrong credentials', error)
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

    }
    catch(error) {
      
    }
  }

  let mainElem = (
    <>
      <h2>log in to application</h2>
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
        <h2>blogs</h2>
        <p>
          {user.name} logged in 
          <button onClick={handleLogout}>Logout</button>
        </p>
        
        <BlogForm />

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
        {mainElem}
      </section>
    </main>
  )
}

export default App