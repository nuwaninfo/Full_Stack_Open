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
      const updatedBlog = [...blogs]
      updatedBlog.push({
        id: response.id,
        title: response.title,
        author: response.author,
        url: response.url,
      })
      setBlogs(updatedBlog)
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

  const addLikes = async (newBlog) => {
    const filteredBlogs = blogs.filter((blog) => {
      if (blog.id !== newBlog.id) {
        return blog
      }
    })

    try {
      const response = await blogService.update(newBlog.id, newBlog)
      const updatedBlog = [...blogs]
      filteredBlogs.push({
        id: response.id,
        title: response.title,
        author: response.author,
        url: response.url,
        likes: response.likes,
      })

      setBlogs(filteredBlogs)
    } catch (error) {
      console.log('Error adding likes', error)
    }
  }

  const blogFormProps = {
    blogFormVisible,
    setBlogFormVisible,
    addBlog,
    user,
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
          <BlogList blogs={blogs} user={user} addLikes={addLikes} />
        </>
      )}
    </div>
  )
}

export default App
