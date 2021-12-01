import React, { useState } from 'react'

const Books = (props) => {

  const [filter, setFilter] = useState('all')
  const [favoriteGenre, setFavoriteGenre] = useState('wizard')
  
  if (!props.show) {
    return null
  }
  
  const renderBooksByGenre = () => {
    return (
      props.books.map(a => {
        if (filter === 'favorite' && a.genres.includes(favoriteGenre)) {
          return (
          <tr key={a.title}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
          </tr>
          )
        }
        if (filter === 'all') {
          return (
          <tr key={a.title}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
          </tr>
          )
        }
        if (a.genres.includes(filter)) {
          return (
          <tr key={a.title}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
          </tr>
          )
        }
        return <span></span>
      })
    )
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>In genre {filter}</th>
          </tr>
          {renderBooksByGenre()}
        </tbody>
      </table>
      <div>
        <button onClick={() => setFilter('refactoring')}>refactoring</button>
        <button onClick={() => setFilter('agile')}>agile</button>
        <button onClick={() => setFilter('patterns')}>patterns</button>
        <button onClick={() => setFilter('design')}>design</button>
        <button onClick={() => setFilter('wizard')}>wizard</button>
        <button onClick={() => setFilter('classic')}>classic</button>
        <button onClick={() => setFilter('all')}>all genres</button>
        <button onClick={() => setFilter('favorite')}>favorite</button>
      </div>
    </div>
  )
}

export default Books