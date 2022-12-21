import {useState} from 'react'


const Blog = ({blog, upvote, deleteBlog, showDelete}) => {
    const [hideDetails, setHideDetails] = useState(true)

    const toggleHideDetails = () => {
        setHideDetails(!hideDetails)
    }

    return     hideDetails?
        <div>
            <button onClick={toggleHideDetails}>view</button>
            {blog.title} {blog.author}
        </div>
        :  
        <div>
            {blog.title} {blog.author}<button onClick={toggleHideDetails}>hide</button><br/>
            {blog.url}<br/>
            {blog.likes}<button onClick={() => upvote(blog)}>upvote</button><br/>
            {blog.user.name}<br/>
            {showDelete?<button onClick={() => {
                if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
                    deleteBlog(blog.id)
                }
            }}>delete</button>:<div/>}
            <br/><br/>
        </div>

}

export default Blog
