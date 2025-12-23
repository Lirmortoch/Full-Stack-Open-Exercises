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

      blogService.setToken(user.token)
      setUser(user)

      usernameRef.current.value = ''
      passwordRef.current.value = ''
    }
    catch(error) {
      console.log('wrong credentials', error)
    }
  }

  const userForm = () => (
    <section>
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
    </section>
  )
  const blogsList = () => (
    <section>
      <h2>blogs</h2>
      <p>{user.name}</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </section>
  )
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [user])

  return (
    <main>
      {user && blogsList()}
      {!user && userForm()}
    </main>
  )
}

export default App