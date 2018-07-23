import * as React from 'react';
import { Alert } from 'react-native'
import { Container, Content, Form, Item, Input, Label, Button, Text, Spinner } from 'native-base';
import { styles as s } from "react-native-style-tachyons";

import { Transaction } from '../Types'

interface Props {
  send: (amount: string) => Promise<Transaction>
}

interface State {
  amount: string
  sending: boolean
}

class TransferForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      amount: '',
      sending: false
    }
  }

  async send(): Promise<Transaction> {
    const { amount } = this.state

    this.setState({
      sending: true
    })

    const transaction = await this.props.send(amount)

    this.setState({
      sending: false
    })

    return transaction
  }

  render() {
    const { amount, sending } = this.state

    return (
      <Container>
        <Content scrollEnabled={false}>
          <Form>
            <Item floatingLabel>
              <Label>Amount</Label>
              <Input
                onChangeText={(amount) => this.setState({ amount })}
                value={amount}
                keyboardType={'decimal-pad'}
                autoFocus={true}
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

export default TransferForm
