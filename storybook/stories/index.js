import React from 'react'

import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { Asset } from 'stellar-sdk'

import Welcome from './Welcome'
import Loading from '../../app/components/Loading'
import Login from './Login'
import Balance from '../../app/containers/Balance'
import Payment from './Payment'
import Transfer from './Transfer'

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

storiesOf('Payment', module)
  .add('from account -$10', () => {
    return (<Payment operation={'43397496315056129'} /> )
  })
  .add('to account +$10', () => {
    return (<Payment operation={'43381600641101825'} /> )
  })

storiesOf('TransferForm', module).
  add('default', () => <Transfer />)
