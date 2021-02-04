import React from 'react'
import { render } from '@testing-library/react'
import Button from '../../Button'
import ButtonGroup from '../index'

test('Renders list of buttons in Button group', () => {
  const { container } = render(
    <ButtonGroup>
      <Button type='button' onClick={() => null} isPrimary>
        <span>Primary</span>
      </Button>
      <Button type='button' onClick={() => null} isSecondary>
        <span>Secondary</span>
      </Button>
      <Button type='button' onClick={() => null}>
        <span>Static</span>
      </Button>
    </ButtonGroup>)

  const buttonGroup = container.firstChild
  expect(buttonGroup).not.toHaveClass('.has-addons')
  expect(buttonGroup).not.toHaveClass('.is-centered')
  expect(buttonGroup).not.toHaveClass('.is-right')
  expect(buttonGroup.childNodes.length).toBe(3)

})

test('Renders attach buttons in Button group', () => {
  const { container } = render(
    <ButtonGroup hasAddons>
      <Button type='button' onClick={() => null} isPrimary>
        <span>Primary</span>
      </Button>
      <Button type='button' onClick={() => null}>
        <span>Secondary</span>
      </Button>
    </ButtonGroup>
  )
  const buttonGroup = container.firstChild
  expect(buttonGroup).toHaveClass('buttons has-addons')
  expect(buttonGroup.childNodes.length).toBe(2)
})
