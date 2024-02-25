const BlogForm = ({ blogFormProps }) => {
  const {
    title,
    author,
    url,
    setTitle,
    setAuthor,
    setUrl,
    handleBlogCreate,
    blogFormVisible,
    setBlogFormVisible,
  } = blogFormProps

  const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
  const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

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
