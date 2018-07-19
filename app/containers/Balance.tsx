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

  // Update
  async componentDidMount() {
    const { accountId } = this.props
    const stellarServer = new Server('https://horizon-testnet.stellar.org')
    const sdkAccount = await stellarServer.loadAccount(accountId)

    // Setup streaming to the accountId, this returns a function which
    // you can use to close the stream.
    let accountEventsClose = stellarServer.accounts().accountId(accountId).stream({
      // onmessage is called each time the ledger closes
      onmessage: res => {
        const { sdkAccount } = this.state

        // Check if balances changed and if they did update sdkAcount.balances
        if (sdkAccount.balances !== res.balances) {
          sdkAccount.balances = res.balances

          this.setState({
            sdkAccount: sdkAccount
          })
        }
      }
    });

    // For convinience add this to the account so you can close
    // on componentWillUnmount. hat-tip to StellarTerm ;)
    sdkAccount.close = () => {
      try {
        accountEventsClose();
      } catch(e) {
        console.log('error closing account streaming')
      }
    }

    this.setState({
      sdkAccount
    })
  }

  componentWillUnmount() {
    const { sdkAccount } = this.state
    // Close the stream when unmounting the component
    sdkAccount.close()
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
