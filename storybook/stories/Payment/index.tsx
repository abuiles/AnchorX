import * as React from 'react';
import { View, Text } from 'react-native';
import Payment from '../../../app/components/Payment';
import { PaymentOperationRecord, Server, Network } from 'stellar-sdk'

interface State {
  payment?: PaymentOperationRecord
}

interface Props {
  operation: string
}

class PaymentStory extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {}
  }

  async componentDidMount() {
    const { operation } = this.props
    Network.useTestNetwork()
    const server = new Server('https://horizon-testnet.stellar.org')

    let payment = await server.operations().operation(operation).call()

    this.setState({
      payment
    })
  }

  render() {
    const { payment } = this.state

    if (payment) {
      return (
        <Payment account="GDQXM2OTXDZBSHSOMDMNMYKGUREZQZNFUOLZM7MJ3MIOESRL7YFSEHR7" payment={payment} />
      )
    } else {
      return (<View><Text>Loading</Text></View>)
    }
  }
}

export default PaymentStory
