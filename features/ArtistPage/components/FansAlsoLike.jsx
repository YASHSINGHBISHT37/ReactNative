import { FlatList, Image, Text, View } from 'react-native';

const FansAlsoLike = ({ artist }) => {
    return (
        <View>
            <FlatList
                data={artist.songs}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={() => (
                    <View>

                        {/* Fans also like */}
                        <View className='w-full flex-col gap-2 bg-slate-00'>
                            <View className='px-4'>
                                <Text className='text-white text-[2vh] tracking-tighter mt-4 mb-2 font-bold'>Fans also like</Text>
                            </View>

                            <FlatList
                                data={artist.songs}
                                keyExtractor={(item) => item.id}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                className='w-full'
                                contentContainerStyle={{ paddingHorizontal: 10 }}
                                renderItem={({ item }) => (
                                    <View className=''>
                                        <View className='items-center gap-2 active:bg-white/10 rounded-[0.8vh] p-4'>
                                            <Image
                                                source={artist.artistImg}
                                                className='rounded-full border border-white/20'
                                                resizeMode='cover'
                                                style={{ height: '18vh', width: '18vh' }}
                                            />
                                            <Text className='text-[1.5vh] tracking-tight font-medium text-white'>{artist.artist}</Text>
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

export default FansAlsoLike