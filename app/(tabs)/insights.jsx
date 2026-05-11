import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur'; // or '@react-native-community/blur'
import { LinearGradient } from 'expo-linear-gradient'; // or 'react-native-linear-gradient'
import { useState } from 'react';
import { FlatList, Image, Modal, Text, TouchableOpacity, View } from 'react-native';


const insights = () => {
  const album = {
    name: "HARDSTONE PSYCHO",
    artist: "Don Toliver",
    cover: require('../../assets/images/d.png'),
    description: "HARDSTONE PSYCHO is Don Toliver's fourth studio album, a psychedelic trap journey through love, pain, and euphoria. Executive produced by Travis Scott, the album blends dreamy melodies with hard-hitting 808s, showcasing Toliver's signature falsetto across 15 tracks.",
    songs: [
      { id: '1', title: 'HARDSTONE PSYCHO', artist: 'Don Toliver', duration: '2:57' },
      { id: '2', title: 'BROTHER STONE', artist: 'Don Toliver, Kodak Black', duration: '3:14' },
      { id: '3', title: 'LOST IN THE REAL', artist: 'Don Toliver', duration: '3:02' },
      { id: '4', title: 'ATTITUDE', artist: 'Don Toliver', duration: '2:48' },
      { id: '5', title: 'BACK ON MY BULLSH*T', artist: 'Don Toliver', duration: '3:21' },
      { id: '6', title: 'BANDIT', artist: 'Don Toliver', duration: '2:55' },
      { id: '7', title: 'PSYCHO', artist: 'Don Toliver', duration: '3:10' },
      { id: '8', title: 'SMOKE', artist: 'Don Toliver', duration: '2:44' },
      { id: '9', title: 'PRIVATE LANDING', artist: 'Don Toliver, Justin Bieber, Future', duration: '3:33' },
      { id: '10', title: 'DRIVE', artist: 'Don Toliver', duration: '3:05' },
      { id: '11', title: 'AFTER PARTY', artist: 'Don Toliver', duration: '2:38' },
      { id: '12', title: 'NUMB', artist: 'Don Toliver', duration: '3:17' },
      { id: '13', title: 'OUTERSPACE', artist: 'Don Toliver', duration: '3:44' },
      { id: '14', title: 'LONESTAR', artist: 'Don Toliver', duration: '3:28' },
      { id: '15', title: 'WHOA', artist: 'Don Toliver', duration: '2:51' },
    ]
  }

  const [selectedSong, setSelectedSong] = useState(null)
  const [menuVisible, setMenuVisible] = useState(false)

  const openBottomTab = (song) => {
    setSelectedSong(song)
    setMenuVisible(true)
  }

  const closeBottomTab = () => {
    setMenuVisible(false)
    setSelectedSong(null)
  }

  const menuOptions = [
    { icon: 'play-arrow', label: 'Play Now' },
    { icon: 'queue-music', label: 'Add to Queue' },
    { icon: 'playlist-add', label: 'Add to Playlist' },
    { icon: 'favorite-border', label: 'Like Song' },
    { icon: 'share', label: 'Share' },
    { icon: 'info-outline', label: 'Song Info' },
  ]
  return (
    <View className="flex-1 bg-black relative">

      {/* BACK BUTTON overlaid on image */}
      <View className="absolute top-0 left-0 right-0 flex-row items-center justify-between px-4 p-4 z-10">
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={26} color="white" />
        </TouchableOpacity>
        <View className="flex-row items-center gap-4">
          <MaterialIcons name="share" size={22} color="white" />
          <MaterialIcons name="more-vert" size={22} color="white" />
        </View>
      </View>

      <FlatList
        data={album.songs}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        className="w-full h-auto pb-20"
        ListHeaderComponent={() => (
          <View className="w-full h-auto items-center justify-center " style={{ paddingTop: '38vh' }}>


            {/* ARTWORK BACKGROUND */}
            <View className='absolute top-0 left-0 right-0' style={{ width: '100%', 'height': '50vh' }}>
              <Image source={album.cover} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
            </View>

            {/* ACTION BUTTONS */}
            <LinearGradient
              colors={['rgba(0,0,0,0)', 'black']} // transparent to red-700
              className='w-full'
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
            >

              <LinearGradient
                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)']} // transparent to red-700
                className='w-full'
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
              >

                <LinearGradient
                  colors={['rgba(0,0,0,0)', 'black']} // transparent to red-700
                  className='w-full'
                  start={{ x: 1, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >

                  <LinearGradient
                    colors={['rgba(0,0,0,0)', 'black']} // transparent to red-700
                    className='w-full gap-6'
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >

                    {/* ALBUM INFO */}
                    <View className='flex-col items-center justify-center w-full '>
                      <Text className="text-white font-bold tracking-tight text-[2.4vh]">{album.name}</Text>
                      <View className="flex-row items-center justify-center gap-1">
                        <Text className="text-white/60 text-[1.5vh]">{album.artist}</Text>
                        <View className="bg-white/60 h-[0.4vh] w-[0.4vh] rounded-full" />
                        <Text className="text-white/60 text-[1.5vh]">2024</Text>
                      </View>
                    </View>

                    {/* PLAY/ PAUSE */}
                    <View className="flex-row items-center justify-center gap-3 w-full mb-4">

                      <TouchableOpacity className="w-11 h-11 bg-white/20 rounded-full items-center justify-center">
                        <MaterialIcons name="shuffle" color="rgba(255,255,255,0.7)" size={20} />
                      </TouchableOpacity>

                      <TouchableOpacity className="flex-row items-center justify-center bg-white rounded-full w-[16vh] h-11">
                        <MaterialIcons name="play-arrow" size={20} />
                        <Text className="text-[1.5vh]">Play</Text>
                      </TouchableOpacity>

                      <TouchableOpacity className="w-11 h-11 bg-white/20 rounded-full items-center justify-center">
                        <MaterialIcons name="add" color="rgba(255,255,255,0.7)" size={20} />
                      </TouchableOpacity>
                    </View>
                  </LinearGradient>
                </LinearGradient>
              </LinearGradient>

            </LinearGradient>


            <View className='bg-black w-full py-4 pb-8 '>
              <Text numberOfLines={2} className="text-white/50 text-[1.3vh] text-center px-6">
                {album.description}
              </Text>
            </View>

          </View>
        )}

        renderItem={({ item }) => (
          <View className="w-full border-b border-white/10 flex-row items-center justify-between gap-6 p-3 px-4 bg-black active:bg-white/20 relative">
            <Text className="text-white/60 text-[1.5vh]">{item.id}</Text>
            <View className="flex-1">
              <Text className="text-white text-[1.5vh]">{item.title}</Text>
              <View className="flex-row items-center">
                <MaterialIcons color="rgba(255,255,255,0.6)" style={{ marginRight: 4 }} name="explicit" size={13} />
                <Text className="text-white/60 text-[1.3vh]">{item.artist}</Text>
              </View>
            </View>
            <Text className="text-white/40 text-[1.3vh]">{item.duration}</Text>

            <TouchableOpacity className="" onPress={() => openBottomTab(item)}>
              <MaterialIcons name="more-vert" color="rgba(255,255,255,0.7)" size={20} />
            </TouchableOpacity>
          </View>
        )}

        ListFooterComponent={() => (
          <View className='w-full'>
            <View className="w-full items- p-4 gap-1">
              <Text className="text-white/60 text-[1.3vh]">Released on 28th March, 2024</Text>
              <Text className="text-white/60 text-[1.3vh]">15 Songs, 45 min 57 sec</Text>
              <Text className="text-white/60 text-[1.3vh]">© 2024 Cactus Jack / Atlantic Records</Text>
            </View>

            {/* Fans also like */}
            <View className='w-full flex-col gap-2'>
              <View className='px-4'>
                <Text className='text-white text-[2vh] tracking-tighter mt-4 mb-2 font-bold'>Fans also like</Text>
              </View>

              <FlatList
                data={album.songs}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                className='w-full'
                contentContainerStyle={{ paddingHorizontal: 14 }}
                renderItem={({ item }) => (
                  <View className='mr-4'>
                    <View className='items-center gap-2 active:bg-white/10 rounded-[0.8vh] p-2'>
                      <Image
                        source={album.cover}
                        className='rounded-full'
                        resizeMode='cover'
                        style={{ height: '17vh', width: '17vh' }}
                      />
                      <Text className='text-[1.5vh] tracking-tight font-bold text-white/80'>{album.artist}</Text>
                    </View>
                  </View>
                )}
              />
            </View>
          </View>
        )}
      />

      {/* SONG MENU BOTTOM SHEET */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="slide"
        onRequestClose={closeBottomTab}
      >
        <View className="flex-1 justify-end">
          {/* BACKDROP — tap to close */}
          <TouchableOpacity
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            onPress={closeBottomTab}
            activeOpacity={1}
          />

          {/* CARD */}
          <View className='p-2'>
            <BlurView intensity={100} tint="dark" style={{ borderRadius: 16, overflow: 'hidden' }}>

              {/* DRAG HANDLE */}
              <View className="w-full items-center pt-3 pb-2">
                <View className='bg-white/20' style={{ width: 60, height: 3, borderRadius: 100 }} />
              </View>

              {/* SONG INFO */}
              <View className="flex-row items-center gap-3 px-4 py-3 border-b border-white/10">
                <View className="overflow-hidden" style={{ width: 50, height: 50, borderRadius: 4 }}>
                  <Image source={album.cover} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                </View>
                <View className="flex-1">
                  <Text className="text-white tracking-tight text-[1.5vh]">{album.name}</Text>
                  <View className="flex-row items-center gap-1">
                    <MaterialIcons name="explicit" color="rgba(255,255,255,0.5)" size={13} />
                    <Text className="text-white/50 text-[1.3vh]">{album.artist}</Text>
                  </View>
                </View>

                <MaterialIcons name='share' color="rgba(255,255,255,0.7)" size={22} />
              </View>

              {/* MENU OPTIONS */}
              {menuOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  // onPress={closeBottomTab}
                  className="flex-row items-center gap-3 px-4 py-3.5 active:bg-white/10"
                >
                  <MaterialIcons name={option.icon} className='text-white/60' size={22} />
                  <Text className="text-white/60 text-[1.6vh]">{option.label}</Text>
                </TouchableOpacity>
              ))}
            </BlurView>
          </View>
        </View>
      </Modal>

    </View >
  )
}

export default insights