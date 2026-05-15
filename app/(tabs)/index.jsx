// app/(tabs)/index.jsx
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const openAlbum = () => {
      router.push('/album/MPREb_y17shKO1nZm');
  };

  return (
    <View className="flex-1 items-center justify-center bg-black pb-20">
      <Text className="text-white text-2xl font-bold mb-8 text-center px-4">
        🎵 Music App
      </Text>

      <TouchableOpacity onPress={openAlbum} className="bg-green-500 px-8 py-4 rounded-full mb-4">
        <Text className="text-white font-bold text-lg">Test Album</Text>
      </TouchableOpacity>

      <Text className="text-white/60 text-center px-4 mt-4">
        Use Search tab to find songs 🔍
      </Text>
    </View>
  );
}