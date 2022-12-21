const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

const initialUsers = [
    {
        username:'philippe',
        passwordHash:'$2a$10$Aln357RVrO/6aIfHrHYfL.A2ziFax1UmxKC/Z/etbTsCqhe2Sp.ey',
        password:'aalto.fi',
        name:'My name'
    }
]

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
    await User.deleteMany({})
    await User.insertMany(initialUsers)
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

    const loginResult = await api.post('/api/login').send({
        'password':initialUsers[0].password,
        'username':initialUsers[0].username,
        })

    await api
        .post('/api/blogs')
        .set({'Authorization': `Bearer ${loginResult.body.token}`})
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

    const loginResult = await api.post('/api/login').send({
        'password':initialUsers[0].password,
        'username':initialUsers[0].username,
        })

    const createdBlog = await api
        .post('/api/blogs')
        .set({'Authorization': `Bearer ${loginResult.body.token}`})
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const result = await api.get(`/api/blogs/${createdBlog.body.id}`)
    expect(result.body.likes).toBe(0)
})

test('blog cannot be created without creds', async () => {
    const newBlog = {
        title: 'async/await simplifies making async calls',
        author: 'Olli 2',
        url: 'olli2.com'
    }


    const createdBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
})

test('a not-valid blog canno be added ', async () => {
    const noTitleBlog = {
        author: 'uncreatie Olli',
        url: 'olli.com'
    }

    const loginResult = await api.post('/api/login').send({
        'password':initialUsers[0].password,
        'username':initialUsers[0].username,
        })

    await api
        .post('/api/blogs')
        .set({'Authorization': `Bearer ${loginResult.body.token}`})
        .send(noTitleBlog)
        .expect(400)

    const noAuthorBlog = {
        title: 'Author is missing',
        url: 'olli.com'
    }

    await api
        .post('/api/blogs')
        .set({'Authorization': `Bearer ${loginResult.body.token}`})
        .send(noAuthorBlog)
        .expect(400)
})

test('a blog can be deleted', async () => {
    const newBlog = {
        title: 'async/await simplifies making async calls',
        author: 'Olli',
        url: 'olli.com'
    }

    const loginResult = await api.post('/api/login').send({
        'password':initialUsers[0].password,
        'username':initialUsers[0].username,
        })

    const createdBlog = await api
        .post('/api/blogs')
        .set({'Authorization': `Bearer ${loginResult.body.token}`})
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAfterInsert = await helper.blogsInDb()
    expect(blogsAfterInsert).toHaveLength(
        helper.initialBlogs.length + 1
    )

    await api
        .delete(`/api/blogs/${createdBlog.body.id}`)
        .set({'Authorization': `Bearer ${loginResult.body.token}`})
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length
    )

    const titles = blogsAtEnd.map(r => r.titles)

    expect(titles).not.toContain(createdBlog.body.title)
})

test('a blog can be modified', async () => {
    const newBlog = {
        title: 'async/await simplifies making async calls',
        author: 'Olli',
        url: 'olli.com'
    }

    const loginResult = await api.post('/api/login').send({
        'password':initialUsers[0].password,
        'username':initialUsers[0].username,
        })
    const blogsAtStart = await helper.blogsInDb()
    const blogToModify = blogsAtStart[0]

    const createdBlog = await api
        .post('/api/blogs')
        .set({'Authorization': `Bearer ${loginResult.body.token}`})
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)



    const resp = await api
        .put(`/api/blogs/${blogToModify.id}`)
        .set({'Authorization': `Bearer ${loginResult.body.token}`})
        .send({...createdBlog,likes:createdBlog.likes+1})
        .expect(200)

    expect(blogToModify).not.toEqual(resp.body)
})

afterAll(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    mongoose.connection.close()
})
