import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import TextBoxWrapper from './TextBoxWrapper'

test('Render textbox', async () => {
    const { container } = render(
        <TextBoxWrapper
            fieldLabel='Case name' fieldName='name'
        />)
    const textbox = container.querySelector('input')
    await act(() => Promise.resolve(fireEvent.change(textbox, { target: { value: 'Test content' } })))
    expect(textbox.value).toBe('Test content')
})