import { Button, Container, Content, Header, Icon, List, ListItem, Text } from 'native-base';
import * as React from 'react';
import { AsyncStorage } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { ApolloConsumer } from 'react-apollo'

export default class Drawer extends React.Component<NavigationScreenProps> {
  async logout(apolloCache) {
    try {
      await AsyncStorage.clear()
      apolloCache.resetStore()

      this.props.navigation.navigate('AuthLoading');
    } catch (error) {
      // Error during logout
    }
  }

  render() {
    return (
      <Container style={{backgroundColor: '#F5FCFF'}}>
      <Header style={{backgroundColor: '#F5FCFF'}} />
      <Content>
        <List>
          <ListItem>
            <Button
              transparent
              onPress={() => alert('implement me')}>
              >
              <Icon name="ios-qr-scanner" />
              <Text>Your QR Code</Text>
            </Button>
          </ListItem>
          <ListItem>
            <ApolloConsumer>
              {cache => (
                <Button
                  transparent
                  onPress={() => { this.logout(cache) }}>
                  <Icon name="log-out" />
                  <Text>Log out</Text>
                </Button>
              )}
            </ApolloConsumer>
          </ListItem>
        </List>
      </Content>
      </Container>
    )
  }
}
