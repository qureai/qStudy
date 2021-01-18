import React from 'react'
import Hero from './index'

export default {
  title: 'Layout/Hero',
  component: Hero,
}

export const AutoWidth = () => (<Hero>
  <div className="content">
    <div className='title'>Heading for the Hero</div>
    <div className='subtitle'>Subheading for Hero</div>
  </div>
</Hero>)

export const FullWidth = () => (<Hero isFullWidth>
  <div className="content">
    <div className='title'> Heading for the section </div>
    <div className='subtitle'>Subheading for section </div>
  </div>
</Hero>)
