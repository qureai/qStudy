import React from 'react'
import TextBox from './index'
import getFormObject from '../../utils/stories/getFormObject'
import FormWrapper from '../../utils/stories/components/FormWrapper'

export default {
  title: 'Design System/Forms/TextBox',
  component: TextBox,
}

export const SimpleTextBox = () => {
  const formObject = getFormObject(() => {})
  return (
    <FormWrapper formObject={formObject}>
      <TextBox fieldLabel='Case name' fieldName='name' formObject={formObject}/>
      <p>{formObject.values['name']}</p>
      <TextBox fieldLabel='Age' fieldName='age' formObject={formObject} type='number'/>
      <p>{formObject.values['age']}</p>

    </FormWrapper>
  )
}


