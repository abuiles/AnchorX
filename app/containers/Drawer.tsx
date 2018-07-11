import * as React from 'react'
import {
  Container,
  Button,
  Content,
  Header,
  Icon,
  List,
  ListItem,
  Text
} from 'native-base';

export default class Drawer extends React.Component<{}, {}> {
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
                onPress={() => { alert('implement me') }}>
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
