const jwt = require('jsonwebtoken')

const userExtractor = (request, response, next) => {
  if (!request.token) {
    return response.status(401).json({ error: 'token missing' })
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
  }
  else {
      request.user = decodedToken
  }
  next()
}


module.exports = userExtractor

