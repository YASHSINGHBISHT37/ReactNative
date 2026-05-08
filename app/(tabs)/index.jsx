import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <SafeAreaview>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Edit app/index.tsx to edit this screen.</Text>
        <Link href='/boarding'>Go to Boarding</Link>
        <Link href='/(auth)/sing-in'>Go to Sing-in</Link>
        <Link href='/(auth)/sing-up'>Go to Sing-up</Link>
        <Link href='/subscriptions/spotify'>Spotify Subscriptions</Link>
        <Link href={{ pathnname: 'subscriptions/claude', parames: { id: Claude } }}>claude Subscriptions</Link>
      </View>
    </SafeAreaview>
  );
}
