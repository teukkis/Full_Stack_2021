const listHelper = require('../utils/list_helper')
const blogs = require('./blogs_for_tests')


test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})


describe('total likes', () => {
    test('multiple blogs', () => {
      const result = listHelper.totalLikes(blogs)
      expect(result).toBe(36)
    })

    test('one blog, when there are likes', () => {
        const result = listHelper.totalLikes([blogs[0]])
        expect(result).toBe(7)
    })

    test('one blog, when there are not any likes', () => {
        const result = listHelper.totalLikes([blogs[4]])
        expect(result).toBe(0)
    })
  })

describe('favorite blog', () => {
    test('the right number of likes', () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result.likes).toBe(12)
    })

    test('the right blog title', () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result.title).toEqual('Canonical string reduction')
    })

    test('With an empty array', () => {
        const result = listHelper.favoriteBlog([])
        expect(result).toEqual({})
    })

    test('With two same blogs', () => {
        const result = listHelper.favoriteBlog([blogs[3], blogs[3]])
        expect(result.likes).toEqual(10)
    })
})

describe('Author with the most blogs', () => {
    test('original blog list', () => {
        const result = listHelper.mostBlogs(blogs)
        expect(result.blogs).toBe(3)
        expect(result.author).toEqual('Robert C. Martin')
    })

    test('one blog, Canonical string reduction', () => {
        const result = listHelper.mostBlogs([blogs[2]])
        expect(result.blogs).toBe(1)
        expect(result.author).toEqual('Edsger W. Dijkstra')
    })
})

describe('Author with the most likes', () => {
    test('original blog list', () => {
        const result = listHelper.mostLikes(blogs)
        expect(result.likes).toBe(17)
        expect(result.author).toEqual('Edsger W. Dijkstra')
    })

    test('one blog, Canonical string reduction', () => {
        const result = listHelper.mostLikes([blogs[2]])
        expect(result.likes).toBe(12)
        expect(result.author).toEqual('Edsger W. Dijkstra')
    })
})