import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select';


import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const Authors = (props) => {

  const [born, setBorn] = useState(0)
  const [currentAuthor, setCurrentAuthor] = useState('')
  const [dropdownOptions, setDropDownOptions] = useState([ {value: '', label: ''}])

  const [ changeYear, result ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS}],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  }) 

  useEffect(() => {
    setDropDownOptions(props.authors.map(a => {
      const newOption = {
        value: a.name,
        label: a.name
      }
      return newOption
    }))
  }, [props.authors])

  if (!props.show) {
    return null
  }

  const submit = (event) => {
    event.preventDefault()
    changeYear({ variables: {name: currentAuthor.value, born}})
    setBorn(0)
  }

  const handleChange = (item) => {
    setCurrentAuthor(item)
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {props.authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>Set birthday</h3>
      <form onSubmit={submit}>
      <Select
        value={currentAuthor}
        onChange={handleChange}
        options={dropdownOptions}
        getOptionValue={(option) => option.value}
      />
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors