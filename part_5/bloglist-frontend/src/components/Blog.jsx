import { useState } from 'react'

const Blog = ({ blog, user }) => {
  const [detailsVisible, setdetailsVisible] = useState(false)

  const hideWhenVisible = { display: detailsVisible ? 'none' : '' }
  const showWhenVisible = { display: detailsVisible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        &nbsp;
        <button
          style={hideWhenVisible}
          type='button'
          onClick={() => {
            setdetailsVisible(true)
          }}
        >
          view
        </button>
        <button
          style={showWhenVisible}
          type='button'
          onClick={() => setdetailsVisible(false)}
        >
          hide
        </button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button type='button'>like</button>
        </div>
        <div>{user.name}</div>
      </div>
    </div>
  )
}

export default Blog
