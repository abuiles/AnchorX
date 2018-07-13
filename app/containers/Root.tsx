import * as React from 'react'
import { createDrawerNavigator, NavigationScreenProps, createStackNavigator, createSwitchNavigator } from 'react-navigation'

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { withClientState } from 'apollo-link-state';
import { ApolloLink, Observable } from 'apollo-link';
import { ApolloProvider } from "react-apollo";

import Drawer from './Drawer'
import HomeScreen from './Home'
import { AuthLoadingScreen, SignInScreen } from './SignInScreen'
import NewPaymentStack from './NewPayment'

const GraphQLHost = 'https://anchorx-api.herokuapp.com/'

const AuthStack = createStackNavigator({
  SignIn: SignInScreen
}, {
  headerMode: 'none'
});

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    NewPayment: {
      screen: NewPaymentStack
    }
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#F5FCFF',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
    mode: 'modal',
    cardStyle: {
      backgroundColor: '#F5FCFF'
    }
  }
)

const AppStack = createDrawerNavigator(
  {
    Home: {
      screen: HomeStack,
    },
  },
  {
    contentComponent: ({ navigation }: NavigationScreenProps) => (<Drawer navigation={navigation} />),
  }
)

const Navigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading',
    headerMode: 'none'
  }
)

const resolvers =  {}

export default class Root extends React.Component {
  createApolloClient() : ApolloClient {
    const graphqlHost = GraphQLHost

    const cache = new InMemoryCache({});

    const request = async (operation) => {
      operation.setContext({
        headers: {
          'access-token': 'use-a-real-auth-system',
        }
      });
    };

    const requestLink = new ApolloLink((operation, forward) =>
      new Observable(observer => {
        let handle: any;
        Promise.resolve(operation)
               .then(oper => request(oper))
               .then(() => {
                 handle = forward(operation).subscribe({
                   next: observer.next.bind(observer),
                   error: observer.error.bind(observer),
                   complete: observer.complete.bind(observer),
                 });
               })
               .catch(observer.error.bind(observer));

        return () => {
          if (handle) handle.unsubscribe;
        };
      })
    );

    return new ApolloClient({
      link: ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
          if (graphQLErrors)
            graphQLErrors.map(({ message, locations, path }) =>
              console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
              ),
            );
          if (networkError) console.log(`[Network error]: ${networkError}`);
        }),
        requestLink,
        withClientState({
          defaults: {},
          resolvers,
          cache
        }),
        new HttpLink({
          uri: graphqlHost,
          credentials: 'include'
        })
      ]),
      cache,
      shouldBatch: true
    })
  }


  render() {
    return (
      <ApolloProvider client={this.createApolloClient()}>
        <Navigator />
      </ApolloProvider>
    )
  }
}
