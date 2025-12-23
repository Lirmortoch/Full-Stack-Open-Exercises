import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const usernameRef = useRef()
  const passwordRef = useRef()

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

  let mainElem = (
    <>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <fieldset>
          <label htmlFor='form-username'>username</label>
          <input type='text' id='form-username' name='form-username' ref={usernameRef} />
        </fieldset>
        <fieldset>
          <label htmlFor='form-password'>password</label>
          <input type='password' id='form-password' name='form-password' ref={passwordRef} />
        </fieldset>
        <button type='submit' className='form__btn'>Log In</button>
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
        
        <ul>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </ul>
      </>
    )
  }
  
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

  return (
    <main>
      <section>
        {mainElem}
      </section>
    </main>
  )
}

export default App