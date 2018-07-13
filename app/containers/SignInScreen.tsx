import { Body, Button, Container, Content, Header, Left, Right, Text, Title } from 'native-base'
import * as React from 'react'
import { AsyncStorage, View } from 'react-native'
import { styles as s } from 'react-native-style-tachyons'
import { NavigationScreenProps } from 'react-navigation'
import Loading from '../components/Loading'
import Login from '../components/Login'
import { User } from '../Types'
import layoutStyles from '../styles/layout'

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
  async login(username: string): Promise<User|null> {
    try {
      await AsyncStorage.setItem('@AnchorX::Auth', JSON.stringify({
        username
      }))

      return {
        username,
        id: '1233213',
        stellarAccount: '123213'
      }
    } catch (error) {
      return null// Error saving data
    }
  }

  didLogin(user: User): void {
    this.props.navigation.navigate('App')
  }

  render() {
    return (
      <Container style={{backgroundColor: '#F5FCFF'}}>
        <Header style={[layoutStyles.header]}>
          <Left />
          <Body>
            <Title>AnchorX</Title>
          </Body>
          <Right/>
        </Header>
        <Content
          scrollEnabled={false}>
          <Login
            login={this.login.bind(this)}
            didLogin={this.didLogin.bind(this)}
          />
        </Content>
      </Container>
    )
  }
}
