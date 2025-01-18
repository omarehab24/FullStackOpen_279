import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import Notification from './components/Notification' 
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null, type: null })
  const [loginVisible, setLoginVisible] = useState(false)

  // useEffect(() => {
  //   blogService.getAll().then(blogs => setBlogs(blogs))  
  // }, [])

  const sortBlogs = (blogs) => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
    setBlogs(sortedBlogs)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    const fetchBlogs = async () => {
      if (user) {
        try {
          const getUserBlogs = await userService.getUser(user.username)
          setBlogs(getUserBlogs.blogs)
          sortBlogs(getUserBlogs.blogs)
        } catch (error) {
          console.error('Failed to fetch user data:', error)
        window.localStorage.removeItem('loggedBlogAppUser')
        setUser(null)
        blogService.setToken(null)
        setBlogs([])
        }
      }
    }
    fetchBlogs()
  }, [user])

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setNotification({ message: 'logged in successfully', type: 'success' })
      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 5000)
    } catch (exception) {
      setNotification({ message: 'wrong username or password', type: 'error' })
      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    setBlogs([])
    setNotification({ message: 'logged out successfully', type: 'success' })
    setTimeout(() => {
      setNotification({ message: null, type: null })
    }, 5000)

  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setNotification({ message: `a new blog: ${blogObject.title} by author: ${blogObject.author} added`, type: 'success' })
      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 5000)

    } catch (exception) {
      setNotification({ message: 'something went wrong', type: 'error' })
      console.error(exception)
      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 5000)
    }
  }

  const deleteBlog = async (blogId) => {
    try {
      await blogService.remove(blogId)
      setBlogs(blogs.filter(blog => blog.id !== blogId))
      setNotification({ message: 'blog removed successfully', type: 'success' })
      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 5000)
    } catch (exception) {
      setNotification({ message: 'failed to remove blog', type: 'error' })
      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 5000)
    }
  }

  const likeBlog = async (blogId, blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogId, { ...blogObject, likes: blogObject.likes + 1 })
      const updatedBlogs = blogs.map(blog => blog.id !== blogId ? blog : updatedBlog)
      setBlogs(updatedBlogs)
      sortBlogs(updatedBlogs)
    } catch (exception) {
      setNotification({ message: 'failed to update blog', type: 'error' })
      // console.error(exception)
      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 5000)
    }
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}> log in </button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
            setUsername={(e) => setUsername(e.target.value)}
            setPassword={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => setLoginVisible(false)}> cancel </button>
        </div>
      </div>
    )
  }

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )


  
  return (
    <div>
      <h2>blogs</h2>
      
      <Notification message={notification.message} type={notification.type} />
      {user
        ? <div>
            {user.name} logged in
            <button id="logout-button" onClick={handleLogout}>logout</button>
            <br />

            {blogForm()}
          </div>
        : loginForm()
      }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleDelete={deleteBlog} handleUpdate={likeBlog} />
      )}
    </div>
  )
}

export default App