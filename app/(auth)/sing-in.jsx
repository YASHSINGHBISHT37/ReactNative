import { Link } from 'expo-router'
import { Text, View } from 'react-native'

const singIn = () => {
  return (
    <View>
      <Text>Sing In</Text>
      <Link href='/(auth)/sing-up'>Create Account</Link>
    </View>
  )
}

export default singIn