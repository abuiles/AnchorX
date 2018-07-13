import { Body, Button, Container, Content, Header, Left, Right, Text, Title } from 'native-base'
import * as React from 'react'
import { AsyncStorage, View } from 'react-native'
import { styles as s } from 'react-native-style-tachyons'
import { NavigationScreenProps } from 'react-navigation'
import Loading from '../components/Loading'
import Login from '../components/Login'
import { User } from '../Types'
import layoutStyles from '../styles/layout'

import gql from "graphql-tag"
import { Mutation } from "react-apollo"

const SIGNUP = gql`
  mutation signup($username: String!) {
    signup(username: $username) {
      id
      username
      stellarAccount
    }
  }
`

export class AuthLoadingScreen extends React.Component<NavigationScreenProps> {
  constructor(props: NavigationScreenProps) {
    super(props)
    this._bootstrapAsync()
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('@AnchorX::Auth')

    if (userToken) {
      this.props.navigation.navigate('App')
    } else {
      this.props.navigation.navigate('Auth')
    }
  }

  render() {
    return <Loading />
  }
}

export class SignInScreen extends React.Component<NavigationScreenProps> {
  async login(signupMutation: any, username: string): Promise<User | null> {
    try {
      const { data: { signup } } = await signupMutation({ variables: { username } })

      await AsyncStorage.setItem('@AnchorX::Auth', JSON.stringify(signup))

      return signup
    } catch (error) {
      return null// Error saving data
    }
  }

  didLogin(user: User): void {
    this.props.navigation.navigate('App')
  }

  render() {
    return (
      <Mutation mutation={SIGNUP}>
        {(signup, { data }) => (
          <Container style={{ backgroundColor: '#F5FCFF' }}>
            <Header style={[layoutStyles.header]}>
              <Left />
              <Body>
                <Title>AnchorX</Title>
              </Body>
              <Right />
            </Header>
            <Content
              scrollEnabled={false}>
              <Login
                login={this.login.bind(this, signup)}
                didLogin={this.didLogin.bind(this)}
              />
            </Content>
          </Container>
        )}
      </Mutation>
    )
  }
}
