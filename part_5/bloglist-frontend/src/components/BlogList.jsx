import Blog from './Blog'

const BlogList = ({ blogs, user }) => {
  return (
    <>
      <br />
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
      </div>
    </>
  )
}

export default BlogList
