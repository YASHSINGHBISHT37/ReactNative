import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
const { width, height } = Dimensions.get('window');

export default function Index({ }) {

  const currentSong = { title: "BROTHER STONE", artist: "Don Toliver, Kodak Black" }
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFav, setIsFav] = useState(false)

  const togglePlay = () => setIsPlaying(prev => !prev)
  const toggleFav = () => setIsFav(prev => !prev)

  return (
    <View className="w-full h-full items-start bg-black px-4 mb-10">

      {/* TOP */}
      <View className="flex-row items-center justify-between w-full h-12">
        <TouchableOpacity cla>
          <MaterialIcons className="text-white/60" name="arrow-back" size={'2.8vh'} />
        </TouchableOpacity>

        <View className="flex-col items-center">
          <Text className="text-white/60 text-[1.2vh]">NOW PLAYING</Text>
          <Text className="text-white font-bold text-[1.4vh]">{currentSong.title}</Text>
        </View>

        <MaterialIcons className="text-white/0" name="arrow-back" size={20} />
      </View>


      {/* ARTWORK */}
      <View className="w-full items-center justify-center mt-6">
        <View className="w-[45vh] h-[45vh] rounded-[0.8vh] overflow-hidden">
          <Image source={require('../../assets/images/d.png')} style={{ width: '100%', height: '100%' }} />
        </View>
      </View>


      {/* SONG INFO */}
      <View className="w-full mt-3 flex-row items-center justify-between pr-2">
        <View className="" style={{}} >
          <Text className="text-white tracking-tight font-poppins-semibold text-[2vh]">{currentSong.title}</Text>
          <View className="flex-row items-center justify-center">
            <MaterialIcons className="text-white/60 " style={{ marginRight: '2px' }} name="explicit" size={15} />
            <Text className="text-white/60 font-poppins-regular text-[1.5vh] tracking-tight">{currentSong.artist}</Text>
          </View>
        </View>

        <MaterialIcons className={`text-white/70 mt-2 ${isFav ? "text-red-400" : "text-white/70"}`} name={isFav ? 'favorite' : "favorite-border"} size={24} onPress={toggleFav} />
      </View>


      {/* SEEK BAR */}
      <View className="w-full items-center justify-between my-6">
        <View className="w-full bg-white/10 h-[0.5vh] rounded-full">
        </View>

        <View className="w-full flex-row justify-between mt-2">
          <Text className="text-white/50 text-[1.2vh]">0:00</Text>
          <Text className="text-white/50 text-[1.2vh]">3:14</Text>
        </View>

      </View>


      {/* PLay/Pause */}
      <View className="w-full flex-row items-center justify-between gap-2">

        <TouchableOpacity className="bg-white/10 items-center justify-center rounded-full p-1.5"
          style={{ width: height * 0.10, height: height * 0.09 }}>
          <MaterialIcons color="white" name="skip-previous" size={28} />
        </TouchableOpacity>

        <TouchableOpacity className="flex-1 flex-row bg-white items-center justify-center rounded-full"
          style={{ height: height * 0.09 }} onPress={togglePlay}>
          <MaterialIcons name={isPlaying ? "pause" : "play-arrow"} size={28} />
          <Text className="font-semibold" style={{ height: height * 0.018 }}>
            {isPlaying ? "Pause" : "Play"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-white/10 items-center justify-center rounded-full p-1.5"
          style={{ width: height * 0.10, height: height * 0.09 }}>
          <MaterialIcons color="white" name="skip-next" size={28} />
        </TouchableOpacity>

      </View>

      <View className="">
        <View className="">

        </View>
      </View>

    </View>
  )
}