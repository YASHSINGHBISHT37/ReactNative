import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // or 'react-native-linear-gradient'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import Album from '../../components/Album';
import { artistData } from '../../features/ArtistPage/components/artistData';


const Artist = () => {
  const artist = artistData

  return (
    <View className="flex-1 bg-black relative">
      <Album/>

      {/* BACK BUTTON overlaid on image */}
      <View className="absolute top-0 left-0 right-0 flex-row items-center justify-between px-4 p-4 z-10 bg-black">
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={26} color="white" />
        </TouchableOpacity>
        <View className="flex-row items-center gap-4">
          <MaterialIcons name="share" size={22} color="white" />
          <MaterialIcons name="more-vert" size={22} color="white" />
        </View>
      </View>



      <FlatList
        data={artist.songs.slice(0, 6)}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        className="w-full h-auto pb-20"
        ListHeaderComponent={() => (
          <View className="w-full h-auto items-center justify-center " style={{ paddingTop: '38vh' }}>


            {/* ARTIST IMAGE */}
            <View className='absolute top-0 left-0 right-0' style={{ width: '100%', 'height': '50vh' }}>
              <Image source={artist.artistImg} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
            </View>

            {/* ACTION BUTTONS */}
            <LinearGradient
              colors={['rgba(0,0,0,0)', 'black']}
              className='w-full'
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
            >

              <LinearGradient
                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)']}
                className='w-full'
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
              >

                <LinearGradient
                  colors={['rgba(0,0,0,0)', 'black']}
                  className='w-full'
                  start={{ x: 1, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >

                  <LinearGradient
                    colors={['rgba(0,0,0,0)', 'black']}
                    className='w-full px-4 gap-3'
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >

                    {/* ARTIST INFO */}
                    <View className=''>
                      <Text className="text-white font-bold tracking-tighter text-[4vh] ">{artist.artist}</Text>
                      <Text className="text-white/60 text-[1.4vh] tracking-tight -mt-0.6">100 monthly audience</Text>
                    </View>

                    {/* PLAY/ PAUSE */}
                    <View className="flex-row items-center justify-between gap-3 w-full mb-4">
                      <TouchableOpacity className="flex-row w-[vh] px-5 h-[4.3vh] gap-1 active:bg-white/10 border border-1 border-white/20 rounded-full items-center justify-center">
                        <Text className="text-red-500/80 text-[1.5vh] -mt-0.6 font-medium">Subscribe</Text>
                      </TouchableOpacity>

                      <View className="flex-row items-center gap-3">
                        <TouchableOpacity className="flex-row w-[11vh] h-[4.3vh] gap-1 active:bg-white/ border border-1 border-white/20 rounded-full items-center justify-center">
                          <MaterialIcons name="radio-button-on" color="rgba(255,255,255,0.7)" size={20} />
                          <Text className="text-white/60 text-[1.5vh] -mt-0.6">Radio</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="flex-row items-center justify-center bg-white rounded-full w-[5.6vh] h-[5.6vh]">
                          <MaterialIcons name="play-arrow" size={30} />
                        </TouchableOpacity>
                      </View>

                    </View>
                  </LinearGradient>
                </LinearGradient>
              </LinearGradient>
              -
            </LinearGradient>

            <View className='flex-row items-center justify-between w-full px-4 mb-3'>
              <Text className="text-white font-bold tracking-tighter text-[2.2vh] ">Top songs</Text>
              <MaterialIcons name="arrow-forward" color="rgba(255,255,255,0.6)" size={20} />
            </View>

          </View>
        )}


        renderItem={({ item }) => (
          <View className="px-2 active:bg-white/20 ">
            <View className="w-full flex-row items-center justify-between gap-3 pb-0 px-2 bg-black active:bg-white/10 rounded-[1vh]">
              <Image source={artist.artistImg} className='rounded-[0.6vh]' style={{ height: '5.6vh', width: '5.6vh' }} />
              <View className=' border-b border-white/10 flex-row flex-1 items-center justify-center h-16'>
                <View className="flex-1">
                  <Text className="text-white text-[1.5vh]">{item.title}</Text>
                  <View className="flex-row items-center">
                    <MaterialIcons color="rgba(255,255,255,0.6)" style={{ marginRight: 4 }} name="explicit" size={13} />
                    <Text className="text-white/60 text-[1.3vh]">{item.artist}</Text>
                  </View>
                </View>
                {/* <Text className="text-white/40 text-[1.3vh] mr-2">{item.duration}</Text> */}

                <TouchableOpacity className="" onPress={() => openBottomTab(item)}>
                  <MaterialIcons name="more-vert" color="rgba(255,255,255,1)" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

      />

    </View >
  )
}

export default Artist