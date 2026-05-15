import { MaterialIcons } from '@expo/vector-icons';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

export const TopSongs = ({ artist }) => {
  return (
    <View className="flex-1 bg-black relative">
      <FlatList
        data={artist.songs}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        className="w-full h-auto pb-20"
        renderItem={({ item }) => (
          <View className="w-full flex-row items-center justify-between gap-3 p-1 px-4 bg-black active:bg-white/20 relative">
            <Image source={artist.artistImg} className='rounded-[0.6vh]' style={{ height: '5.4vh', width: '5.4vh' }} />
            <View className='border-b border-white/10 flex-row flex-1 items-center justify-center py-2'>
              <View className="flex-1">
                <Text className="text-white text-[1.5vh]">{item.title}</Text>
                <View className="flex-row items-center">
                  <MaterialIcons color="rgba(255,255,255,0.6)" style={{ marginRight: 4 }} name="explicit" size={13} />
                  <Text className="text-white/60 text-[1.3vh]">{item.artist}</Text>
                </View>
              </View>
              <Text className="text-white/40 text-[1.3vh] mr-2">{item.duration}</Text>
              <TouchableOpacity onPress={() => openBottomTab(item)}>
                <MaterialIcons name="more-vert" color="rgba(255,255,255,0.7)" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  )
}