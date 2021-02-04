import React from 'react'
import { render } from '@testing-library/react'
import Button from '../index'


const colors = [
  {
    label:'isPrimary',
    classNames:'is-primary is-normal'},
  {
    label:'isLight',
    classNames:'is-light is-normal'},
  {
    label:'isSecondary',
    classNames:'is-primary is-normal is-outlined'},
  {
    label:'isTest',
    classNames:'is-normal'},
  {
  label:'isLink',
  classNames:'is-link is-normal'
  }
]
const sizes = ['small','medium','large']
const states = [
{ label:'isDisabled',
  classNames:'is-normal'
},
{
  label:'isLoading',
  classNames:'is-loading is-normal'
},
{
  label:'isStatic',
  classNames:'is-static is-normal'
}
 ]


test('Renders button', () => {
  const { container } = render(
    <Button type="primary" onClick={() => null} >Test button</Button>,
  )

  const button = container.querySelector('button')
  expect(button.innerHTML).toBe('Test button')
})

test('Renders button of size', () => {
  const { container } = render(
    sizes.map(size=>{
    return (<Button type='button' onClick={() => null} key={size} size={size}>
      <span>{size} size</span>
    </Button>)})
  )
  sizes.map((size)=>expect(container.getElementsByClassName(`button is-${size}`).length).toBe(1))
})

test('Renders button of colors', () => {
  /* eslint-disable */
  const { getByText} = render(
    colors.map(color=>{
      const booleanProps = {}
      booleanProps[color.label] = true;
      return (
        <Button  type="primary" onClick={() => null} key={color.label} {...booleanProps}>{color.label}</Button>
      )
    })
   
  )
  /* eslint-enable */
  colors.map((color)=>expect(getByText(color.label)).toHaveClass(color.classNames))
})

test('Renders button of states', () => {
  /* eslint-disable */
  const {  getByText } = render(
    states.map(state=>{
    const booleanProps = {}
    booleanProps[state.label] = true;
    return (<Button type='button' onClick={() => null} key={state.label} {...booleanProps}>
      <span>{state.label}</span>
    </Button>)})
  )
  /* eslint-enable */
  states.map((state)=> expect(getByText(state.label).closest('button')).toHaveClass(state.classNames))
})
 