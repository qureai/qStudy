import React from 'react'
import _ from 'lodash'

import { fireEvent, render, act } from '@testing-library/react'
import CheckboxWrapper from './CheckboxWrapper'

const options = ['Checkbox 1', 'Checkbox 2', 'Checkbox 3']
const objectOptions = [{ label: 'Checkbox option 1', value: 'checkbox_1' },
{ label: 'Checkbox option 2', value: 'checkbox_2' },
{ label: 'Checkbox option 3', value: 'checkbox_3' }
]
const fieldName = 'checkboxField'

test('Renders simple checkbox with options', () => {
    const { getByText } = render(<CheckboxWrapper fieldName={fieldName}
        options={options} />)
    options.map(option => expect(getByText(option)).toHaveTextContent(option))

})

test('Selection using simple checkbox with options as array of strings', async () => {
    const { container, getByText } = render(<CheckboxWrapper fieldName={fieldName}
        options={options} />)
    const randomSelection = _.random(0, _.size(options) - 1);
    const getRandomCheckboxElement = _.get(container.getElementsByClassName('is-checkradio'), randomSelection);
    await act(() => Promise.resolve(fireEvent.click(getRandomCheckboxElement)));
    expect(getByText(/Selections/i)).toHaveTextContent(options[randomSelection]);   //  TODO: need to check for multiple inputs
})

test('Selection using simple checkbox with options as array of objects ', async () => {
    const { container, getByText } = render(<CheckboxWrapper fieldName={fieldName}
        options={objectOptions} />)
    const randomSelection = _.random(0, _.size(objectOptions) - 1);
    const getRandomCheckboxElement = _.get(container.getElementsByClassName('is-checkradio'), randomSelection);
    await act(() => Promise.resolve(fireEvent.click(getRandomCheckboxElement)));
    expect(getByText(/Selections/i)).toHaveTextContent(objectOptions[randomSelection].value);   //  TODO: need to check for multiple inputs
})