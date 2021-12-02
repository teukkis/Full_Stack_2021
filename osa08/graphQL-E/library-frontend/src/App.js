import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, useSubscription, useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries'


const App = () => {
  const [page, setPage] = useState('authors')
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)

  const [user, setUser] = useState(null)

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      window.alert('kirja!')
    }
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('currentUser')
    if (loggedUserJSON) {
      setUser(loggedUserJSON)
    }
  }, [])

  if (authors.loading || books.loading ) {
    return <div>loading...</div>
  }

  const renderProtected = () => {
    return (
      <button onClick={() => setPage('add')}>add book</button>
    )
  }

  const logout = () => {
    localStorage.removeItem('currentUser')
    setUser(null)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { user !== null ? renderProtected() : <span></span> }
        { user !== null ? <button onClick={logout}>logout</button> : <button onClick={() => setPage('login')}>Login</button> }
        
      </div>

      <Authors
        show={page === 'authors'}
        authors={authors.data.allAuthors}
      />

      <Books
        show={page === 'books'}
        books={books.data?.allBooks}
      />

      <NewBook
        show={page === 'add'}
      />

    {user === null ? <Login show={page === 'login'} setPage={setPage} setUser={setUser}/> : <div></div>}
      
    </div>
  )
}

export default App