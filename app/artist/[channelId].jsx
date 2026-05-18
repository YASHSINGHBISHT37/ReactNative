import { MaterialIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useRef } from 'react';
import { Animated, Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { usePlayerStore } from '../../store/playerStore';

const { height, width } = Dimensions.get('window');
const HEADER_HEIGHT = height * 0.60;

export default function ArtistScreen() {
    const { channelId } = useLocalSearchParams();
    const router = useRouter();
    const { setCurrentSong, setStreamUrl, setCurrentSongId } = usePlayerStore();
    const scrollY = useRef(new Animated.Value(0)).current;  // ✅

    const { data: artist, isLoading } = useQuery({
        queryKey: ['artist', channelId],
        queryFn: async () => {
            const { data } = await axios.get(`http://192.168.1.8:8000/artist/${channelId}`);
            return data;
        }
    });

    // console.log('Total songs:', artist.songs?.length);

    const playSong = async (song) => {
        try {
            setCurrentSongId(song.videoId);
            const { data } = await axios.get(`http://192.168.1.8:8000/player/stream/${song.videoId}`);
            setCurrentSong(song);
            setStreamUrl(data.stream_url);
        } catch (err) {
            console.error('Play error:', err.message);
        }
    };

    // ✅ Parallax — image upar jaayegi scroll ke saath
    const imageTranslateY = scrollY.interpolate({
        inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
        outputRange: [HEADER_HEIGHT / 2, 0, -HEADER_HEIGHT / 3],
        extrapolate: 'clamp',
    });

    // ✅ Image thodi zoom hogi scroll pe
    const imageScale = scrollY.interpolate({
        inputRange: [-HEADER_HEIGHT, 0],
        outputRange: [2, 1],
        extrapolate: 'clamp',
    });

    if (isLoading) return (
        <View style={{ flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: 'white' }}>Loading...</Text>
        </View>
    );

    if (!artist) return null;

    return (
        <View style={{ flex: 1, backgroundColor: 'black', position: 'relative' }}>
            {/* ✅ Animated.ScrollView — scroll track karo */}
            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 140 }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
            >

                {/* BACK BUTTON overlaid on image */}
                <View style={{ position: 'absolute', paddingHorizontal: 10, top: 40, left: 0, width: '100%', height: 36 }} className="flex-row items-center justify-between z-10">
                    <TouchableOpacity onPress={() => router.back()} style={{ width: 36, height: 36, alignItems: 'center', justifyContent: 'center' }}>
                        <MaterialIcons name="arrow-back" size={22} color="white" />
                    </TouchableOpacity>
                    <View className="flex-row items-center gap-4">

                        <TouchableOpacity style={{ width: 36, height: 36, alignItems: 'center', justifyContent: 'center' }}>
                            <MaterialIcons name="share" size={22} color="white" />
                        </TouchableOpacity>

                        <TouchableOpacity style={{ width: 36, height: 36, alignItems: 'center', justifyContent: 'center' }}>
                            <MaterialIcons name="more-vert" size={22} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* HEADER */}
                <View style={{ height: HEADER_HEIGHT, position: 'relative', overflow: 'hidden', backgroundColor: 'blue' }}>

                    {/* ✅ Parallax Image */}
                    <Animated.View style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,backgroundColor:'blue',
                        transform: [{ translateY: imageTranslateY }, { scale: imageScale }],
                    }}>
                        <Image source={{ uri: artist.thumbnail }} style={{ width: '100%', height: height * 0.5 }} resizeMode="cover" />
                        {/* <BlurView intensity={20} tint="dark" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} /> */}
                        <Image source={{ uri: artist.thumbnail }} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} resizeMode="cover" />
                    </Animated.View>

                    <LinearGradient colors={['transparent', 'black']} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: height * 0.2 }} />
                    <LinearGradient colors={['transparent', 'black']} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: height * 0.2 }} />

                    {/* ARTIST INFO */}
                    <View style={{ position: 'absolute', bottom: 16, left: 16, right: 20 }}>
                        <Text style={{ color: 'white', fontSize: 42 }} className="font-bold tracking-tighter">{artist.name}</Text>
                        <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: -2 }} >{artist.monthlyListeners} monthly audience</Text>
                    </View>
                </View>

                


                {/* NEW RELEASE */}
                <View className='w-full' style={{ paddingHorizontal: 26, marginVertical: 20, width: '100%', }}>
                    <View style={{ gap: 12, borderRadius: 10, overflow: '', borderColor: 'rgba(255,255,255,0)', backgroundColor: 'rgba(255,255,255,0)', padding: 0 }} className='flex-row flex-1 items-center border'>
                        <Image source={{ uri: artist.thumbnail }} style={{ width: height * 0.11, height: height * 0.11, borderRadius: 4, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }} />

                        <View style={{ height: height * 0.10, paddingVertical: 2 }} className='justify-between flex-1'>


                            <View>
                                <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>MAY 15, 2026</Text>
                                <Text className='font-medium' style={{ fontSize: 20, color: 'white' }}>ICEMAN</Text>
                                <View className='flex-row items-center gap-1'>
                                    <MaterialIcons name="explicit" color="rgba(255,255,255,0.6)" size={14} />
                                    <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }} className='tracking-tight'>{artist.name} 18 Songs</Text>
                                </View>
                            </View>

                            <View className='flex-row items-center justify-between'>
                                <Text className='font-mediu tracking-tight' style={{ fontSize: 12, color: 'rgba(255,255,255,1)' }}>Listion to the new album</Text>
                                {/* <MaterialIcons name="arrow-forward-ios" color="rgba(255,255,255,0.6)" size={14} /> */}
                            </View>
                        </View>
                    </View>
                </View>

                {/* TOP SONGS */}
                {artist.songs?.length > 0 && (
                    <View style={{ marginTop: 24, }}>

                        {/* Header */}
                        <View style={{ paddingHorizontal: 16, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 20, color: 'white', fontWeight: '700', letterSpacing: -0.5 }}>Top Songs</Text>
                            <MaterialIcons name="arrow-forward-ios" color="rgba(255,255,255,0.6)" size={16} />
                        </View>

                        {/* Swipeable Pages */}
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            decelerationRate="fast"
                            snapToInterval={width}
                            snapToAlignment="start"
                        >
                            {Array.from({ length: Math.ceil(Math.min(artist.songs.length, 8) / 4) }).map((_, pageIndex) => (
                                <View key={pageIndex} style={{ width, paddingHorizontal: 8 }}>
                                    {artist.songs.slice(0, 8).slice(pageIndex * 4, pageIndex * 4 + 4).map((song, index) => (
                                        <TouchableOpacity
                                            key={song.videoId || index}
                                            onPress={() => playSong(song)}
                                            activeOpacity={0.7}
                                            style={{ flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0)', alignItems: 'center', gap: 12, paddingVertical: 4, paddingHorizontal: 8, borderRadius: height * 0.008 }}
                                        >
                                            <Image
                                                source={{ uri: song.thumbnails?.[0]?.url }}
                                                style={{ height: height * 0.058, width: height * 0.058, borderRadius: 4, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' }}
                                            />
                                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}>
                                                <View style={{ flex: 1 }}>
                                                    <Text numberOfLines={1} style={{ fontSize: 14, color: 'white', fontWeight: '500', letterSpacing: -0.2 }}>
                                                        {song.title}
                                                    </Text>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <MaterialIcons name="explicit" color="rgba(255,255,255,0.5)" size={13} style={{ marginRight: 4 }} />
                                                        <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{song.name}</Text>
                                                        <Text style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, marginLeft: 4 }}>{song.year}</Text>
                                                    </View>
                                                </View>
                                                <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, marginRight: 4 }}>{song.views}</Text>
                                                <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                                                    <MaterialIcons name="more-vert" color="rgba(255,255,255,0.9)" size={20} />
                                                </TouchableOpacity>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            ))}
                        </ScrollView>

                    </View>
                )}

                {/* ALBUMS */}
                {artist.albums?.length > 0 && (
                    <View style={{ marginTop: 28 }}>

                        <View style={{ paddingHorizontal: 16, fontSize: 30, backgroundColor: '' }} className='py-1 flex-row items-center justify-between'>
                            <Text style={{ fontSize: 20 }} className='text-white tracking-tight font-bold'>Albums</Text>
                            <MaterialIcons name="arrow-forward-ios" color="rgba(255,255,255,0.6)" size={16} />
                        </View>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 6, gap: 0 }}>
                            {artist.albums.map((album, i) => (
                                <TouchableOpacity
                                    key={album.browseId || i}
                                    onPress={() => router.push(`/album/${album.browseId}`)}
                                    activeOpacity={0.7}
                                    style={{ backgroundColor: 'rgba(255,255,255,0)', padding: 9, borderRadius: height * 0.008, width: height * 0.22 }}
                                >

                                    <View className='items-center justify-center gap-2'>
                                        <Image
                                            source={{ uri: album.thumbnails?.[0]?.url }}
                                            style={{ width: height * 0.20, height: height * 0.20, borderRadius: height * 0.008, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' }} />
                                        <View className='gap-0 flex-col justify-start w-full'>
                                            <Text style={{ paddingHorizontal: 2, fontSize: 14, }} numberOfLines={1} className='font-medium text-white'>{album.title}</Text>
                                            <View className='flex-row items-center gap-1'>
                                                <MaterialIcons name="explicit" color="rgba(255,255,255,0.6)" size={14} />
                                                {/* <Text style={{fontSize: 13, }} className='tracking-tight text-white/60'>Album</Text> */}
                                                <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }} className='tracking-tight'>{album.year}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}

                        </ScrollView>

                    </View>
                )}

                {/* SINGLES */}
                {artist.singles?.length > 0 && (
                    <View style={{ marginTop: 28 }}>

                        <View style={{ paddingHorizontal: 16, fontSize: 30, backgroundColor: '' }} className='py-1 flex-row items-center justify-between'>
                            <Text style={{ fontSize: 20 }} className='text-white tracking-tight font-bold'>Singles & EPs</Text>
                            <MaterialIcons name="arrow-forward-ios" color="rgba(255,255,255,0.6)" size={16} />
                        </View>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 6, gap: 0 }}>
                            {artist.singles.map((single, i) => (
                                <TouchableOpacity
                                    key={single.browseId || i}
                                    onPress={() => router.push(`/album/${single.browseId}`)}
                                    activeOpacity={0.7}
                                    style={{ backgroundColor: 'rgba(255,255,255,0)', padding: 9, borderRadius: height * 0.008, width: height * 0.22 }}>

                                    <View className='items-center justify-center gap-2'>
                                        <Image
                                            source={{ uri: single.thumbnails?.[0]?.url }}
                                            style={{ width: height * 0.20, height: height * 0.20, borderRadius: height * 0.008, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' }} />
                                        <View className='gap-0 flex-col justify-start w-full'>
                                            <Text style={{ paddingHorizontal: 2, fontSize: 14, }} numberOfLines={1} className='font-medium text-white'>{single.title}</Text>
                                            <View className='flex-row items-center gap-1'>
                                                <MaterialIcons name="explicit" color="rgba(255,255,255,0.6)" size={14} />
                                                {/* <Text style={{fontSize: 13, }} className='tracking-tight text-white/60'>Album</Text> */}
                                                <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }} className='tracking-tight'>{single.year}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                )}

                {/* VIDEOS */}
                {artist.singles?.length > 0 && (
                    <View style={{ marginTop: 28 }}>

                        <View style={{ paddingHorizontal: 16, fontSize: 30, backgroundColor: '' }} className='py-1 flex-row items-center justify-between'>
                            <Text style={{ fontSize: 20 }} className='text-white tracking-tight font-bold'>Videos</Text>
                            <MaterialIcons name="arrow-forward-ios" color="rgba(255,255,255,0.6)" size={16} />
                        </View>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 6, gap: 0 }}>
                            {artist.singles.map((single, i) => (
                                <TouchableOpacity
                                    key={single.browseId || i}
                                    onPress={() => router.push(`/album/${single.browseId}`)}
                                    activeOpacity={0.7}
                                    style={{ backgroundColor: 'rgba(255,255,255,0)', padding: 9, borderRadius: height * 0.008, width: height * 0.42 }}>

                                    <View className='items-center justify-center gap-2'>
                                        <Image
                                            source={{ uri: single.thumbnails?.[0]?.url }}
                                            style={{ width: height * 0.40, height: height * 0.24, borderRadius: height * 0.008, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }} />
                                        <View className='gap-0 flex-col justify-start w-full'>
                                            <Text style={{ paddingHorizontal: 2, fontSize: 14, }} numberOfLines={1} className='font-medium text-white'>{single.title}</Text>
                                            <View className='flex-row items-center gap-1'>
                                                <MaterialIcons name="explicit" color="rgba(255,255,255,0.6)" size={14} />
                                                {/* <Text style={{fontSize: 13, }} className='tracking-tight text-white/60'>Album</Text> */}
                                                <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }} className='tracking-tight'>{single.year}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                )}

                {/* ABOUT */}
                <View style={{ paddingHorizontal: 16, marginTop: 28 }} >
                    <View style={{ height: height * 0.54, width: '100%', borderWidth: 1, borderRadius: height * 0.01, borderColor: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>

                        <Image source={{ uri: artist.thumbnail }} className='absolute top-0 left-0' resizeMode='cover' style={{ height: '100%', width: '100%' }} />

                        <View style={{ height: '100%' }} className='flex-wow justify-between'>
                            <Text style={{ fontSize: 20 }} className='text-white p-4 py-3 tracking-tight font-bold'>About</Text>

                            <BlurView intensity={100} tint="dark" style={{ borderWidth: 0, overflow: 'hidden', borderTopRightRadius: 0, borderTopLeftRadius: 0, backgroundColor: 'rgba(0,0,0,0.7)', gap: 36 }} className='w-full p-3 px-4'>
                                <View className='w-full flex-row items-center justify-between gap-2'>
                                    <View className='w-auto'>
                                        <Text style={{ fontSize: 30 }} className='font-bold text-white'>Drake</Text>
                                        <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: -2 }}>{artist.monthlyListeners} monthly audience</Text>
                                    </View>
                                    <Text className='font-medium' style={{ color: 'white', fontSize: 11, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 20, paddingHorizontal: 12, padding: 5 }}>Follow</Text>
                                </View>

                                {artist.description && (
                                    <Text numberOfLines={4} style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, lineHeight: 17 }}>{artist.description}</Text>
                                )}
                            </BlurView>

                        </View>
                    </View>
                </View>

                {/* FANS ALSO LIKE */}
                {artist.singles?.length > 0 && (
                    <View style={{ marginTop: 28 }}>

                        <View style={{ paddingHorizontal: 16, fontSize: 30, backgroundColor: '' }} className='py-1 flex-row items-center justify-between'>
                            <Text style={{ fontSize: 20 }} className='text-white tracking-tight font-bold'>Fans Might Also Like</Text>
                            <MaterialIcons name="arrow-forward-ios" color="rgba(255,255,255,0.6)" size={16} />
                        </View>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 6, gap: 0 }}>
                            {artist.singles.map((single, i) => (
                                <TouchableOpacity
                                    key={single.browseId || i}
                                    onPress={() => router.push(`/album/${single.browseId}`)}
                                    activeOpacity={0.7}
                                    style={{ backgroundColor: 'rgba(255,255,255,0)', padding: 9, borderRadius: height * 0.008, width: height * 0.22 }}>

                                    <View className='items-center justify-center gap-2'>
                                        <Image
                                            source={{ uri: single.thumbnails?.[0]?.url }}
                                            style={{ width: height * 0.20, height: height * 0.20, borderRadius: height * 1, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }} />
                                        <Text style={{ fontSize: 15, color: 'white' }} className='tracking-tight font-medium'>{single.title}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                )}


            </Animated.ScrollView>
        </View>
    );
}