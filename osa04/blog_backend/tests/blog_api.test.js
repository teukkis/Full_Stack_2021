const { before } = require('lodash')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogPost')
const blogs = require('./blogs_for_tests')
const api = supertest(app)


beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(blogs)
})

describe('Blog API', () => {
    test('blogs are returned as json', async () => {
        await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)
    })
    
    test('right number of blogs', async () => {
        const response = await api
        .get('/api/blogs')
        .expect('Content-Type', /application\/json/)

        expect(response.body.length).toBe(6)
    })

    test('the ID field is id, instead of _id', async () => {
        const response = await api
        .get('/api/blogs')

        const blogs = response.body
        blogs.map(b => {
            expect(b._id).toBeUndefined()
            expect(b.id).toBeDefined()
            return
        })
    })

    test('The number of blogs is correct after adding one blog', async () => {
        
        // BEFORE
        const beforeResponse = await api
        .get('/api/blogs')

        const numberOfBlogsBefore = beforeResponse.body.length 
        expect(numberOfBlogsBefore).toBe(6)

        // ADD A BLOG

        const newBlogToBeAdded = {
            title: "SHit happens",
            author: "boys of summer",
            url: "http://pfff.cmm",
            likes: 50
          }

        await api
        .post('/api/blogs')
        .send(newBlogToBeAdded)
        .expect(201)
        
        // AFTER
        const afterResponse = await api
        .get('/api/blogs')

        const numberOfBlogsAfter = afterResponse.body.length 
        expect(numberOfBlogsAfter).toBe(numberOfBlogsBefore + 1)
    })

    test('Default value of likes is zero (0)', async () => {
        const newBlogToBeAdded = {
            title: "SHit happens2",
            author: "boys of THE summer",
            url: "http://pfff.cmm"
          }

        await api
        .post('/api/blogs')
        .send(newBlogToBeAdded)
        .expect(201)

        const response = await api
        .get('/api/blogs')
        
        const theLatestBlog = response.body.filter(b => b.title === newBlogToBeAdded.title)
        expect(theLatestBlog[0].likes).toBe(0)
    })

    test('Must contain fields url and title', async () => {
        const newBlogToBeAdded = {
            author: "where is a title",
            url: "http://pfff.cmm"
          }

        await api
        .post('/api/blogs')
        .send(newBlogToBeAdded)
        .expect(400)

        const newBlogToBeAdded2 = {
            title: "where is URL",
            author: "where is a title",
          }

        await api
        .post('/api/blogs')
        .send(newBlogToBeAdded2)
        .expect(400)
    })


})

afterAll(() => {
mongoose.connection.close()
})