import React from 'react'
import Textarea from './index'
import getFormObject from '../../utils/stories/getFormObject'
import FormWrapper from '../../utils/stories/components/FormWrapper'

export default {
  title: 'Design System/Forms/Textarea',
  component: Textarea,
}

export const Simple = () => {
  const formObject = getFormObject(() => null)
  return (<FormWrapper formObject={formObject}>
    <Textarea formObject={formObject}
              fieldLabel={'Textarea'}
              fieldName={'contents'}
              placeholder='Contents goes here'
              />
    <Textarea formObject={formObject}
              fieldLabel={'Textarea with more rows '}
              fieldName={'contents'}
              placeholder='With more rows'
              rows={6}
    />
    <Textarea formObject={formObject}
              fieldLabel={'Textarea with primary highlight'}
              isPrimary
              fieldName={'contents'}
              placeholder='With Primary highlight'
    />
    <Textarea formObject={formObject}
              fieldLabel={'Textarea has fixed size'}
              hasFixedSize
              fieldName={'contents'}
              placeholder='With Primary highlight'
    />
  </FormWrapper>)
}

export const Sizes = () => {
  const formObject = getFormObject(() => null)
  return (<FormWrapper formObject={formObject}>
    <Textarea formObject={formObject}
              fieldLabel={'Small'}
              size='small'
              fieldName={'contents'}/>
    <Textarea formObject={formObject}
              fieldLabel={'Normal'}
              fieldName={'contents'}/>
    <Textarea formObject={formObject}
              fieldLabel={'Medium'}
              size='medium'
              fieldName={'contents'}/>
    <Textarea formObject={formObject}
              fieldLabel={'Large'}
              size='large'
              fieldName={'contents'}/>
  </FormWrapper>)
}


export const States = () => {
  const formObject = getFormObject(() => null)
  return (<FormWrapper formObject={formObject}>
    <Textarea formObject={formObject}
              fieldLabel='Normal'
              placeholder='Normal textarea'
              fieldName={'contents'}/>
    <Textarea formObject={formObject}
              fieldLabel='Hover'
              placeholder='Hovered text area'
              isHovered
              fieldName='contents'/>
    <Textarea formObject={formObject}
              fieldLabel='Focused'
              placeholder='Focused text area'
              isFocused
              fieldName='contents'/>
    <Textarea formObject={formObject}
              fieldLabel='Loading'
              placeholder='Loading text area'
              isLoading
              fieldName='contents'/>
    <Textarea formObject={formObject}
              fieldLabel='Loading'
              placeholder='Loading large'
              isLoading size='large'
              fieldName='contents'/>
    <Textarea formObject={formObject}
              fieldLabel='Disabled'
              placeholder='Disabled text area'
              isDisabled
              fieldName='contents'/>
    <Textarea formObject={formObject}
              fieldLabel='Readonly'
              placeholder='Readonly text area'
              isReadOnly
              fieldName='contents'/>
  </FormWrapper>)
}

