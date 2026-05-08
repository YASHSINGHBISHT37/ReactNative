import { Link } from 'expo-router'
import { Text, View } from 'react-native'

const SubscriptionDetails = () => {
    const {id} = useLocalSearchParams()
  return (
    <View>
      <Text>Subscription Details: {id}</Text>
      <Link href='/'>Go Back</Link>
    </View>
  )
}

export default SubscriptionDetails