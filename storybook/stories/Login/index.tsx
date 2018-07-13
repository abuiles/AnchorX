import * as React from 'react';
import { Alert } from 'react-native'
import { User } from '../Types'
import Login from '../../../app/components/Login'
import { User } from '../../../app/Types'

interface LoginProps {
  withError: boolean
}

export default class LoginStory extends React.Component<LoginProps> {
  render() {
    const { withError } = this.props

    const user = {
      username: 'tomdoe',
      stellarAccount: '1234',
      id: '1234'
    }

    const login = (username: string) => {
      return new Promise((resolve) => {
        Alert.alert(
          'Logging in',
          'This should make a call to the backend and create or login the user',
          [
            {text: 'OK', onPress: () => resolve(withError ? null : user)},
          ],
          { cancelable: false }
        )
      })
    }

    const didLogin = (user: User) => {
      return new Promise((resolve) => {
        Alert.alert(
          'Did Login',
          'Called after the user is logged in successfully',
          [
            {text: 'OK', onPress: () => resolve(null)},
          ],
          { cancelable: false }
        )
      })
    }
    return (
      <Login
        login={login}
        didLogin={didLogin}
      />
    )
  }
}
