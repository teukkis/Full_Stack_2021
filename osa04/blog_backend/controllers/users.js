const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1, id: 1})
    response.json(users.map(u => u.toJSON()))
})

userRouter.post('/', async (request, response) => {
    const body = request.body

    if (!body.password) {
        return response.status(400).send({error: "ValidationError", message: "password does not exist"})
    }
    if (body.password.length < 3) {
        return response.status(400).send({error: "ValidationError", message: "password has to be at least 3 characters"})
    }
    if (!body.username) {
        return response.status(400).send({error: "ValidationError", message: "username does not exist"})
    }
    if (body.username.length < 3) {
        return response.status(400).send({error: "ValidationError", message: "username has to be at least 3 characters"})
    }

    else {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)
      
        const user = new User({
          username: body.username,
          name: body.name,
          passwordHash,
        })
      
        const savedUser = await user.save()
      
        response.json(savedUser)
    }
    
})

  
module.exports = userRouter
