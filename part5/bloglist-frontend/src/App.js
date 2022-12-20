import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

import Notification from './components/Notification'
import Footer from './components/Footer'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [newURL, setNewURL] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newTitle, setNewTitle] = useState('')
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
            console.log(exception)
            setErrorMessage('wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const addBlog = (event) => {
        event.preventDefault()
        const blogObject = {
            author : newAuthor,
            title: newTitle,
            url : newURL
        }
        console.log(blogObject)

        blogService
            .create(blogObject)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                setNewURL('')
                setNewAuthor('')
                setNewTitle('')
                setErrorMessage('a new blog was added')
            }).
            catch(()=>{
                setErrorMessage('an error ocurred while adding the blogg')
            })            
    }

    const handleURLChange = (event) => {
        setNewURL(event.target.value)
    }
    const handleAuthorChange = (event) => {
        setNewAuthor(event.target.value)
    }
    const handleTitleChange = (event) => {
        setNewTitle(event.target.value)
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

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    )

    const blogForm = () => (
        <form onSubmit={addBlog}>
            Title
            <input
                value={newTitle}
                onChange={handleTitleChange}
            /><br/>
            URL
            <input
                value={newURL}
                onChange={handleURLChange}
            /><br/>
            Author
            <input
                value={newAuthor}
                onChange={handleAuthorChange}
            />
            <button type="submit">save</button>
        </form>
    )

    return (
        <div>
            <h1>Blogs</h1>
            <Notification message={errorMessage} />

            {user === null ?
                    loginForm() :
                    <div>
                        <p>{user.name} logged in</p>
                        {blogForm()}
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
