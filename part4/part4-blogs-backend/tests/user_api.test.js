const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
})

test('users are returned as json', async () => {
    await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are two users', async () => {
    const response = await api.get('/api/users')

    expect(response.body).toHaveLength(helper.initialUsers.length)
})

//test('a user is about the first user post', async () => {
//    const response = await api.get('/api/users')
//
//    const titles = response.body.map(r => r.title)
//    expect(titles).toContain(
//        'first user'
//    )
//})

test('identifier property is named id', async () => {
    const response = await api.get('/api/users')
    const user = response.body[0]
    expect(user.id).toBeDefined()
})

test('a valid user can be added ', async () => {
    const newUser = {
        name: 'async/await simplifies making async calls',
        username: 'Olli',
        password: 'olli.com'
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1)

    const names = usersAtEnd.map(n => n.name)
    expect(names).toContain(
        'async/await simplifies making async calls'
    )
})

//test('likes are defaulted to zero', async () => {
//    const newUser = {
//        title: 'async/await simplifies making async calls',
//        author: 'Olli 2',
//        url: 'olli2.com'
//    }
//
//    const createdUser = await api
//        .post('/api/users')
//        .send(newUser)
//        .expect(201)
//        .expect('Content-Type', /application\/json/)
//
//    const result = await api.get(`/api/users/${createdUser.body.id}`)
//    expect(result.body.likes).toBe(0)
//})

test('a not-valid user canno be added ', async () => {
    const tooShortUsername = {
        username: 'Yi',
        name:'yi ya',
        password: 'olli.com'
    }

    await api
        .post('/api/users')
        .send(tooShortUsername)
        .expect(400)

    const tooShortPassword = {
        username: 'Yiya',
        name:'yi ya',
        password: 'xz'
    }

    await api
        .post('/api/users')
        .send(tooShortPassword)
        .expect(400)

    const repeatedUsername = {
        username: 'Philippe',
        name:'yi ya',
        password: 'xz'
    }

    await api
        .post('/api/users')
        .send(repeatedUsername)
        .expect(400)
})

//test('a user can be deleted', async () => {
//    const usersAtStart = await helper.usersInDb()
//    const userToDelete = usersAtStart[0]
//
//    await api
//        .delete(`/api/users/${userToDelete.id}`)
//        .expect(204)
//
//    const usersAtEnd = await helper.usersInDb()
//
//    expect(usersAtEnd).toHaveLength(
//        helper.initialUsers.length - 1
//    )
//
//    const titles = usersAtEnd.map(r => r.titles)
//
//    expect(titles).not.toContain(userToDelete.title)
//})
//
//test('a user can be modified', async () => {
//    const usersAtStart = await helper.usersInDb()
//    const userToModify = usersAtStart[0]
//
//    const resp = await api
//        .put(`/api/users/${userToModify.id}`)
//        .send({...userToModify,likes:userToModify.likes+1})
//        .expect(200)
//
//    expect(userToModify).not.toEqual(resp.body)
//})

afterAll(() => {
    mongoose.connection.close()
})
