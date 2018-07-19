import React from 'react'

import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { Asset } from 'stellar-sdk'

import Welcome from './Welcome'
import Loading from '../../app/components/Loading'
import Login from './Login'
import Balance from '../../app/containers/Balance'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />)

storiesOf('Loading', module).add('default', () => <Loading />)

storiesOf('Login', module)
  .add('error', () => <Login withError={true} />)
  .add('success', () => <Login withError={false} />)

storiesOf('Balance', module)
  .add('default', () => {
    const anchorXUSD = new Asset(
      'USD',
      'GBX67BEOABQAELIP2XTC6JXHJPASKYCIQNS7WF6GWPSCBEAJEK74HK36'
    )

    const stellarAccount = 'GDQXM2OTXDZBSHSOMDMNMYKGUREZQZNFUOLZM7MJ3MIOESRL7YFSEHR7'

    return (
      <Balance
        accountId={stellarAccount}
        asset={anchorXUSD}
      />
    )
  })
