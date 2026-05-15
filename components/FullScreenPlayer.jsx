import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRef, useState } from 'react';
import { Animated, Image, Pressable, Text, TouchableOpacity, View, } from 'react-native';
import { playButtonPressIn, playButtonPressOut, pressInAnimation, pressOutAnimation, toggleSongInfoAnimation } from '../animations/FullScreenPlayerAnimations';

export default function FullScreenPlayer({ song }) {
  const options = [
    { title: 'Shuffle', name: 'shuffle' },
    { title: 'Sleep', name: 'timer' },
    { title: 'Lyrics', name: 'lyrics' },
    { title: 'Repeat', name: 'repeat' },
  ];


  // SONG INFO SLIDE
  const slideAnim = useRef(new Animated.Value(-60)).current
  const [open, setOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const playBtnAnim = useRef(new Animated.Value(1)).current
  const leftWidth = useRef(new Animated.Value(70)).current
  const rightWidth = useRef(new Animated.Value(70)).current





  return (
    <View className='w-full'
      style={{
        overflow: 'hidden',
        height: '100%',
        backgroundColor: 'darkred',
      }}
    >
      <LinearGradient
        colors={['black', 'transparent']}
        style={{ height: '100%' }}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
      >
        <LinearGradient
          className='flex-col justify-between'
          colors={['black', 'transparent']}
          style={{
            paddingHorizontal: 26,
            paddingTop: 40,
            paddingBottom: 10,
            height: '100%',
          }}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
        >
          <View>
            {/* HEADER */}
            <View className='flex-row items-center justify-between'>
              <TouchableOpacity>
                <MaterialIcons
                  name='keyboard-arrow-down'
                  size={32}
                  color='white'
                />
              </TouchableOpacity>

              <View className='items-center'>
                <Text className='text-white/60 text-[1.2vh] font-medium'>
                  NOW PLAYING
                </Text>

                <Text
                  className='text-white font-bold'
                  style={{ marginTop: -2, fontSize: 14 }}
                >
                  {song.name}
                </Text>
              </View>

              <MaterialIcons
                name='more-vert'
                size={24}
                color='white'
              />
            </View>

            {/* ARTWORK */}
            <View
              style={{ marginTop: 50 }}
              className='w-full items-center'
            >
              <View
                className='overflow-hidden'
                style={{
                  borderRadius: 6,
                  width: '100%',
                  aspectRatio: 1,
                }}
              >
                <Image
                  source={require('../assets/images/21.jpg')}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode='cover'
                />
              </View>
            </View>

            {/* SONG INFO */}
            <TouchableOpacity onPress={() => toggleSongInfoAnimation({ slideAnim, open, setOpen, })} className='flex-row items-center justify-between mt-8 overflow-hidden'>
              <Animated.View
                className='flex-row items-center gap-3'
                style={{ height: 50, transform: [{ translateX: slideAnim }], }}>
                <Image
                  source={require('../assets/images/21.jpg')}
                  resizeMode='cover'
                  style={{
                    width: 50,
                    aspectRatio: 1,
                    borderRadius: 4,
                  }}
                />

                <View>
                  <Text className='text-white font-bold text-[2.6vh] tracking-tight'>
                    {song.name}
                  </Text>

                  <View className='flex-row items-center gap-1'>
                    <MaterialIcons
                      name='explicit'
                      size={16}
                      color='rgba(255,255,255,0.6)'
                    />

                    <Text className='text-white/50 text-[2vh] font-medium tracking-tight'>
                      {song.artist}
                    </Text>
                  </View>
                </View>
              </Animated.View>

              <MaterialIcons
                name='favorite-border'
                size={26}
                color='white'
              />
            </TouchableOpacity>

            {/* PROGRESS */}
            <View style={{ marginTop: 70, gap: 10 }}>
              <View
                style={{ height: 5 }}
                className='w-full bg-white/20 rounded-full'
              >
                <View className='w-10 bg-white h-full rounded-full' />
              </View>

              <View className='flex-row items-center justify-between'>
                <Text
                  className='text-white/60 tracking-tight'
                  style={{ fontSize: 12 }}
                >
                  0:00
                </Text>

                <Text
                  className='text-white/60 tracking-tight'
                  style={{ fontSize: 12 }}
                >
                  4:13
                </Text>
              </View>
            </View>

            {/* CONTROLS */}

            <View
              style={{
                marginTop: 20,
                gap: 10,
              }}
              className='flex-row items-center'
            >
              <Animated.View
                style={{
                  width: leftWidth,
                  height: 70,
                }}
              >
                <Pressable
                  onPressIn={() => pressInAnimation({ widthAnim: leftWidth, })}
                  onPressOut={() => pressOutAnimation({ widthAnim: leftWidth, })}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 100,
                    backgroundColor: 'rgb(255 255 255 / 0.2)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MaterialIcons
                    name='skip-previous'
                    size={30}
                    color='white'
                  />
                </Pressable>
              </Animated.View>

              {/* PLAY/PAUSE */}
              <View className='flex-1' >
                <Animated.View style={{ transform: [{ scale: playBtnAnim }], }} >

                  <Pressable
                    onPress={() => setIsPlaying(!isPlaying)}
                    onPressIn={() => playButtonPressIn({ leftWidth, rightWidth, playScale: playBtnAnim, })}
                    onPressOut={() => playButtonPressOut({ leftWidth, rightWidth, playScale: playBtnAnim, })}
                    style={{
                      height: 70,
                      borderRadius: 100,
                      backgroundColor: 'white',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      position: 'relative',
                      overflow: 'hidden'

                    }}
                  >
                    {/* <Pressable
                      style={{ backgroundColor: 'transparent', zIndex: 1 }}
                      className='w-full h-full absolute top-0 left-0'></Pressable> */}

                    <View
                      style={{
                        height: 50,
                        width: '100%',
                        // backgroundColor: 'red',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        paddingHorizontal: 10,
                        position: 'relative',
                        overflow: 'hidden'

                      }}>
                      <View style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }}>
                        <MaterialIcons
                          name={isPlaying ? 'pause' : 'play-arrow'}
                          size={30}
                          color='black'
                        />
                      </View>
                      <Text style={{
                        color: 'black',
                        fontSize: 16,
                        fontWeight: '700',
                        width: 52,        // fixed width, "Pause" ke hisaab se
                        textAlign: 'left' // left align taki shift na ho
                      }}>
                        {isPlaying ? 'Pause' : 'Play'}
                      </Text>
                    </View>

                  </Pressable>
                </Animated.View>
              </View>

              {/* RIGHT */}
              <Animated.View
                style={{
                  width: rightWidth,
                  height: 70,
                }}
              >
                <Pressable
                  onPressIn={() => pressInAnimation({ widthAnim: rightWidth, })}
                  onPressOut={() => pressOutAnimation({ widthAnim: rightWidth, })}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 100,
                    backgroundColor: 'rgb(255 255 255 / 0.2)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MaterialIcons
                    name='skip-next'
                    size={30}
                    color='white'
                  />
                </Pressable>
              </Animated.View>

            </View>
          </View>

          {/* BOTTOM */}
          <View style={{ gap: 20, marginTop: 20 }}>
            <View className='flex-row'>
              <View className='flex-row gap-2'>
                {options.map((opt, i) => (
                  <TouchableOpacity
                    key={i}
                    activeOpacity={0.7}
                    style={{
                      width: 40,
                      height: 40,

                      borderTopLeftRadius: i === 0 ? 100 : 6,
                      borderBottomLeftRadius: i === 0 ? 100 : 6,

                      borderTopRightRadius:
                        i === options.length - 1 ? 100 : 6,

                      borderBottomRightRadius:
                        i === options.length - 1 ? 100 : 6,

                      borderWidth: 1,
                      borderColor: 'rgb(255 255 255 / 0.5)',

                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <MaterialIcons
                      name={opt.name}
                      size={20}
                      color='white'
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View className='items-center justify-center w-full'>
              <View
                style={{
                  backgroundColor: 'rgba(255,255,255,0.6)',
                  height: 3,
                  width: 100,
                  borderRadius: 1000,
                }}
              />
            </View>
          </View>
        </LinearGradient>
      </LinearGradient>
    </View>
  );
}