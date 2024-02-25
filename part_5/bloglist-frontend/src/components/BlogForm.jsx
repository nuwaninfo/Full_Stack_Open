import { useState } from 'react'

const BlogForm = ({ blogFormProps }) => {
  const { blogFormVisible, setBlogFormVisible, addBlog } = blogFormProps

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
  const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

  const handleBlogCreate = () => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
    }
    addBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={() => setBlogFormVisible(true)}>new blog</button>
      </div>
      <div style={showWhenVisible}>
        <h2>create new</h2>
        <form onSubmit={handleBlogCreate}>
          <div>
            title:
            <input
              type='text'
              value={title}
              name='title'
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              type='text'
              value={author}
              name='author'
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              type='text'
              value={url}
              name='url'
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <div>
            <button type='submit'>Create</button>
          </div>
          <div>
            <button type='button' onClick={() => setBlogFormVisible(false)}>
              cancel
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default BlogForm
