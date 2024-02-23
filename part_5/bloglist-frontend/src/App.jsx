import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import LogOut from './components/LogOut'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
      blogService.setToken(user)
      setUser(user)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    window.location.reload()
    setUser('')
  }

  const handleBlogCreate = async () => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
    }
    try {
      const response = blogService.create(newBlog)
    } catch (error) {
      console.error('Error creating blog:', error)
    }
  }

  const blogFormProps = {
    title,
    author,
    url,
    setTitle,
    setAuthor,
    setUrl,
    handleBlogCreate,
  }

  const blogList = () => {
    return (
      <>
        <br />
        <div>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      </>
    )
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
        />
      )}
      {user !== null && (
        <>
          <h2>blogs</h2>
          <LogOut name={user.name} handleLogout={handleLogout} />
          <BlogForm blogFormProps={blogFormProps} />
          {blogList()}
        </>
      )}
    </div>
  )
}

export default App
