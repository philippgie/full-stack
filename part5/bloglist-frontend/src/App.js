import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

import Notification from './components/Notification'
import Footer from './components/Footer'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService
            .getAll()
            .then(initialBlogs => {
                setBlogs(initialBlogs)
            })
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
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
                username, password,
            })
            setUser(user)
            blogService.setToken(user.token)
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            setErrorMessage('successful authentication')
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const addBlog = (blogObject) => {
        console.log(blogObject)
        blogService
            .create(blogObject)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                setErrorMessage('a new blog was added')
            })
            .catch(()=>{
                setErrorMessage('an error ocurred while adding the blogg')
            })            
    }


    const toggleImportanceOf = id => {
        const blog = blogs.find(n => n.id === id)
        const changedBlog = { ...blog, important: !blog.important }

        blogService
            .update(id, changedBlog)
            .then(returnedBlog => {
                setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
            })
            .catch(error => {
                setErrorMessage(
                    `Blog '${blog.title}' was already removed from server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setBlogs(blogs.filter(n => n.id !== id))
            })
    }

    const blogsToShow = showAll
        ? blogs
        : blogs.filter(blog => blog.important)


    return (
        <div>
            <h1>Blogs</h1>
            <Notification message={errorMessage} />

            {user === null ?
                <LoginForm
                    username={username}
                    password={password}
                    handleUsernameChange={({ target }) => setUsername(target.value)}
                    handlePasswordChange={({ target }) => setPassword(target.value)}
                    handleSubmit={handleLogin}
                />:
                    <div>
                        <p>{user.name} logged in</p>
                        <Togglable buttonLabel='add blog'>
                            <BlogForm createBlog={addBlog}/>
                        </Togglable>
                        <button onClick={() => {
                            window.localStorage.clear()
                            setUser(null)
                        }}>
                            logout
                        </button>
                    </div>
            }
            <ul>
                {blogsToShow.map(blog =>
                <Blog
                    key={blog.id}
                    blog={blog}
                    toggleImportance={() => toggleImportanceOf(blog.id)}
                />
                )}
            </ul>

            <Footer />
        </div>
    )
}

export default App
