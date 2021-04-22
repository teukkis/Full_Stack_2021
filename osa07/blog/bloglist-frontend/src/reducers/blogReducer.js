import blogService from '../services/blogs'


const sortBlogs = (blogs) => {
  const sortedByLikes = blogs.sort(function(a, b){
    return a.likes-b.likes
  })
  return sortedByLikes.reverse()
}

const blogReducer = (state = null, action) => {

  switch(action.type) {
    case 'INIT_BLOGS':
      return sortBlogs(action.payload)

    case 'REMOVE_BLOG':
      return state.filter(b => b.id !== action.payload)

    case 'LIKE_BLOG':
      const blogs = state.map(b => b.id === action.payload ? {...b, likes: b.likes + 1} : b) 
      return sortBlogs(blogs)

    case 'ADD_COMMENT':
      return state.map(b => b.id === action.payload.id ? {...b, comments: b.comments.concat(action.payload.data)} : b) 

    default:
      return state
    }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      payload: blogs
    })
  }
}

export const removeBlog = (blogId) => {
  return async dispatch => {
    await blogService.removeBlog(blogId)
    dispatch({
      type: 'REMOVE_BLOG',
      payload: blogId
    })
  }
}

export const likeBlog = (blogId, data) => {
  return async dispatch => {
    await blogService.addOneLike(blogId, data)
    dispatch({
      type: 'LIKE_BLOG',
      payload: blogId
    })
  }
}

export const addComment = (blogId, data) => {
  return async dispatch => {
    await blogService.addComment(blogId, data)
    dispatch({
      type: 'ADD_COMMENT',
      payload: {id: blogId, data }
    })
  }
}

export default blogReducer