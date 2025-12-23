import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const usernameRef = useRef()
  const passwordRef = useRef()

  function userFormSubmit(e) {
    e.preventDefault()
  }

  const userForm = () => (
    <section>
      <h2>log in to application</h2>
      <form onSubmit={userFormSubmit}>
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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </section>
  )

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <main>
      {user && blogsList()}
      {!user && userForm()}
    </main>
  )
}

export default App