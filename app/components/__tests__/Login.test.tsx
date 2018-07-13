import * as React from 'react'
import Login from '../Login'

import * as renderer from 'react-test-renderer'

const login = (username: string) => {
  return new Promise.resolve(null)
}

const didLogin = (user: User) => {
  return new Promise.resolve(null)
}

jest.useFakeTimers()

it('renders correctly', () => {
  const rendered = renderer.create(<Login login={login} didLogin={didLogin} />).toJSON()

  expect(rendered).toMatchSnapshot()
});
