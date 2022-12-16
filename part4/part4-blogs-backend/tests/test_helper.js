const Blog = require('../models/blog')

const initialBlogs = [
  {
      author: 'philippe',
      title: 'first blog',
      url: 'huawei.com'
  },
  {
      author: 'peter',
      title: 'another blog',
      url: 'bing.com'
  }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon', author: 'obama', url:'whitehouse.gov' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}
