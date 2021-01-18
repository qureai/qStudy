import React from 'react'
import Section from '../../layout/Section'
import Button from '../Button'
import ButtonGroup from './index'

export default {
  title: 'Design System/ButtonGroup',
  component: ButtonGroup,
}

export const ListOfButtons = () => {
  return (
    <>
      <Section>
        <h2 className='title'>List of buttons</h2>
        <ButtonGroup>
          <Button type={'button'} onClick={() => null} isPrimary>
            <span>Primary</span>
          </Button>
          <Button type={'button'} onClick={() => null} isSecondary>
            <span>Secondary</span>
          </Button>
          <Button type={'button'} onClick={() => null}>
            <span>Static</span>
          </Button>
        </ButtonGroup>
      </Section>
    </>
  )
}

export const AttachButtons = ()=>{
  return (
    <Section>
      <h2 className='title'>Attach buttons together</h2>
      <ButtonGroup hasAddons>
        <Button type={'button'} onClick={() => null} isPrimary>
          <span>Primary</span>
        </Button>
        <Button type={'button'} onClick={() => null}>
          <span>Secondary</span>
        </Button>
      </ButtonGroup>
    </Section>
  )
}
