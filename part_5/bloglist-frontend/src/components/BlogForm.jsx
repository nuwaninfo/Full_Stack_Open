const BlogForm = ({ blogFormProps }) => {
  const { title, author, url, setTitle, setAuthor, setUrl, handleBlogCreate } =
    blogFormProps

  return (
    <>
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
      </form>
    </>
  )
}

export default BlogForm
