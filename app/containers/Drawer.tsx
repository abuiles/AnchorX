import { Button, Container, Content, Header, Icon, List, ListItem, Text } from 'native-base';
import * as React from 'react';
import { AsyncStorage } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

export default class Drawer extends React.Component<NavigationScreenProps> {
  async logout() {
    try {
      await AsyncStorage.clear()

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
              <Button
                transparent
                onPress={() => { this.logout() }}>
                <Icon name="log-out" />
                <Text>Log out</Text>
              </Button>
            </ListItem>
          </List>
        </Content>
      </Container>
    )
  }
}
