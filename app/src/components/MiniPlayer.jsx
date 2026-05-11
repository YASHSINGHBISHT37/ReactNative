import { MaterialIcons } from "@expo/vector-icons"
import { BlurView } from "expo-blur"
import { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"

const MiniPlayer = () => {
    const currentSong = { title: "BROTHER STONE", artist: "Don Toliver, Kodak Black" }
    const [isPlaying, setIsPlaying] = useState(false)
    const [isFav, setIsFav] = useState(false)

    const togglePlay = () => setIsPlaying(prev => !prev)
    const toggleFav = () => setIsFav(prev => !prev)

    return (
        <View className="flex-1 flex-row items-center bg-[#121212]">

            <View className="absolute bottom-20 z-50 items-center justify-end gap-6 px-2 z-99999 w-full">

                <BlurView intensity={40} tint="dark" className="w-full border border-white/20 p-2 py-1.5 rounded-full flex-row items-center justify-between">
                    {/* Song Detail */}
                    <View className="flex-row items-center gap-2">
                        <View className="bg-white/10 rounded-full w-12 h-12"></View>

                        <View className="flex-col gap-0.5">
                            <Text className="text-white">{currentSong.title}</Text>
                            <Text className="text-white/60 text-[1.3vh]">{currentSong.artist}</Text>
                        </View>
                    </View>

                    {/* Controls */}
                    <View className="flex-row items-center gap-1.5">
                        <TouchableOpacity className="border border-white/30 w-10 h-10 items-center justify-center rounded-full p-1.5">
                            <MaterialIcons className="text-white/70" name="add" size={20} />
                        </TouchableOpacity>

                        <TouchableOpacity className={`border w-10 h-10 items-center justify-center rounded-full p-1.5 text-blue-600  ${isFav ? "border-red-400" : "border-white/30"}`} onPress={toggleFav}>
                            <MaterialIcons className={`${isFav ? "text-red-400" : "text-white/70"}`} name={isFav ? 'favorite' : "favorite-border"} size={20} size={20} />
                        </TouchableOpacity>

                        <TouchableOpacity className="w-7 h-7 items-center justify-center mr-1" onPress={togglePlay}>
                            <MaterialIcons className="text-white" size={24} name={isPlaying ? "pause" : "play-arrow"} />
                        </TouchableOpacity>
                    </View>
                </BlurView>

            </View>

        </View>
    )
}

export default MiniPlayer