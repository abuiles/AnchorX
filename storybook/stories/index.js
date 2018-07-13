import React from 'react'

import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import Welcome from './Welcome'
import Loading from '../../app/components/Loading'
import Login from './Login'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />)

storiesOf('Loading', module).add('default', () => <Loading />)

storiesOf('Login', module)
  .add('error', () => <Login withError={true} />)
  .add('success', () => <Login withError={false} />)
