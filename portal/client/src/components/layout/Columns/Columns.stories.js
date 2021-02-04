import React from 'react'
import Columns from './index'
import Container from '../Container'
import Notification from '../../elements/Notification'
import Content from '../../elements/Content'

export default {
  title: 'Layout/Grid System',
  component: Columns,
}

export const Basic = () => {
  return (
    <Container>
      <Columns>
        <Columns.Column size={'6'}>
          <Notification>size 6</Notification>
        </Columns.Column>
        <Columns.Column>
          <Notification>size 3</Notification>
        </Columns.Column>
        <Columns.Column>
          <Notification>size 3</Notification>
        </Columns.Column>
      </Columns>
      <Columns>
        <Columns.Column size={'4'}>
          <Notification>size 4</Notification>
        </Columns.Column>
        <Columns.Column>
          <Notification>size 4</Notification>
        </Columns.Column>
        <Columns.Column>
          <Notification>size 4</Notification>
        </Columns.Column>
      </Columns>
      <Columns>
        <Columns.Column size='2'>
          <Notification><span className='small'> size 2</span></Notification>
        </Columns.Column>
        <Columns.Column>
          <Notification>size 10</Notification>
        </Columns.Column>
      </Columns>
    </Container>)
}


export const Offset = () => {
  return (
    <Container>
      <Columns>
        <Columns.Column size='4' offset='1'>
          <Notification>offset-1 / size 4</Notification>
        </Columns.Column>
        <Columns.Column>
          <Notification>size 7</Notification>
        </Columns.Column>
      </Columns>
      <Columns>
        <Columns.Column size={'4'} offset={'2'}>
          <Notification>offset-2 / size 4</Notification>
        </Columns.Column>
        <Columns.Column>
          <Notification>size 6</Notification>
        </Columns.Column>
      </Columns>
    </Container>)
}

export const NarrowColumn = () => {
  return (
    <Container>
      <Columns>
        <Columns.Column isNarrow>
          <div style={{ width: '250px' }}>
            <Notification>
              <Content>
                <h2>Narrow columns</h2>
                <p>Takes only 250px width </p>
              </Content>
            </Notification>
          </div>
        </Columns.Column>
        <Columns.Column>
          <Notification>
            <Content>
              <h2>Flexible column</h2>
              <p>Takes remaining space </p>
            </Content>
          </Notification>
        </Columns.Column>
      </Columns>
    </Container>)
}


export const GaplessColumn = () => {
  return (
    <Container>
      <Columns>
        <Columns.Column>
          <Notification>
            <Content>
              <h2>Default Gap column -1</h2>
            </Content>
          </Notification>
        </Columns.Column>
        <Columns.Column>
          <Notification>
            <Content>
              <h2>Default Gap column -2</h2>
            </Content>
          </Notification>
        </Columns.Column>
      </Columns>

      <Columns isGapless>
        <Columns.Column>
          <Notification>
            <Content>
              <h2>No Gap column -1</h2>
            </Content>
          </Notification>
        </Columns.Column>
        <Columns.Column>
          <Notification>
            <Content>
              <h2>No Gap column -2 </h2>
            </Content>
          </Notification>
        </Columns.Column>
      </Columns>
    </Container>)
}


export const MultilineColumns = () => {
  return (
    <Container>
      <Content>
        <p> Resize the browser viewport to see the things in action</p>
      </Content>
      <Columns isMultiline>
        <Columns.Column isNarrow>
          <Notification>
            <Content>
              <h2>Column-1</h2>
            </Content>
          </Notification>
        </Columns.Column>
        <Columns.Column isNarrow>
          <Notification>
            <Content>
              <h2>column-2</h2>
            </Content>
          </Notification>
        </Columns.Column>
        <Columns.Column isNarrow>
          <Notification>
            <Content>
              <h2>Column-3</h2>
            </Content>
          </Notification>
        </Columns.Column>
        <Columns.Column isNarrow>
          <Notification>
            <Content>
              <h2>column-4</h2>
            </Content>
          </Notification>
        </Columns.Column>
        <Columns.Column isNarrow>
          <Notification>
            <Content>
              <h2>Column-5</h2>
            </Content>
          </Notification>
        </Columns.Column>
        <Columns.Column isNarrow>
          <Notification>
            <Content>
              <h2>column-6</h2>
            </Content>
          </Notification>
        </Columns.Column>
      </Columns>

    </Container>)
}
