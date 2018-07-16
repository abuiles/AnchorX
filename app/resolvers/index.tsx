import { AsyncStorage } from 'react-native'
import { User } from '../Types'

export default {
  Query: {
    me: async () => {
      const user = await AsyncStorage.getItem('@AnchorX::Auth')

      if (user) {
        return JSON.parse(user)
      } else {
        return null
      }
    }
  }
}
