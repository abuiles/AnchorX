import * as React from 'react'
import { View } from 'react-native'

import { NavigationScreenProps } from 'react-navigation'
import { Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title } from 'native-base'
import { styles as s } from 'react-native-style-tachyons'
import layoutStyles from '../styles/layout'
import DismissableStackNavigator from './DismissableStackNavigator'
import PaymentForm from '../components/PaymentForm'

export class RecipientScreen extends React.Component<NavigationScreenProps> {
  render() {
    const { navigation } = this.props

    const userSelected = () => navigation.navigate('PaymentDetails')

    return (
      <Container style={{backgroundColor: '#F5FCFF'}}>
        <Header style={layoutStyles.header}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.screenProps.dismiss()}>
              <Icon name='close' />
            </Button>
          </Left>
          <Body>
            <Title>Recipient</Title>
          </Body>
          <Right>
            <Button
              transparent>
              <Icon name='ios-qr-scanner' />
            </Button>
          </Right>
        </Header>
        <Content scrollEnabled={false}>
          <PaymentForm send={() => {}} didSend={() => {} } />
        </Content>
      </Container>
    )
  }
}

export default DismissableStackNavigator(
  {
    Recipient: {
      screen: RecipientScreen
    }
  },
  {
    initialRouteName: 'Recipient',
    headerMode: 'none',
    cardStyle: {
      backgroundColor: '#F5FCFF'
    }
  }
)
