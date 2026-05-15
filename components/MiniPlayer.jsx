import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';


export default function MiniPlayer({ song }) {
    const [isPlaying, setIsPlaying] = useState(false)

    return (
        <View className='bg-black' style={{ borderRadius: 100, overflow: 'hidden' }}>
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
                    <View style={{ width: 46, height: 46, borderRadius: 100, backgroundColor: '#2a2a2a' }} />

                    <View style={{ flex: 1, gap: 2 }}>
                        <Text numberOfLines={1} style={{ color: 'white', fontSize: 14, fontWeight: '500' }}>
                            {song?.title ?? 'Charcoal Baby'}
                        </Text>
                        <Text numberOfLines={1} style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12 }}>
                            {song?.artist ?? 'Don Toliver'}
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
                        onPress={() => setIsPlaying(p => !p)}
                    >
                        <MaterialIcons name={isPlaying ? 'pause' : 'play-arrow'} color="white" size={26} />
                    </TouchableOpacity>
                </View>

            </BlurView>
        </View>
    )
}