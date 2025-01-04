import { useState } from 'react'
import blogs from '../services/blogs'

const Blog = ({ blog, handleDelete, handleUpdate }) => {
  const [visible, setVisible] = useState(false)

  // const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleButtonLabel = visible ? 'hide' : 'view'

  const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // const likeBlog = () => {
  //   const updatedBlog = { ...blog, likes: likes + 1 }
  //   blogs.update(blog.id, updatedBlog)
  //   setLikes(likes + 1)
  // }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      handleDelete(blog.id)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
      <div className="blog" style={blogStyle}>
        
          <span>{blog.title} - {blog.author}</span>
          <button onClick={toggleVisibility}>{toggleButtonLabel}</button>

          <div className="blogDetails" style={showWhenVisible}> 
            <p>{blog.url}</p>
            <p>likes: {blog.likes} {loggedUserJSON && <button onClick={() => handleUpdate(blog.id, blog)}>like</button>}</p>
            {loggedUserJSON && <button onClick={removeBlog}>remove</button>}
        </div>

        

    </div> 
  )
}
export default Blog