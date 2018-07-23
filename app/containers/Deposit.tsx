import * as React from 'react'
import { View } from 'react-native'

import { NavigationScreenProps } from 'react-navigation'
import { Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title } from 'native-base'
import { styles as s } from 'react-native-style-tachyons'
import layoutStyles from '../styles/layout'
import DismissableStackNavigator from './DismissableStackNavigator'
import { Transaction } from '../Types'
import TransferForm from '../components/TransferForm'
import CreditDebitMutation, { CREDIT_MUTATION } from '../mutations/CreditDebit'
import CurrentUserQuery, { GET_CURRENT_USER_QUERY } from '../queries/CurrentUser'

export class DepositScreen extends React.Component<NavigationScreenProps> {
  async deposit(mutation, username: string, amount: string): Promise<Transaction> {
    const { data } = await mutation({
      variables: {
        username,
        amount
      }
    })

    return data.credit
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
                   <Title>Deposit</Title>
                 </Body>
                 <Right />
               </Header>
               <Content scrollEnabled={false}>
                 <CreditDebitMutation mutation={CREDIT_MUTATION}>
                   {(mutation, { data }) => {
                      return (
                        <TransferForm send={this.deposit.bind(this, mutation, me.username)} didSend={this.didSend.bind(this)} />
                      )
                   }}
                 </CreditDebitMutation>
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
