import { useState, useEffect } from 'react'

import LoginForm from './components/LoginForm'
import LogOut from './components/LogOut'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState({
    message: null,
    type: null,
  })

  const [blogFormVisible, setBlogFormVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      setErrorMessage({
        message: null,
        type: null,
      })
      blogService.setToken(user)
      setUser(user)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage({ message: 'Wrong credentials', type: 'error' })
      setTimeout(() => {
        setErrorMessage({
          message: null,
          type: null,
        })
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    window.location.reload()
    setUser('')
  }

  const addBlog = async (newBlog) => {
    try {
      const response = await blogService.create(newBlog)

      setErrorMessage({
        message: `a new blog ${response.title} added`,
        type: 'success',
      })
      setTimeout(() => {
        setErrorMessage({
          message: null,
          type: null,
        })
      }, 5000)
    } catch (error) {
      console.error('Error creating blog:', error)
    }
  }

  const blogFormProps = {
    blogFormVisible,
    setBlogFormVisible,
    addBlog,
  }

  return (
    <div>
      {user === null && (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          messageObj={errorMessage}
        />
      )}
      {user !== null && (
        <>
          <h2>blogs</h2>
          <Notification messageObj={errorMessage} />
          <LogOut name={user.name} handleLogout={handleLogout} />
          <BlogForm blogFormProps={blogFormProps} />
          <BlogList blogs={blogs} />
        </>
      )}
    </div>
  )
}

export default App
