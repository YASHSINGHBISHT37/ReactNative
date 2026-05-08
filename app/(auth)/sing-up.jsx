import { Link } from 'expo-router'
import { Text, View } from 'react-native'

const singUp = () => {
  return (
    <View>
      <Text>Sing Up</Text>
      <Link href='/(auth)/sing-up'>Sign In</Link>
    </View>
  )
}

export default singUp