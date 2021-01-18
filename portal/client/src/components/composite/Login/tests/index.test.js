/**
 *
 * Tests for Login
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
// import 'jest-dom/extend-expect'; // add some helpful assertions

/* eslint-disable */

import Login from '../index'

const onSubmit = jest.fn()
const logoPath = ''
const email = 'demo@demo.com'
const password = 'abcd123'

const LoginComponent = ()=> <Login onSubmit={onSubmit} logoPath={logoPath} />

describe('<Login />', () => {
 

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error')
    render(<LoginComponent/>)
    expect(spy).toHaveBeenCalled()
  })

  it('Check email', async () => {
    const { container} = render(<LoginComponent/>)
    const input = container.querySelector('input')
   
    await act(() => Promise.resolve(fireEvent.change(input, { target: { value: email } })))
    expect(input.value).toBe(email)
  })

  it('Check password', async () => {
    const { container } = render(<LoginComponent/>)
    const input = container.querySelector('input[type="password"]')
   
    await act(() => Promise.resolve(fireEvent.change(input, { target: { value: password } })))
    expect(input.value).toBe(password)
  })

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it.skip('Should render and match the snapshot', () => {
    expect(firstChild).toMatchSnapshot()
  })

  it('validate user inputs with empty fields, and provides error messages', async () => {
    const { container ,getAllByText } = render(<LoginComponent/>)
    const email = container.querySelector('input')
    const password = container.querySelector('input[type="password"]')

    await act(async () => {
      fireEvent.change(email, {
        target: { value: '' },
      });

      fireEvent.change(password, {
        target: { value: '' },
      })
    });

    await act(async () => {
      fireEvent.submit(container.querySelector('button[type="submit"]'))
    });

    expect(getAllByText("Required").length).toBe(2)
  });

  it('validate wrong email, and provides error messages', async () => {
    const { container ,getAllByText } = render(<LoginComponent/>)
    const emailInputField = container.querySelector('input')
    const passwordInputField = container.querySelector('input[type="password"]')
    const wrongEmail = 'demo@demo';

    await act(async () => {
      fireEvent.change(emailInputField, {
        target: { value: wrongEmail },
      });

      fireEvent.change(passwordInputField, {
        target: { value: '' },
      })
    });

    await act(async () => {
      fireEvent.submit(container.querySelector('button[type="submit"]'))
    });
    expect(getAllByText("must be a valid email").length).toBe(1)
    expect(getAllByText("Required").length).toBe(1)
  });

  it('should submit when form inputs contain text', async () => {
    const { container ,queryByText } = render(<LoginComponent/>)
    const emailInputField = container.querySelector('input')
    const passwordInputField = container.querySelector('input[type="password"]')

    await act(async () => {
      fireEvent.change(emailInputField, {
        target: { value: email },
      });

      fireEvent.change(passwordInputField, {
        target: { value: password },
      })
    });

    await act(async () => {
      fireEvent.submit(container.querySelector('button[type="submit"]'))
    });

    expect(queryByText("Required")).not.toBeInTheDocument();

  });
});

