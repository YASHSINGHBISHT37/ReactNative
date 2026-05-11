import { Link } from 'expo-router'
import { Text, View } from 'react-native'

const signIn = () => {
  return (
    <View>
      <Text>Sing In</Text>
      <Link href='/(auth)/sign-up'>Create Account</Link>
    </View>
  )
}

export default signIn