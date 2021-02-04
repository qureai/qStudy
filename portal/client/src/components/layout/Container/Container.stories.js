import React from 'react'
import Container from './index'
import Box from '../../elements/Box'

export default {
  title: 'Layout/Container',
  component: Container,
}

export const Basic = () => {
  return (<Container>
    <Box><h2>Simple container which align everything to center</h2></Box>
  </Container>)
}


export const Fluid = () => {
  return (<Container isFluid>
    <Box><h2>Fluid container which align everything to center with less margin space than basic one</h2></Box>
  </Container>)
}
