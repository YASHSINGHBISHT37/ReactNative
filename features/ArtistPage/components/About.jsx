import { BlurView } from 'expo-blur'; // or '@react-native-community/blur'
import { FlatList, Image, Text, View } from 'react-native';

const About = ({artist}) => {
  return (
    <View>
      <FlatList
        data={artist.songs}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => (
            <View className='px-4 bg-slate-00' >

              <View className='w-full flex-col border rounded-[0.8vh] overflow-hidden border-white/10  bg-slate-00' style={{ height: '50vh', width: '100%' }}>
                <Image source={artist.artistImg} className='rounded absolute top-0 left-0' resizeMode='cover' style={{ height: '100%', width: '100%' }}/>
                <View className='w-full justify-between h-full'>

                  <View className='px-4 py-4 flex-row w-full items-center justify-between bg-slate-00'>
                    <Text className='text-white text-[2.2vh] tracking-tight font-bold'>About</Text>
                  </View>

                  <View className='px-'>
                    <BlurView intensity={100} tint="dark" className='w-full border-t border-white/10  p-3 py-4 gap-6 rounded-[0.8vh]'>
                      <View className='w-full flex-row items-center justify-between gap-2'>
                        <View className='w-auto'>
                          <Text className='text-[3vh] tracking-tight font-bold text-white'>{artist.artist}</Text>
                          <Text className='text-[1.2vh] text-white/60 -mt-0.5'>100 monthly audience</Text>
                        </View>
                        <h1 className='border w-[10vh] text-center p-1.5 rounded-full text-[1.4vh] text-white border-white/30 bg-black/20'>Subscribe</h1>
                      </View>

                      <Text className={`text-[1.2vh] text-white/60`}>{artist.description}</Text>
                    </BlurView>
                  </View>

                </View>
              </View>

            </View>
          )}/>
    </View >
  )
}

export default About