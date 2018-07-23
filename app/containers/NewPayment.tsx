import * as React from 'react'
import { View } from 'react-native'

import { NavigationScreenProps } from 'react-navigation'
import { Body, Button, Container, Content, Header, Icon, Left, Right, Title } from 'native-base'
import { styles as s } from 'react-native-style-tachyons'
import layoutStyles from '../styles/layout'
import DismissableStackNavigator from './DismissableStackNavigator'
import PaymentForm from '../components/PaymentForm'
import CurrentUserQuery, { GET_CURRENT_USER_QUERY } from '../queries/CurrentUser'
import PaymentMutation, { PAYMENT_MUTATION } from '../mutations/Payment'
import { Transaction } from '../Types'

export class RecipientScreen extends React.Component<NavigationScreenProps> {
  async payment(mutation, sender: string, recipient: string, amount: string): Promise<Transaction> {
    const { data } = await mutation({
      variables: {
        sender,
        recipient,
        amount
      }
    })

    return data.payment
  }

  didSend(): void {
    this.props.navigation.navigate('Home')
  }

  render() {
    const { navigation } = this.props

    const userSelected = () => navigation.navigate('PaymentDetails')

    return (
      <CurrentUserQuery query={GET_CURRENT_USER_QUERY}>
      {({ loading, data }) => {
        if (loading) {
          return <Loading />
        }

        const { me } = data

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
                <Title>New payment</Title>
              </Body>
              <Right>
                <Button
                  transparent>
                  <Icon name='ios-qr-scanner' />
                </Button>
              </Right>
            </Header>
            <Content scrollEnabled={false}>
              <PaymentMutation mutation={PAYMENT_MUTATION}>
                {(mutation, { data }) => {
                   return (
                     <PaymentForm send={this.payment.bind(this, mutation, me.username)} didSend={this.didSend.bind(this)} />
                   )
                }}
              </PaymentMutation>
            </Content>
          </Container>
        )
      }}
      </CurrentUserQuery>
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
