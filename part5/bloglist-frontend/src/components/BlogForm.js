import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [newAuthor, setNewAuthor] = useState('')
    const [newTitle, setNewTitle] = useState('')
    const [newURL, setNewURL] = useState('')

    const handleAuthorChange = (event) => {
        setNewAuthor(event.target.value)
    }
    const handleURLChange = (event) => {
        setNewURL(event.target.value)
    }
    const handleTitleChange = (event) => {
        setNewTitle(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title:newTitle,
            author:newAuthor,
            url:newURL
        })

        setNewAuthor('')
        setNewTitle('')
        setNewURL('')
    }







    return (
        <form onSubmit={addBlog}>
            Title
            <input
                value={newTitle}
                onChange={handleTitleChange}
                placeholder='title'
                id='title'
            /><br/>
            URL
            <input
                value={newURL}
                onChange={handleURLChange}
                placeholder='url'
                id='url'
            /><br/>
            Author
            <input
                value={newAuthor}
                onChange={handleAuthorChange}
                placeholder='author'
                id='author'
            />
            <button type="submit">save</button>
        </form>
    )

}

export default BlogForm
