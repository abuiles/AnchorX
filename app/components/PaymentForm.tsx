import * as React from 'react';
import { Alert } from 'react-native'
import { Container, Content, Form, Item, Input, Label, Button, Text, Spinner } from 'native-base';
import { styles as s } from "react-native-style-tachyons";

import { Transaction } from '../Types'

interface Props {
  send: (username: string, amount: string) => Promise<Transaction>
  didSend: () => void
}

interface State {
  amount: string
  username: string
  sending: boolean
}

class PaymentForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      amount: '',
      username: '',
      sending: false
    }
  }

  async send(): Promise<Transaction> {
    const { username, amount } = this.state

    this.setState({
      sending: true
    })

    const transaction = await this.props.send(username, amount)

    this.setState({
      sending: false
    })

    this.props.didSend()

    return transaction
  }

  render() {
    const { amount, username, sending } = this.state

    return (
      <Container style={{backgroundColor: '#F5FCFF'}}>
        <Content scrollEnabled={false}>
          <Form>
            <Item floatingLabel>
              <Label>Recipient username</Label>
              <Input
                onChangeText={(username) => this.setState({ username })}
                value={username}
                autoFocus={true}
                autoCorrect={false}
                autoCapitalize={"none"}
              />
            </Item>
            <Item floatingLabel>
              <Label>Amount</Label>
              <Input
                onChangeText={(amount) => this.setState({ amount })}
                value={amount}
                keyboardType={'decimal-pad'}
                autoCorrect={false}
                autoCapitalize={"none"}
              />
            </Item>
            {!sending && (
               <Button full style={[s.mt4]} onPress={() => this.send()}>
                 <Text>Send</Text>
               </Button>
            )}
            {sending && <Spinner color="blue" />}
          </Form>
        </Content>
      </Container>
    );
  }
}

export default PaymentForm
