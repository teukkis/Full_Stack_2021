import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('render a preview of a blog', () => {
  const blog = {
    title: 'Title for the test',
    author: 'teukka',
    url: 'www.teukka.com',
    likes: 34
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent('Title for the test')
  expect(component.container).toHaveTextContent('teukka')
  expect(component.container).not.toHaveTextContent('www.teukka.com')
  expect(component.container).not.toHaveTextContent(34)
})

test('renders all fields of a blog', () => {
  const blog = {
    title: 'Title for the test',
    author: 'teukka',
    url: 'www.teukka.com',
    likes: 34
  }

  const component = render(
    <Blog blog={blog} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('Title for the test')
  expect(component.container).toHaveTextContent('teukka')
  expect(component.container).toHaveTextContent('www.teukka.com')
  expect(component.container).toHaveTextContent(34)
})

test('calls the function two times', () => {
  const blog = {
    title: 'Title for the test',
    author: 'teukka',
    url: 'www.teukka.com',
    likes: 34
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} testLikeBtn={mockHandler}/>
  )

  // Open the full view
  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  // click a like button two times
  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
