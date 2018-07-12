import * as React from 'react'
import Loading from '../Loading'

import * as renderer from 'react-test-renderer'

it('renders correctly', () => {
  const rendered = renderer.create(<Loading />).toJSON()
  expect(rendered).toMatchSnapshot()
});
