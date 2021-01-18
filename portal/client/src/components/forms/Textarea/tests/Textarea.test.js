import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import TextareaWrapper from "./TextareaWrapper"

test('Render textarea', async () => {
    const { container } = render(
        <TextareaWrapper
            fieldLabel='Textarea'
            fieldName='contents'
            placeholder='Test content'
        />)
    const textarea = container.querySelector('textarea')
    await act(() => Promise.resolve(fireEvent.change(textarea, { target: { value: 'Test content' } })))
    expect(textarea.value).toBe('Test content')
})