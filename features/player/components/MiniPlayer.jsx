import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router'; // ✅ add karo
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { usePlayerStore } from '../../../store/playerStore';

export default function MiniPlayer({ song }) {
    const { currentSong, isPlaying, togglePlay } = usePlayerStore();
    const router = useRouter();
    if (!currentSong) return null;

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            className='bg-black'
            style={{ borderRadius: 100, overflow: 'hidden' }}
        >
            <BlurView
                style={{
                    height: 64,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 8,
                    borderRadius: 100,
                    borderWidth: 0.5,
                    borderColor: 'rgba(255,255,255,0.2)',
                }}
            // blurType="dark"
            // blurAmount={0}
            // reducedTransparencyFallbackColor="rgba(30,30,30,0.9)"
            >
                {/* Album Art + Info */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1, overflow: 'hidden' }}>
                    <Image className='animate-spin'
                        source={{ uri: currentSong.thumbnail }}
                        style={{ width: 50, height: 50, borderRadius: 100, borderColor: 'rgba(255,255,255,0.2)', borderWidth: 1, }}
                    />

                    <View style={{ flex: 1, gap: 2 }}>
                        <Text numberOfLines={1} style={{ color: 'white', fontSize: 14, fontWeight: '500' }}>
                            {currentSong.title}
                        </Text>
                        <Text numberOfLines={1} style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12 }}>
                            {currentSong.artist}
                        </Text>
                    </View>
                </View>

                {/* Controls */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <TouchableOpacity style={{
                        width: 38, height: 38, borderRadius: 38,
                        borderWidth: 1.2, borderColor: 'rgba(255,255,255,0.6)',
                        alignItems: 'center', justifyContent: 'center',
                    }}>
                        <MaterialIcons name="add" color="rgba(255,255,255,0.6)" size={24} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ width: 36, height: 36, alignItems: 'center', justifyContent: 'center' }}
                        onPress={togglePlay}
                    >
                        <MaterialIcons name={isPlaying ? 'pause' : 'play-arrow'} color="white" size={26} />
                    </TouchableOpacity>
                </View>

            </BlurView>
        </ TouchableOpacity>
    )
}