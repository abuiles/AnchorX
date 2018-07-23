import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Transaction } from '../Types'

interface Data {
  deposit: Transaction
}

interface Variables {
  amount: string
  username: string
}

export const CREDIT_MUTATION = gql`
  mutation credit($amount: String!, $username: String!) {
    credit(amount: $amount, username: $username) {
      id
    }
  }
`
export default class CreditDebitMutation extends Mutation<Data, Variables> {}
