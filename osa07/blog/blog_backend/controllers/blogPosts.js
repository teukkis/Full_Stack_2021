const blogRouter = require('express').Router()
const Blog = require('../models/blogPost')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
    return response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const body = request.body
    const currentUser = request.user
    const user = await User.findById(currentUser.id)
    
    if (body.url === undefined || body.title === undefined) {
        return response.status(400).end()
    }
    body.user = user.id
    const blog = new Blog(body)
    const result = await blog.save()

    user.blogs = user.blogs.concat(result.id)
    await user.save()

    return response.status(201).json(result)
})

blogRouter.put('/:id/comments', async (request, response) => {
    const body = request.body
    const id = request.params.id
    await Blog.findByIdAndUpdate(id,  { $addToSet: { comments: body.comment } })
    return response.status(201).end()
})

blogRouter.delete('/:id', async (request, response) => {
    const currentUser = request.user
    const blogToBeRemoved = await Blog.findById(request.params.id).populate('user', {username: 1, name: 1, id: 1})
    
    if (currentUser.id === blogToBeRemoved.user.id) {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    }
    else {
        response.status(401).json({error: "This blog is created by someone else"})
    }
})

blogRouter.put('/:id', async (request, response, next) => {
    const body = request.body
    console.log(body)
    const modifiedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
    return response.status(204).end()
})
  
module.exports = blogRouter