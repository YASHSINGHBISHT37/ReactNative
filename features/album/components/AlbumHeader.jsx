import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';

const { height } = Dimensions.get('window');

const AlbumHeader = ({ album }) => {
  if (!album) return null;

  return (
    <View className="w-full h-auto items-center justify-center relative" style={{ paddingTop: height * 0.10 }}>

      {/* ARTWORK BACKGROUND */}
      <View className='absolute top-0 left-0 right-0' style={{ width: '100%', 'height': height * 0.66 }}>
        <Image source={{ uri: album.cover }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
      </View>

      <BlurView intensity={30} tint='dark' className='absolute bg-black top-0 left-0 right-0' style={{ width: '100%', height: '100%' }}></BlurView>
      <Image source={{ uri: album.cover }} style={{ width: height * 0.36, 'height': height * 0.36, marginBottom: 10 }} resizeMode="cover" />

      {/* ACTION BUTTONS */}
      <LinearGradient colors={['rgba(0,0,0,0)', 'black']} to red-700 className='w-full' start={{ x: 1, y: 0 }} end={{ x: 1, y: 1 }} >
        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)']} to red-700 className='w-full' start={{ x: 1, y: 0 }} end={{ x: 1, y: 1 }} >
          <LinearGradient colors={['rgba(0,0,0,0)', 'black']} className='w-full gap-6' start={{ x: 1, y: 0 }} end={{ x: 1, y: 1 }} >

            {/* ALBUM INFO */}
            <View className='flex-col items-center justify-center w-full'>
              <Text className="text-white font-bold tracking-tight " style={{ fontSize: height * 0.030 }}>{album.name}</Text>
              <View className="flex-row items-center justify-center gap-1" style={{ marginTop: -height * 0.003 }}>
                <Text className="text-white/60 text-[1.5vh]" style={{ fontSize: height * 0.017 }}>{album.artist} </Text>
                <View className="bg-white/60 h-[0.4vh] w-[0.4vh] rounded-full" style={{ width: height * 0.004, height: height * 0.004, backgroundColor: 'rgba(255,255,255,0.6)' }} />
                <Text className="text-white/60 text-[1.5vh]" style={{ fontSize: height * 0.017 }}>{album.year}</Text>
              </View>
            </View>

            {/* PLAY/ PAUSE */}
            <View className="flex-row items-center justify-center gap-3 w-full">

              <TouchableOpacity style={{ width: height * 0.06, height: height * 0.058, backgroundColor: ' rgba(255, 255, 255, 0.1)' }} className="rounded-full items-center justify-center">
                <MaterialIcons name="shuffle" color="rgba(255,255,255,0.6)" size={20} />
              </TouchableOpacity>

              <TouchableOpacity style={{ width: height * 0.180, height: height * 0.058 }} className="flex-row items-center justify-center bg-white rounded-full">
                <MaterialIcons name="play-arrow" size={28} />
                <Text className="font-medium" style={{ fontSize: height * 0.020 }}>Play</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ width: height * 0.06, height: height * 0.058, backgroundColor: 'rgba(255,255,255,0.1)' }} className="rounded-full items-center justify-center">
                <MaterialIcons name="add" color="rgba(255,255,255,0.6)" size={23} />
              </TouchableOpacity>
            </View>

            {/* DISCRIPTION */}
            <View className='pb-10 '>
              <Text numberOfLines={2} className="text-white/60" style={{ paddingLeft: 28, paddingRight: 28, fontSize: height * 0.016, textAlign: 'center' }}>
                {album.description?.split('From Wikipedia')[0].replace(/\.\s*\n/g, ". ")}
              </Text>
            </View>

          </LinearGradient>
        </LinearGradient>
      </LinearGradient>

    </View >)
}


export default AlbumHeader;