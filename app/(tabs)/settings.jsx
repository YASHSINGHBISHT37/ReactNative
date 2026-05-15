import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useRef, useState } from 'react';
import { Animated, Image, PanResponder, Text, TouchableOpacity, View } from 'react-native';

const Settings = () => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(600)).current;

  const openSheet = () => {
    setSheetOpen(true);
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 60,
      friction: 12,
    }).start();
  };

  const closeSheet = () => {
    Animated.timing(slideAnim, {
      toValue: 600,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setSheetOpen(false));
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => g.dy > 10,
      onPanResponderMove: (_, g) => {
        if (g.dy > 0) slideAnim.setValue(g.dy);
      },
      onPanResponderRelease: (_, g) => {
        if (g.dy > 100) {
          closeSheet();
        } else {
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const togglePlay = async () => {
    if (!sound) return;
    isPlaying ? await sound.pauseAsync() : await sound.playAsync();
  };

  return (
    <View className='w-full h-full bg-black pt-10 px-4 relative'>

      {/* HEADER */}
      <View className="flex-row items-center justify-between">
        <TouchableOpacity>
          <MaterialIcons name="keyboard-arrow-down" size={32} color="rgba(255,255,255,0.7)" />
        </TouchableOpacity>
        <View className="items-center">
          <Text className="text-white/50 text-[1.2vh] tracking-widest">NOW PLAYING</Text>
          <Text className="text-white font-medium text-[1.5vh]">HARDSTONE PSYCHO</Text>
        </View>
        <MaterialIcons name="more-vert" size={24} color="rgba(255,255,255,0.6)" />
      </View>

      {/* ARTWORK */}
      <View className="w-full items-center mt-16">
        <View className="w-[45vh] h-[45vh] overflow-hidden" style={{ borderRadius: 6 }}>
          <Image
            source={require('../../assets/images/d.png')}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        </View>
      </View>

      {/* SONG INFO */}
      <View className="flex-row items-center justify-between mt-5">
        <View>
          <Text className="text-white font-bold text-[2.4vh] tracking-tight">
            HARDSTONE PSYCHO
          </Text>
          <View className="flex-row items-center gap-1">
            <MaterialIcons name="explicit" size={15} color="rgba(255,255,255,0.5)" />
            <Text className="text-white/50 text-[1.6vh]">Drake</Text>
          </View>
        </View>
        <MaterialIcons name='favorite' size={26} color='#f87171' />
      </View>

      {/* PROGRESS BAR */}
      <View className='mt-12 gap-4'>
        <View className='w-full bg-white/20 h-1 rounded-full'>
          <View className='w-10 bg-white h-full rounded-full' />
        </View>
        <View className='flex-row items-center justify-between'>
          <Text className='text-white' style={{ fontSize: 12 }}>0:00</Text>
          <Text className='text-white' style={{ fontSize: 12 }}>4:13</Text>
        </View>
      </View>

      {/* CONTROLS */}
      <View className='flex-row items-center justify-between mt-8 px-2'>
        <TouchableOpacity activeOpacity={0.7}>
          <MaterialIcons name="shuffle" size={24} color="rgba(255,255,255,0.6)" />
        </TouchableOpacity>

        <View className='flex-row items-center gap-6'>
          <TouchableOpacity activeOpacity={0.7}>
            <MaterialIcons name="skip-previous" size={38} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={togglePlay}
            activeOpacity={0.85}
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              elevation: 8,
            }}
          >
            <MaterialIcons name="play-arrow" size={38} color="black" />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7}>
            <MaterialIcons name="skip-next" size={38} color="white" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity activeOpacity={0.7}>
          <MaterialIcons name="loop" size={24} color="rgba(255,255,255,0.6)" />
        </TouchableOpacity>
      </View>

      {/* OPEN SHEET BUTTON */}
      <TouchableOpacity
        onPress={openSheet}
        className='mt-8 flex-row items-center justify-center gap-2'
        activeOpacity={0.7}
      >
        <MaterialIcons name="queue-music" size={20} color="rgba(255,255,255,0.5)" />
        <Text className='text-white/50 text-[1.4vh]'>Up Next</Text>
      </TouchableOpacity>


      <BlurView experimentalBlurMethod="dimezisBlurView" intensity={100} tint='dark' className='pt-10 px-4 h-full' style={{ position: 'absolute', inset: 0, zIndex: 999, backgroundColor: 'rgba(0,0,0,0)' }}>
        {/* HEADER */}
        <View className="items-end justify-end">
          <MaterialIcons name="close" size={24} color="rgba(255,255,255,0.6)" />
        </View>

        {/* ARTWORK */}
        <View className="w-full items-center mt-16">
          <View className="w-[34vh] h-[34vh] overflow-hidden" style={{ borderRadius: 4 }}>
            <Image
              source={require('../../assets/images/d.png')}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          </View>
        </View>

        {/* SONG INFO */}
        <View className="flex-col items-center justify-center mt-3">
          <Text className="text-white font-medium text-[2.6vh] tracking-tight">BROTHER STONE</Text>

          <View className="flex-row items-center gap-1.5">
            <Text className="text-white/50 text-[1.6vh]">Drake</Text>
            <View className="text-white text-[1.6vh] w-1 h-1" style={{ backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '100%' }}></View>
            <Text className="text-white/50 text-[1.6vh]">HARDSTONE PSYCHO</Text>
          </View>
        </View>

        <View className='mt-10'>
          {[
            { icon: 'favorite-border', label: 'Like', color: 'white' },
            { icon: 'playlist-add', label: 'Add to a Playlist', color: 'white' },
            { icon: 'album', label: 'View Album', color: 'white' },
            { icon: 'person-outline', label: 'Go to Artist', color: 'white' },
            { icon: 'info-outline', label: 'View Song Credits', color: 'white' },
            { icon: 'share', label: 'Share', color: 'white' },
          ].map((item, index, arr) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.6}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 4,
                paddingHorizontal: 4,
                borderBottomWidth: index < arr.length - 1 ? 1 : 0,
                borderBottomColor: 'rgba(255,255,255,0)',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <View style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0)', alignItems: 'center', justifyContent: 'center', }}>
                  <MaterialIcons name={item.icon} size={20} color={item.color} />
                </View>
                <Text style={{ color: 'white', fontSize: 15, fontWeight: '500' }}>{item.label}</Text>
              </View>
            </TouchableOpacity>
          ))}

        </View>




      </BlurView>

    </View>
  );
};

export default Settings;