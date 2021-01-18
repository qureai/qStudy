import React from 'react'
import Level from './index'
import Container from '../Container'
import Box from '../../elements/Box'
import Notification from '../../elements/Notification'

export default {
  title: 'Layout/Level',
  component: Level,
}

export const Sample = () => (
  <Container>
    <Level>
      <Level.Left>
        <Level.Item>
          <p className="subtitle is-5">
            <strong>123</strong> posts
          </p>
        </Level.Item>
        <Level.Item>
          <p className="subtitle is-5">
            <strong>12</strong> videos
          </p>
        </Level.Item>
      </Level.Left>
      <Level.Right>
        <Level.Item>
          <strong>All</strong>
        </Level.Item>
        <Level.Item>
          <a>Published</a>
        </Level.Item>
        <Level.Item>
          <a>Drafts</a>
        </Level.Item>
        <Level.Item>
          <a>Deleted</a>
        </Level.Item>
      </Level.Right>
    </Level>
  </Container>)
