import * as React from 'react';
import { Alert } from 'react-native';
import PaymentForm from '../../../app/components/PaymentForm';

class PaymentFormStory extends React.Component {
  render() {
    const transaction = {
      id: '1234'
    }

    const send = (username: string, amount: string) => {
      return new Promise((resolve) => {
        Alert.alert(
          `Sending ${amount} to ${username}!`,
          'This should call the mutation payment',
          [
            {text: 'OK', onPress: () => resolve(transaction)},
          ],
          { cancelable: false }
        )
      })
        }

    return (
      <PaymentForm send={send} didSend={()=> {}} />
    )
  }
}

export default PaymentFormStory
