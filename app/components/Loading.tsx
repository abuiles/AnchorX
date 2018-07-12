import * as React from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  View
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})

class Loading extends React.Component {
  render () {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <StatusBar barStyle="default" />
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }
}

export default Loading
