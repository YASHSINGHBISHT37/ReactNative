import { MaterialIcons } from '@expo/vector-icons';
import { FlatList, Image, Text, View } from 'react-native';

const Albums = ({artist}) => {
  return (
    <View className="flex-1 bg-black relative">
      <FlatList
        data={artist.songs}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => (
          <View>

            {/* Albums */}
            <View className='w-full flex-col bg-slate-00'>
              <View className='p-4 py-2 flex-row w-full items-center justify-between bg-slate-00'>
                <Text className='text-white text-[2.2vh] tracking-tight font-bold'>Albums</Text>
                <MaterialIcons name="arrow-forward" color="rgba(255,255,255,0.6)" size={20} />
              </View>

              <FlatList
                data={artist.songs}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                className='w-full'
                contentContainerStyle={{ paddingHorizontal: 10 }}
                renderItem={({ item }) => (
                  <View className='bg-gray-00'>
                    <View className='gap-2 active:bg-white/10 rounded-[0.8vh] p-2'>
                      <Image
                        source={artist.artistImg}
                        className='rounded-[0.8vh] border border-white/10'
                        resizeMode='cover'
                        style={{ height: '20vh', width: '20vh' }}
                      />
                      <View className=''>
                        <Text className='text-[1.6vh] tracking-tighter w-full truncate text-white'>{artist.name}</Text>
                        <View className='flex-row items-center gap-1'>
                          <MaterialIcons name="explicit" color="rgba(255,255,255,0.6)" size={14} />

                          {/* <h1 className='text-[1.3vh] tracking-tight text-white/60'>Album</h1> */}
                          <Text className='text-[1.3vh] tracking-tight text-white/60'>2024</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>

          </View>
        )}/>
    </View >
  )
}

export default Albums