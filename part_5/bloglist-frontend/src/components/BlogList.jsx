import Blog from './Blog'

const BlogList = ({ blogs, user, addLikes }) => {
  return (
    <>
      <br />
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} addLikes={addLikes} />
        ))}
      </div>
    </>
  )
}

export default BlogList
