// features/album/components/About.jsx
import { BlurView } from 'expo-blur';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const About = ({ album }) => {
  if (!album) return null;

  return (
    <View className="w-full p-4">
      <View 
        className="w-full flex-col border rounded-xl overflow-hidden border-white/10"
        style={{ height: 400 }}
      >
        {/* Artist Background Image */}
        <Image
          source={{ uri: album.artistImg }}
          className="absolute top-0 left-0 w-full h-full"
          resizeMode="cover"
        />

        <View className="w-full justify-between h-full">
          {/* Header */}
          <View className="px-4 py-4 flex-row w-full items-center justify-between">
            <Text className="text-white text-xl tracking-tight font-bold">
              About
            </Text>
          </View>

          {/* Blur Footer */}
          <BlurView intensity={100} tint="dark" className="w-full border-t border-white/10 p-4 gap-4">
            <View className="w-full flex-row items-center justify-between gap-2">
              <View className="flex-1">
                <Text className="text-2xl tracking-tight font-bold text-white">
                  {album.artist}
                </Text>
                <Text className="text-sm text-white/60 mt-0.5">
                  100 monthly listeners
                </Text>
              </View>

              <TouchableOpacity className="border px-4 py-2 rounded-full border-white/30 bg-black/20">
                <Text className="text-sm text-white">Subscribe</Text>
              </TouchableOpacity>
            </View>

            <Text className="text-sm text-white/60 leading-relaxed">
              {album.description}
            </Text>
          </BlurView>
        </View>
      </View>
    </View>
  );
};

export default About;