require('dotenv').config()
const { ApolloServer, UserInputError, AuthenticationError, gql } = require("apollo-server")
const { v1: uuid } = require('uuid')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const book = require('./models/book')



const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }
  
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]
    ):Book
    editAuthor(
      name: String!,
      setBornTo: Int!
    ):Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const resolvers = {
  Query: {
    bookCount: async () => {
      return await Book.collection.countDocuments()
    },
    authorCount: async () => {
      return await Author.collection.countDocuments()
    },
    allBooks: async (root, args) => {
      if (!(args.author && args.genre)) {
        const foundBooks = await Book.find({}).populate('author')
        return foundBooks
      }
      if (args.author && !args.genre) {
        const author = await Author.findOne({ name: args.author })
        return await Book.find({ author: { $in: [author.id] } }).populate('author')
      }
      if (!args.author && args.genre) {
        return await Book.find({ genres: { $in: [args.genre] } }).populate('author')
      }
      const author = await Author.findOne({ name: args.author })
      const booksByAuthor = await Book.find({ author: { $in: [author.id] } }).populate('author')
      const booksByGenre = await Book.find({ genres: { $in: [args.genre] } }).populate('author')
      return booksByAuthor || booksByGenre
    },
    allAuthors: async () => await Author.find({}).populate('books'),
    me: (root, args, context) => {
      console.log(context.currentUser)
      return context.currentUser
    }
  },

  Book: {
    title: (root) => root.title,
    published: (root) => root.published,
    author: (root) => root.author,
    genres: (root) => root.genres,
    id: (root) => root.id
  },

  Author: {
    bookCount: async (root) => {
      return await Book.find({ author: { $in: root.id } }).countDocuments()
    },
  },

  User: {
    username: (root) => root.username,
    favoriteGenre: (root) => root.favoriteGenre
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      console.log(currentUser, "uuuu")
      if (!currentUser) {
        throw new AuthenticationError('Unauthorized')
      }

      let foundAuthor = await Author.findOne({ name: args.author })
      console.log(foundAuthor, "ffffff")

      if (!foundAuthor) {
        foundAuthor = new Author({name: args.author, bookCount: 1})
        try {
          await foundAuthor.save()
  
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
      }

      const newBook = new Book({ ...args, author: foundAuthor._id})
      try {
        await newBook.save()
      }
      catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: newBook})

      return newBook.populate('author').execPopulate()
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('Unauthorized')
      }
      const editedAuthor = await Author.findOneAndUpdate({name: args.name}, {born: args.setBornTo}, {new: true})

      if (editedAuthor) {
        return editedAuthor
      }
      return null
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, 'HERE_IS_A_SECRET') }
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer')) {
      const decodedToken = jwt.verify(
        auth.substring(7), 'HERE_IS_A_SECRET'
      )
        console.log(decodedToken)
      const currentUser = await User.findById(decodedToken.id)
      return {currentUser}
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})