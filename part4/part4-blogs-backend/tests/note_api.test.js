const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
    {
        author: 'Philippe',
        title: 'first blog',
        url: 'google.com'
    },
    {
        author: 'Peter',
        title: 'Peter\'s blog',
        url: 'bing.com'
    },
]

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
})

test('a blog is about the first blog post', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)
    expect(titles).toContain(
        'first blog'
    )
})

test('identifier property is named id', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    expect(blog.id).toBeDefined()
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'Olli',
    url: 'olli.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(n => n.title)
  expect(titles).toContain(
    'async/await simplifies making async calls'
  )
})

test('likes are defaulted to zero', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'Olli 2',
    url: 'olli2.com'
  }

  const createdBlog = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const result = await api.get(`/api/blogs/${createdBlog.body.id}`)
  expect(result.body.likes).toBe(0)
})

afterAll(() => {
    mongoose.connection.close()
})
