import * as React from 'react'
import { View } from 'react-native'

import { NavigationScreenProps } from 'react-navigation'
import { Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title } from 'native-base'
import { styles as s } from 'react-native-style-tachyons'
import layoutStyles from '../styles/layout'
import DismissableStackNavigator from './DismissableStackNavigator'
import { Transaction } from '../Types'
import TransferForm from '../components/TransferForm'

export class DepositScreen extends React.Component<NavigationScreenProps> {
  async deposit(amount: string): Promise<Transaction> {
    const transaction = await Promise.resolve({
      id: '1234'
    })

    return transaction
  }

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
            <Title>Deposit</Title>
          </Body>
          <Right />
        </Header>
        <Content scrollEnabled={false}>
          <TransferForm send={this.deposit.bind(this)} />
        </Content>
      </Container>
    )
  }
}

export default DismissableStackNavigator(
  {
    Deposit: {
      screen: DepositScreen
    }
  },
  {
    initialRouteName: 'Deposit',
    headerMode: 'none',
    cardStyle: {
      backgroundColor: '#F5FCFF'
    }
  }
)
