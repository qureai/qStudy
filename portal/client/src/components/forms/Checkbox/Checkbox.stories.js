import React from 'react'
import Checkbox from './index'
import FormWrapper from '../../utils/stories/components/FormWrapper'
import getFormObject from '../../utils/stories/getFormObject'
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Props,
  Stories,
  PRIMARY_STORY, ArgsTable,
} from '@storybook/addon-docs/blocks'

export default {
  title: 'Design System/Forms/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title/>
          <Subtitle>
            Checkbox for your use
          </Subtitle>
          <Description>
            Description goes here
          </Description>
          <Primary>
            Primary here
          </Primary>
          <ArgsTable story={PRIMARY_STORY}/>
          <Stories/>
        </>
      ),
    },
  },
}

export const SimpleCheckbox = () => {

  const formObject = getFormObject(() => null)
  const options = ['Checkbox 1', 'Checkbox 2', 'Checkbox 3']
  const fieldName = 'checkboxField'
  const selected = _.get(formObject, ['values', fieldName])

  return (
    <FormWrapper formObject={formObject}>
      <Checkbox fieldLabel='Checkbox label' formObject={formObject} fieldName={fieldName}
                options={options}/>
      <span>Selections : {selected.filter((n) => n).join(', ')}</span>

    </FormWrapper>
  )
}


export const CheckboxWithOptions = () => {

  const formObject = getFormObject(() => null)
  const options = [{label: 'Checkbox option 1', value: 'checkbox_1'},
    {label: 'Checkbox option 2', value: 'checkbox_2'},
    {label: 'Checkbox option 3', value: 'checkbox_3'}
  ]
  const fieldName = 'checkboxField2'

  const selected = _.get(formObject, ['values', fieldName])

  return (
    <FormWrapper formObject={formObject}>
      <Checkbox fieldLabel='Checkbox label'
                formObject={formObject}
                fieldName={fieldName}
                options={options}/>
      <span>Selections : {selected.filter((n) => n).join(', ')}</span>
    </FormWrapper>
  )
}
