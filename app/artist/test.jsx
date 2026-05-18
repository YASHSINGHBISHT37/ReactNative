import { MaterialIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { usePlayerStore } from '../../store/playerStore';

const { height, width } = Dimensions.get('window');
const HEADER_HEIGHT = height * 0.45;

export default function ArtistScreen() {
    const { channelId } = useLocalSearchParams();
    const router = useRouter();
    const { setCurrentSong, setStreamUrl, setCurrentSongId } = usePlayerStore();

    const { data: artist, isLoading } = useQuery({
        queryKey: ['artist', channelId],
        queryFn: async () => {
            const { data } = await axios.get(`http://192.168.1.8:8000/artist/${channelId}`);
            return data;
        }
    });

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

    if (isLoading) return (
        <View style={{ flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: 'white' }}>Loading...</Text>
        </View>
    );

    if (!artist) return null;

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>

            {/* ✅ Image fixed — scroll ke bahar */}
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: HEADER_HEIGHT }}>
                <Image source={{ uri: artist.thumbnail }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                <BlurView intensity={20} tint="dark" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
                <Image source={{ uri: artist.thumbnail }} style={{ width: '100%', height: '100%', position: 'absolute' }} resizeMode="cover" />
                <LinearGradient colors={['transparent', 'black']} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: height * 0.2 }} />

                {/* Back button */}
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={{ position: 'absolute', top: 50, left: 16, width: 36, height: 36, borderRadius: 36, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' }}
                >
                    <MaterialIcons name="arrow-back" size={22} color="white" />
                </TouchableOpacity>

                {/* Artist Info */}
                <View style={{ position: 'absolute', bottom: 16, left: 20, right: 20 }}>
                    <Text style={{ color: 'white', fontSize: height * 0.045, fontWeight: '800', letterSpacing: -1 }} numberOfLines={1}>
                        {artist.name}
                    </Text>
                    <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 2 }}>
                        {artist.subscribers || artist.monthlyListeners}
                    </Text>
                </View>
            </View>

            {/* ✅ Content — image ke upar scroll hoga */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 140, paddingTop: HEADER_HEIGHT }}
            >
                {/* TOP SONGS */}
                {artist.songs?.length > 0 && (
                    <View style={{ marginTop: 24, paddingHorizontal: 16 }}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: '700', marginBottom: 12 }}>Top Songs</Text>
                        {artist.songs.slice(0, 5).map((song, index) => (
                            <TouchableOpacity
                                key={song.videoId || index}
                                onPress={() => playSong(song)}
                                style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8 }}
                            >
                                <Text style={{ color: 'rgba(255,255,255,0.4)', width: 20, textAlign: 'center' }}>{index + 1}</Text>
                                <Image source={{ uri: song.thumbnails?.[0]?.url }} style={{ width: 44, height: 44, borderRadius: 4 }} />
                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: 'white', fontSize: 14, fontWeight: '500' }} numberOfLines={1}>{song.title}</Text>
                                    <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }} numberOfLines={1}>{song.views}</Text>
                                </View>
                                <MaterialIcons name="more-vert" color="rgba(255,255,255,0.5)" size={20} />
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {/* ALBUMS */}
                {artist.albums?.length > 0 && (
                    <View style={{ marginTop: 28 }}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: '700', marginBottom: 12, paddingHorizontal: 16 }}>Albums</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}>
                            {artist.albums.map((album, i) => (
                                <TouchableOpacity
                                    key={album.browseId || i}
                                    onPress={() => router.push(`/album/${album.browseId}`)}
                                    style={{ width: width * 0.38 }}
                                >
                                    <Image source={{ uri: album.thumbnails?.[0]?.url }} style={{ width: width * 0.38, height: width * 0.38, borderRadius: 6 }} />
                                    <Text style={{ color: 'white', fontSize: 13, fontWeight: '600', marginTop: 6 }} numberOfLines={1}>{album.title}</Text>
                                    <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>{album.year}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                )}

                {/* SINGLES */}
                {artist.singles?.length > 0 && (
                    <View style={{ marginTop: 28 }}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: '700', marginBottom: 12, paddingHorizontal: 16 }}>Singles</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}>
                            {artist.singles.map((single, i) => (
                                <TouchableOpacity
                                    key={single.browseId || i}
                                    onPress={() => router.push(`/album/${single.browseId}`)}
                                    style={{ width: width * 0.38 }}
                                >
                                    <Image source={{ uri: single.thumbnails?.[0]?.url }} style={{ width: width * 0.38, height: width * 0.38, borderRadius: 100 }} />
                                    <Text style={{ color: 'white', fontSize: 13, fontWeight: '600', marginTop: 6 }} numberOfLines={1}>{single.title}</Text>
                                    <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>{single.year}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                )}

                {/* DESCRIPTION */}
                {artist.description && (
                    <View style={{ marginTop: 28, paddingHorizontal: 16 }}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: '700', marginBottom: 8 }}>About</Text>
                        <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, lineHeight: 20 }} numberOfLines={4}>
                            {artist.description}
                        </Text>
                    </View>
                )}

            </ScrollView>
        </View>
    );
}