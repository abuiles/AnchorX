import * as React from 'react'
import { View } from 'react-native'

import { NavigationScreenProps } from 'react-navigation'
import { Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title } from 'native-base'
import { styles as s } from 'react-native-style-tachyons'
import layoutStyles from '../styles/layout'
import DismissableStackNavigator from './DismissableStackNavigator'


export class PaymentDetailsScreen extends React.Component<NavigationScreenProps> {
  render() {
    return (
      <Container style={{ flex: 1, backgroundColor: '#F5FCFF' }}>
        <Header style={layoutStyles.header}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.screenProps.dismiss()}>
              <Icon name='close' />
            </Button>
          </Left>
          <Body>
            <Title>New payment</Title>
          </Body>
          <Right />
        </Header>
        <Content scrollEnabled={false}>
          <View
            style={[
              s.jcc,
              s.aic,
              s.pa4
            ]}
          >
            <Text style={[s.pa4]}>Payment details screen</Text>
          </View>
        </Content>
      </Container>
    )
  }
}

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
          <View
            style={[
              s.jcc,
              s.aic,
              s.pa4
            ]}
          >
            <Text style={[s.pa4]}>Select recipient screen</Text>
            <Button style={[s.pa4]} onPress={() => userSelected() }>
              <Text>Go to payment details screen</Text>
            </Button>
          </View>
        </Content>
      </Container>
    )
  }
}

export default DismissableStackNavigator(
  {
    Recipient: {
      screen: RecipientScreen
    },
    PaymentDetails: {
      screen: PaymentDetailsScreen
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
