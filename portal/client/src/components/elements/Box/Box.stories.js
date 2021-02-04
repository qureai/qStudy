import React from 'react'
import Box from './index'
import Section from '../../layout/Section'

export default {
  title: 'Design System/Box',
  component: Box,
}

export const Basic = () => {

  return (<Section>
    <Box>
      <div className="content">

        <p>
          <div className='title'>Box title</div>
          <div className="subtitle">Box subtitle</div>
          It Can have any contents inside this box </p>
      </div>
    </Box>
    <Box>
      <div className="content">
        <p> <strong>John smith</strong> <small>@11:30am</small>
          <br/>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam aliquid atque commodi dolor harum id in incidunt ipsam laborum modi nisi nostrum optio perspiciatis, quisquam repudiandae voluptates. Dignissimos, vitae?
        </p>
      </div>
    </Box>
  </Section>)
}

