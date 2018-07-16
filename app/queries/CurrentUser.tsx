import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { User } from '../Types'

interface Data {
  me: User
}

export const GET_CURRENT_USER_QUERY = gql`
  query getCurrentUser {
    me @client {
      id
      username
      stellarAccount
    }
  }
`

export default class CurrentUserQuery extends Query<Data> {}
