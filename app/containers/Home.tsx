import { Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title } from "native-base";
import * as React from 'react';
import { View } from 'react-native';
import { styles as s } from "react-native-style-tachyons";
import { NavigationScreenProps } from 'react-navigation';
import layoutStyles from '../styles/layout';

export default class Home extends React.Component<NavigationScreenProps> {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: () => (
      <Icon name="menu" />
    )
  };

  render() {
    return (
      <Container style={{backgroundColor: '#F5FCFF'}}>
        <Header style={layoutStyles.header}>
          <Left>
            <Button
              transparent
              onPress={() => {
                  this.props.navigation.openDrawer();
              }}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>AnchorX</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("NewPayment")}>
              <Text>Send</Text>
            </Button>
          </Right>
        </Header>
        <Content scrollEnabled={false}>
          <View
            style={[
              {
                justifyContent: 'center',
                alignItems: 'center'
              },
              s.pa4
            ]}
          >
            <Text>$1000</Text>
          </View>
          <View style={s.aic}>
            <Text>Payment 1</Text>
            <Text>Payment 2</Text>
          </View>
        </Content>
      </Container>
    )
  }
}
