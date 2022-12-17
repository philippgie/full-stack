const Blog = require('../models/blog')
const User = require('../models/user')

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

const initialUsers = [
    {
        username: 'Philippe',
        name: 'first user',
        password: 'google.com'
    },
    {
        username: 'Peter',
        name: 'Peter\'s user',
        password: 'bing.com'
    },
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

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, initialUsers, nonExistingId, blogsInDb, usersInDb
}
