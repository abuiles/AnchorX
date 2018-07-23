import * as React from 'react'
import PaymentForm from '../PaymentForm'

import * as renderer from 'react-test-renderer'

const send = (amount: string) => {
  return new Promise.resolve({
    id: '1234'
  })
}

jest.useFakeTimers()

it('renders correctly', () => {
  const rendered = renderer.create(<PaymentForm send={send} />).toJSON()

  expect(rendered).toMatchSnapshot()
});
