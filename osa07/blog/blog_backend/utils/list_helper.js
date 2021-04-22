var _ = require('lodash');


const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let likes = 0
    blogs.map(b => likes = likes + b.likes)
    return likes
}

const favoriteBlog = (blogs) => {

    if (blogs.length === 0) {
        return {}
    } else {
        const blogWithMostLikes = blogs.reduce((prev, current) => {
            return prev.likes > current.likes ? prev : current
        })
    
        delete blogWithMostLikes.__v
        delete blogWithMostLikes.url
        delete blogWithMostLikes._id
        
        return blogWithMostLikes
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 1) {
        return {author: blogs[0].author, blogs: 1}
    }
    const allAuthors = _.countBy(blogs, "author")
    const mostBlogs = Object.keys(allAuthors).reduce((prev, current) => allAuthors[prev] > allAuthors[current] ? {author: prev, blogs: allAuthors[prev]} : {author: current, blogs: allAuthors[current]})

    return mostBlogs
}

const mostLikes = (blogs) => {
    const a = _.groupBy(blogs, 'author')
    let max = 0
    let author = ''

    for (const i in a) {
        let tempLikes = 0
        a[i].map(m => {
            tempLikes = tempLikes + m.likes
        })
        if (tempLikes > max) {
            max = tempLikes
            author = a[i][0].author
        }
    }
    const theMostlikedAuthor = { author: author, likes: max } 
    return theMostlikedAuthor
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}