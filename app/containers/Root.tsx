import * as React from 'react'
import { createDrawerNavigator, NavigationScreenProps, createStackNavigator, createSwitchNavigator } from 'react-navigation'
import Drawer from './Drawer'
import HomeScreen from './Home'

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
    App: AppStack
  },
  {
    initialRouteName: 'App',
    headerMode: 'none'
  }
)

export default Navigator
