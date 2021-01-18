import React from 'react'
import { render } from '@testing-library/react'
import Card from '../index'

test('renders card with header', () => {
  const { container } = render(
    <Card CardTitle={() => <span>Test title</span>}>
      <p>Test content</p>
    </Card>,
  )
  const titleElement = container.querySelector('.card-header-title').firstChild;
  const contentElement = container.querySelector('.card-content').firstChild;
  expect(titleElement).toHaveTextContent('Test title')
  expect(contentElement).toHaveTextContent('Test content')
})

test('renders card with footer', () => {
  const FooterButtons =
    <>
      <a href="/#">Save</a>
      <a href="/#">Edit</a>
      <a href="/#">Delete</a>
    </>

  const { getByText, container } = render(
    <Card
      CardTitle={() => <span> Test title</span>}
      Footer={() => (
        FooterButtons
      )}
    >
      <p>Test content</p>
    </Card>,
  )
  const titleElement = container.querySelector('.card-header-title').firstChild;
  const contentElement = container.querySelector('.card-content').firstChild;
  expect(titleElement).toHaveTextContent('Test title')
  expect(contentElement).toHaveTextContent('Test content')
  expect(getByText('Save')).toBeTruthy()
  expect(getByText('Edit')).toBeTruthy()
  expect(getByText('Delete')).toBeTruthy()
})

test('renders card with content only', () => {

  const { container } = render(
    <Card
      CardTitle={() => <span> Test title</span>}
      contentOnly
    >
      <p>Test content</p>
    </Card>,
  )

  const contentElement = container.querySelector('.card-content').firstChild;
  expect(container.firstChild).not.toHaveClass('.card-header-title');
  expect(contentElement).toHaveTextContent('Test content')
  expect(container.lastChild).not.toHaveClass('.card-footer')

})
