import React from 'react'
import Button from './index'
import Section from '../../layout/Section'
import ButtonGroup from '../ButtonGroup'

export default {
  title: 'Design System/Button',
  component: Button,
}

export const Colors = () => (
  <Section>
    <ButtonGroup>
      <Button type={'button'} onClick={() => null} isPrimary>
        <span>Primary button</span>
      </Button>
      <Button type={'button'} onClick={() => null} isPrimary isLight>
        <span>Primary Light button</span>
      </Button>
      <Button type={'button'} onClick={() => null} isSecondary>
        <span>Secondary button</span>
      </Button>
      <Button type={'button'} onClick={() => null} isText>
        <span>Text button</span>
      </Button>
      <Button type={'button'} onClick={() => null} isLink>
        <span>Link button</span>
      </Button>
    </ButtonGroup>
  </Section>
)

export const Sizes = () => {
  return (
    <>
      <Section>
        <ButtonGroup>
          <Button type={'button'} onClick={() => null} size='small'>
            <span>Small size</span>
          </Button>
          <Button type={'button'} onClick={() => null}>
            <span>Default size</span>
          </Button>
          <Button type={'button'} onClick={() => null} size='medium'>
            <span>Medium size</span>
          </Button>
          <Button type={'button'} onClick={() => null} size='large'>
            <span>Large size</span>
          </Button>
        </ButtonGroup>
      </Section>
    </>
  )
}


export const States = () => {
  return (
    <>
      <Section>
        <ButtonGroup>
          <Button type={'button'} onClick={() => null} isDisabled>
            <span>Disabled</span>
          </Button>
          <Button type={'button'} onClick={() => null} isLoading isPrimary>
            <span>Loading</span>
          </Button>
          <Button type={'button'} onClick={() => null} isStatic>
            <span>Static</span>
          </Button>
        </ButtonGroup>
      </Section>
    </>
  )
}
