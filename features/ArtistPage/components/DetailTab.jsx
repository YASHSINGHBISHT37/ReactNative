import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // or 'react-native-linear-gradient'
import { Image, Text, TouchableOpacity, View } from 'react-native';


const DetailTab = ({ artist }) => {
    return (
        <View className="w-full bg-black relative" style={{ height: '100vh' }}>

            {/* BACK BUTTON overlaid on image */}
            <View className="absolute top-0 left-0 right-0 flex-row items-center justify-between px-4 p-4 z-10">
                <TouchableOpacity>
                    <MaterialIcons name="arrow-back" size={26} color="white" />
                </TouchableOpacity>
                <View className="flex-row items-center gap-4">
                    <MaterialIcons name="share" size={22} color="white" />
                    <MaterialIcons name="more-vert" size={22} color="white" />
                </View>
            </View>

            <View className="w-full h-auto items-center justify-center " style={{ paddingTop: '38vh' }}>


                {/* ARTIST IMAGE */}
                <View className='absolute top-0 left-0 right-0' style={{ width: '100%', 'height': '50vh' }}>
                    <Image source={artist.artistImg} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
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
                                className='w-full px-6 gap-3'
                                start={{ x: 1, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >

                                {/* ALBUM INFO */}
                                <View className=''>
                                    <Text className="text-white font-bold tracking-tighter text-[4vh] ">{artist.artist}</Text>
                                    <Text className="text-white/60 text-[1.5vh] -mt-0.6">100 monthly audience</Text>
                                </View>

                                {/* PLAY/ PAUSE */}
                                <View className="flex-row items-center justify-end gap-3 w-full mb-4">
                                    <TouchableOpacity className="flex-row w-[12vh] h-[4.5vh] gap-1 active:bg-white/10 border border-1 border-white/30 rounded-full items-center justify-center">
                                        <MaterialIcons name="radio-button-on" color="rgba(255,255,255,0.7)" size={20} />
                                        <Text className="text-white/60 text-[1.5vh] -mt-0.6">Radio</Text>
                                    </TouchableOpacity>

                                    {/* <TouchableOpacity className="w-11 h-11 bg-white/0 rounded-full items-center justify-center">
                                                <MaterialIcons name="shuffle" color="rgba(255,255,255,1)" size={20} />
                                            </TouchableOpacity> */}

                                    <TouchableOpacity className="flex-row items-center justify-center bg-white rounded-full w-[6vh] h-[6vh]">
                                        <MaterialIcons name="play-arrow" size={30} />
                                    </TouchableOpacity>


                                </View>
                            </LinearGradient>
                        </LinearGradient>
                    </LinearGradient>

                </LinearGradient>


                {/* <View className='bg-black w-full py-4 pb-8 '>
                            <Text numberOfLines={2} className="text-white/50 text-[1.3vh] text-center px-6">
                                {artist.description}
                            </Text>
                        </View> */}

                <View className='flex-row items-center justify-between w-full px-4 mt-10 mb-4'>
                    <Text className="text-white font-bold tracking-tighter text-[2.2vh] ">Top songs</Text>
                    <MaterialIcons name="arrow-forward" color="rgba(255,255,255,0.7)" size={20} />
                </View>

            </View>

        </View >
    )
}

export default DetailTab