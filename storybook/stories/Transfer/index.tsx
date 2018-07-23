import * as React from 'react';
import { Alert } from 'react-native';
import TransferForm from '../../../app/components/TransferForm';

class TransferFormStory extends React.Component {
  render() {
    const transaction = {
      id: '1234'
    }

    const send = (amount: string) => {
      return new Promise((resolve) => {
        Alert.alert(
          `Sending ${amount} to or from your bank!`,
          'This should call the mutation deposit or withdrawal',
          [
            {text: 'OK', onPress: () => resolve(transaction)},
          ],
          { cancelable: false }
        )
      })
        }

    return (
      <TransferForm send={send} />
    )
  }
}

export default TransferFormStory
