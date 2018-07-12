import * as React from 'react'
import { createDrawerNavigator, NavigationScreenProps, createStackNavigator, createSwitchNavigator } from 'react-navigation'
import Drawer from './Drawer'
import HomeScreen from './Home'
import { AuthLoadingScreen, SignInScreen } from './SignInScreen'

const AuthStack = createStackNavigator({
  SignIn: SignInScreen
}, {
  headerMode: 'none'
});

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
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

export default Navigator
