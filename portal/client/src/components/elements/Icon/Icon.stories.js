import React from 'react'
import Icon from './index'
import Section from '../../layout/Section'
import Button from '../Button'
import ButtonGroup from '../ButtonGroup'

export default {
  title: 'Design System/Icon',
  component: Icon,
}

export const Simple = () => {
  return (<Section>
    <Icon iConClass={'fa-home'}/>
    <Icon iConClass={'fa-exclamation-triangle'} size={'large'} hasBorder color={'warning'}/>
  </Section>)
}

export const Size = () => {
  return (<Section>
    <IconContainer><Icon iConClass={'fa-exclamation-triangle'} size={'small'} color={'warning'}/></IconContainer>
    <IconContainer><Icon iConClass={'fa-exclamation-triangle'} color={'warning'}/></IconContainer>
    <IconContainer><Icon iConClass={'fa-exclamation-triangle'} size={'medium'} sizeBooster='2x' color={'warning'}/></IconContainer>
    <IconContainer><Icon iConClass={'fa-exclamation-triangle'} size={'large'} sizeBooster='3x' color={'warning'}/></IconContainer>
  </Section>)
}

export const Color = () => {
  return (<Section>
      <Icon iConClass="fa-info-circle" color={'info'}/>
    <Icon iConClass="fa-check-square" color={'success'}/>
    <Icon iConClass="fa-exclamation-triangle" color={'warning'}/>
    <Icon iConClass="fa-ban" color={'danger'}/>
  </Section>)
}

export const UsageInOtherComponents = () => {
  return (<Section>
    <ButtonGroup>
      <Button onClick={()=>null} type={'type'} isPrimary isOutlined>
        <Icon iConClass="fa-info-circle" color={'info'}/> <span>Info</span>
      </Button>
      <Button onClick={()=>null} type={'type'} isOutlined>
        <Icon iConClass="fa-check-square" color={'success'}/> <span>Success</span>
      </Button>
      <Button onClick={()=>null} type={'type'} isOutlined>
        <Icon iConClass="fa-exclamation-triangle" color={'warning'}/> <span>Warning</span>
      </Button>
      <Button onClick={()=>null} type={'type'} isOutlined>
        <Icon iConClass="fa-ban" color={'danger'}/> <span>Danger</span>
      </Button>
    </ButtonGroup>
  </Section>)
}


const IconContainer = ({children}) => {
  return (
    <span style={{padding: '10px'}}>
      {children}
    </span>
  )
}
