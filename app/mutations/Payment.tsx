import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Transaction } from '../Types'

interface Data {
  payment: Transaction
}

interface Variables {
  amount: string
  sender: string
  recipient: string
}

export const PAYMENT_MUTATION = gql`
  mutation payment($amount: String!, $sender: String!, $recipient: String!) {
    payment(amount: $amount, senderUsername: $sender, recipientUsername: $recipient) {
      id
    }
  }
`

export default class PaymentMutation extends Mutation<Data, Variables> {}
