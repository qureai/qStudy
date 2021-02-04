import React from 'react'
import Card from './index'
import '../../scss/stories.scss'

export default {
  title: 'Composite/Cards',
  component: Card,
}

export const CardWithHeader = () => {
  return <Card classname={'card-wrapper'} CardTitle={() => (<span> Card header content </span>)}>
    <p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to
      corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the
      holistic world view of disruptive innovation via workplace diversity and empowerment.
    </p>
  </Card>
}

CardWithHeader.story = {
  name: 'Card with Header',
}

export const CardWithFooter = () => {
  return <Card classname={'card-wrapper'} CardTitle={() => (<span> Card header content</span>)}
               Footer={() => (
                 <>
                   <a href="#" className="card-footer-item">Save</a>
                   <a href="#" className="card-footer-item">Edit</a>
                   <a href="#" className="card-footer-item">Delete</a>
                 </>)
               }>

    <p>Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital
      divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will
      close the loop on focusing solely on the bottom line.
    </p>
  </Card>
}

CardWithFooter.story = {
  name: 'Card with Footer',
}


export const ContentOnlyCard = () => {
  return (
    <Card classname={'card-wrapper'}
          contentOnly>
      <div className="content">
        <div className='title'>Title
        </div>
        <div className='subtitle'>Subtitle</div>
        <p>Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going
          forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud
          solution. User generated content in real-time will have multiple touchpoints for offshoring.

        </p>
      </div>
    </Card>)
}

ContentOnlyCard.story = {
  name: 'Content only card',
}
