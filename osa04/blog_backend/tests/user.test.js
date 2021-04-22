const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)

const shortUsername = {
    username: "j",
    name: "samajeppe",
    password: "pw1234"
}

const noUsername = {
    name: "samajeppe",
    password: "pw1234"
}

const shortPassword = {
    username: "jeppe",
    name: "samajeppe",
    password: "pw"
}

const noPassword = {
    username: "jeppe",
    name: "samajeppe"
}

beforeEach(async () => {
    await User.deleteMany({})
})

describe('User API', () => {
    test('too short username', async () => {
        const response = await api
        .post('/api/users')
        .send(shortUsername)
        .expect(400)
        
        expect(response.body.message).toEqual("username has to be at least 3 characters")
    })

    test('username does not exist', async () => {
        const response = await api
        .post('/api/users')
        .send(noUsername)
        .expect(400)

        expect(response.body.message).toEqual("username does not exist")
    })

    test('too short password', async () => {
        const response = await api
        .post('/api/users')
        .send(shortPassword)
        .expect(400)

        expect(response.body.message).toEqual("password has to be at least 3 characters")
    })

    test('password does not exist', async () => {
        const response = await api
        .post('/api/users')
        .send(noPassword)
        .expect(400)

        expect(response.body.message).toEqual("password does not exist")
    })
})

afterAll(() => {
    mongoose.connection.close()
})