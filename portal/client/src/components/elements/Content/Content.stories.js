import React from 'react'
import Content from './index'
import Section from '../../layout/Section'
import Box from '../Box'

export default {
  title: 'Design System/Content',
  component: Content,
}

export const Basic = () => {

  return (<Section>
    <Box>

      <Content>
        <h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3><h4>Heading 4</h4><h5>Heading 5</h5><h6>Heading 6</h6>
        <Content.Title>Content title</Content.Title>
        <Content.Subtitle>Content subtitle</Content.Subtitle>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, amet aut beatae consectetur consequuntur culpa
          dignissimos ea esse est expedita maiores minima perspiciatis quas, quo, repudiandae sit tempore unde ut?</p>
        <ol>
          <li>List item 1</li>
          <li>List item 2</li>
          <li>List item 3</li>
        </ol>
        <ul>
          <li>List item 1</li>
          <li>List item 2</li>
          <li>List item 3</li>
        </ul>
        <blockquote> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae commodi corporis delectus
          doloribus
          ea harum quisquam rem sint veniam voluptas! A est fugiat ipsa nihil omnis? Esse maxime natus quidem?
        </blockquote>

      </Content>
    </Box>


  </Section>)
}


export const Sizes = () => {

  return (
    <Section>
      <Box>
        <Content size={'small'}>
          <h2>This is in Small size</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores harum iusto natus repellendus
            voluptatem?
            Aliquid, illo veniam. Dolore dolorum mollitia nam recusandae repellat veniam voluptatum. Animi distinctio
            magni
            odit rerum.</p>

        </Content>
      </Box>

      <Box>
        <Content size={'medium'}>

          <h2>This is in Medium size</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores harum iusto natus repellendus
            voluptatem?
            Aliquid, illo veniam. Dolore dolorum mollitia nam recusandae repellat veniam voluptatum. Animi distinctio
            magni
            odit rerum.</p>

        </Content>
      </Box>
      <Box>
        <Content size={'large'}>
          <h2>This is in Large size</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores harum iusto natus repellendus
            voluptatem?
            Aliquid, illo veniam. Dolore dolorum mollitia nam recusandae repellat veniam voluptatum. Animi distinctio
            magni
            odit rerum.</p>
        </Content>
      </Box>
    </Section>
  )
}
