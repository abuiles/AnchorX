import { Platform, StyleSheet } from 'react-native'

export default layoutStyles = StyleSheet.create({
  header: {
    ...Platform.select({
      ios: {
        backgroundColor: '#F5FCFF'
      }
    })
  }
})
