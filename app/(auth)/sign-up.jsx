import { Link } from 'expo-router'
import { Text, View } from 'react-native'

const signUp = () => {
  return (
    <View>
      <Text>Sign Up</Text>
      <Link href='/(auth)/sing-up'>Sign In</Link>
    </View>
  )
}

export default signUp