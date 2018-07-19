import * as React from 'react'
import {
  Platform,
  StyleSheet,
  View
} from 'react-native'

import {
  Asset,
  AccountResponse,
  Network,
  Server
} from 'stellar-sdk'

import { Text } from 'native-base'
import { styles as s } from 'react-native-style-tachyons'

import Loading from '../components/Loading'

interface Props {
  accountId: string
  asset: Asset
}

interface State {
  sdkAccount: AccountResponse
}

export default class Balance extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() {
    const { accountId } = this.props
    const stellarServer = new Server('https://horizon-testnet.stellar.org')
    const sdkAccount = await stellarServer.loadAccount(accountId)

    this.setState({
      sdkAccount
    })
  }

  render() {
    const { sdkAccount } = this.state
    const { asset } = this.props

    if (!sdkAccount) return <Loading />

    const { balance } = sdkAccount.balances.find(({ asset_code, asset_issuer }) => asset_code === asset.code && asset_issuer === asset.issuer)

    return (
      <View style={[s.jcc, s.aic]}>
        <Text style={s.f3}>
          {balance}
        </Text>
      </View>
    )
  }
}
