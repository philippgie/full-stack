import {useState} from 'react'


const Blog = ({blog}) => {
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
            {blog.likes}<br/>
            {blog.user.name}<br/>
        </div>
           
}

export default Blog
