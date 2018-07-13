import * as React from 'react';
import { Alert } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Spinner } from 'native-base';
import { styles as s } from "react-native-style-tachyons";

import { User } from '../Types'

interface LoginProps {
  login: <T = User | null> (username: string) => Promise<T>
  didLogin: (user: User) => void
}

export interface LoginState {
  username: string;
  loading: boolean;
}

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props)

    this.state = {
      username: '',
      loading: false
    }
  }

  async login(): Promise<boolean> {
    const { username } = this.state

    if (!username) return Promise.resolve(false)

    this.setState({
      loading: true
    })

    const user = await this.props.login(username)

    this.setState({
      loading: false
    })

    if (user) {
      this.props.didLogin(user)

      return Promise.resolve(true)
    } else {
      const wrong = `Like a dull actor now,
I have forgot my part, and I am out,
Even to a full disgrace.
(Coriolanus, Act 5, Scene 3)
`
      Alert.alert(wrong)

      return Promise.resolve(false)
    }
  }

  render() {
    const { loading, username } = this.state

    return (
      <Container>
        <Content scrollEnabled={false}>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input
                onChangeText={(username) => this.setState({ username })}
                value={username}
                autoFocus={true}
                autoCorrect={false}
                autoCapitalize={"none"}
              />
            </Item>
            {!loading && (
              <Button full style={[s.mt4]} onPress={() => this.login()}>
                <Text>Log in or sign up</Text>
              </Button>
            )}
            {loading && <Spinner color="blue" />}
          </Form>
        </Content>
      </Container>
    );
  }
}

export default Login
