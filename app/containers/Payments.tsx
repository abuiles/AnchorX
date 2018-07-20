import * as React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'

import { Container, Content, Text, Button, Spinner } from 'native-base'
import { styles as s } from 'react-native-style-tachyons'

import { Asset, PaymentOperationRecord, Server, Network } from 'stellar-sdk'

import Payment from '../components/Payment'

interface Props {
  accountId: string
  asset?: Asset
}

interface State {
  loadMore: boolean
  payments: PaymentOperationRecord[]
  loading: boolean
  closeStreaming?: any
}


export default class Payments extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      loadMore: true,
      payments: [],
      loading: false
    }
  }

  async loadPayments(cursor?: string) {
    const { accountId, asset } = this.props
    const { payments } = this.state
    Network.useTestNetwork()
    const stellarServer = new Server('https://horizon-testnet.stellar.org')

    // Load payments for account in descending order. Most recentfirst.
    let builder = stellarServer
      .payments()
      .forAccount(accountId)
      .order('desc')

    if (cursor) {
      builder.cursor(cursor)
    }

    const { records } = await builder.call()

    if (asset) {
      return records.filter((payment) => payment.asset_code === asset.code && payment.asset_issuer === asset.issuer)
    } else {
      return records
    }
  }

  /* Use `now` in the cursor to be notified of new payments. If you don't
   * set the cursor to "now", then you'll be notified about all the
   * payments since account's creation.*/
  listenForPayments(cursor = 'now') {
    const { closeStreaming } = this.state

    if (closeStreaming) {
      try {
        closeStreaming()
      } catch (e) {
        console.log('error closing streaming')
      }
    }

    const { accountId } = this.props

    Network.useTestNetwork()
    const server = new Server('https://horizon-testnet.stellar.org')

    // Notice how we are using PaymentOperationRecord from @types/stellar-sdk
    let handleMessage = (payment: PaymentOperationRecord) => {
      const { asset } = this.props
      const { payments } = this.state

      if (payment.asset_code === asset.code && payment.asset_issuer === asset.issuer) {
        this.setState({
          payments: [payment, ...payments]
        })
      }
    }

    this.setState({
      closeStreaming: server.payments()
        .cursor(cursor)
        .forAccount(accountId)
        .stream({
          onmessage: handleMessage
        })
    })
  }

  /* After the component mounts, load the first page of payments and
   * setup streaming*/
  async componentDidMount() {
    const payments = await this.loadPayments()

    this.setState({
      payments
    })

    this.listenForPayments()
  }

  componentWillUnmount() {
    const { closeStreaming } = this.state

    try {
      closeStreaming && closeStreaming()
    } catch (e) {
      console.log('error closing streaming')
    }
  }

  /* Method use for pagination, it gets calls when the end of the list is
   * reached.  It calls the generic function loadPayments using the last
   * item in payments as the cursor.
   */
  async fetchMoreData() {
    const { accountId } = this.props
    const { payments } = this.state

    const cursor = payments[payments.length - 1].id

    this.setState({
      loading: true
    })

    const nextPage = await this.loadPayments(cursor)

    const state = {
      loadMore: true,
      payments: [...payments, ...nextPage],
      loading: false
    }

    if (nextPage.length === 0) {
      state.loadMore = false
    }

    this.setState(state)
  }

  render() {
    const { accountId } = this.props
    const { loadMore, payments, loading } = this.state

    return (
      <Container style={{ backgroundColor: '#F5FCFF' }} >
        <FlatList
          data={payments}
          renderItem={({ item }) => <Payment key={item.id} payment={item} account={accountId} />}
          keyExtractor={(item) => item.id}
          onEndReachedThreshold={0.2}
          onEndReached={({ distanceFromEnd }) => {
            if (!loadMore || loading) {
              return
            }

            return this.fetchMoreData()
          }}
          refreshing={loading}
          ListFooterComponent={loading && <Spinner color="blue" />}
          onRefresh={() => {
            if (payments.length > 0) {
              this.listenForPayments(payments[0].id)
            }
          }}
        />
      </Container>
    )
  }
}
