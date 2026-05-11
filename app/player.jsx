import { MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function PlayerPage() {
  const router = useRouter();
  const { title, artist } = useLocalSearchParams();

  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);
  const [volume, setVolume] = useState(1.0);

  const repeatIcons = ['repeat', 'repeat', 'repeat-one'];

  useEffect(() => {
    loadAudio();
    return () => {
      if (sound) sound.unloadAsync();
    };
  }, []);

  const loadAudio = async () => {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
    });

    const { sound: loaded } = await Audio.Sound.createAsync(
      require('../assets/audio/bs.mp3'), // 👈 your audio file
      { shouldPlay: false, volume: 1.0 },
      (status) => {
        if (!status.isLoaded) return;
        setPosition(status.positionMillis / 1000);
        setDuration(status.durationMillis / 1000 || 1);
        setIsPlaying(status.isPlaying);
        if (status.didJustFinish) {
          status.setPositionAsync(0);
          setIsPlaying(false);
        }
      }
    );
    setSound(loaded);
  };

  const togglePlay = async () => {
    if (!sound) return;
    isPlaying ? await sound.pauseAsync() : await sound.playAsync();
  };

  const onSeek = async (val) => {
    if (!sound) return;
    await sound.setPositionAsync(val * 1000);
  };

  const onVolumeChange = async (val) => {
    setVolume(val);
    if (sound) await sound.setVolumeAsync(val);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <View className="flex-1 bg-[#121212] px-5 pt-12 pb-10 justify-between">

      {/* HEADER */}
      <View className="flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="keyboard-arrow-down" size={32} color="rgba(255,255,255,0.7)" />
        </TouchableOpacity>
        <View className="items-center">
          <Text className="text-white/50 text-[1.2vh] tracking-widest">NOW PLAYING</Text>
          <Text className="text-white font-bold text-[1.5vh]">{title}</Text>
        </View>
        <MaterialIcons name="more-vert" size={24} color="rgba(255,255,255,0.6)" />
      </View>

      {/* ARTWORK */}
      <View className="w-full items-center mt-6">
        <View className="w-[45vh] h-[45vh] rounded-[1.2vh] overflow-hidden">
          <Image
            source={require('../assets/images/d.png')}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        </View>
      </View>

      {/* SONG INFO */}
      <View className="flex-row items-center justify-between mt-5">
        <View>
          <Text className="text-white font-poppins-semibold text-[2.2vh] tracking-tight">
            {title}
          </Text>
          <View className="flex-row items-center gap-1 mt-0.5">
            <MaterialIcons name="explicit" size={14} color="rgba(255,255,255,0.5)" />
            <Text className="text-white/50 text-[1.5vh]">{artist}</Text>
          </View>
        </View>
        <MaterialIcons
          name={isFav ? 'favorite' : 'favorite-border'}
          size={26}
          color={isFav ? '#f87171' : 'rgba(255,255,255,0.5)'}
          onPress={() => setIsFav(p => !p)}
        />
      </View>

      {/* SEEK BAR */}
      <View className="mt-3">
        <Slider
          minimumValue={0}
          maximumValue={duration}
          value={position}
          onSlidingComplete={onSeek}
          minimumTrackTintColor="#ffffff"
          maximumTrackTintColor="#ffffff25"
          thumbTintColor="#ffffff"
        />
        <View className="flex-row justify-between -mt-2">
          <Text className="text-white/40 text-[1.2vh]">{formatTime(position)}</Text>
          <Text className="text-white/40 text-[1.2vh]">{formatTime(duration)}</Text>
        </View>
      </View>

      {/* CONTROLS */}
      <View className="flex-row items-center justify-between px-2 mt-1">
        <TouchableOpacity onPress={() => setIsShuffle(p => !p)}>
          <MaterialIcons
            name="shuffle"
            size={24}
            color={isShuffle ? '#1DB954' : 'rgba(255,255,255,0.4)'}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onSeek(Math.max(0, position - 10))}>
          <MaterialIcons name="replay-10" size={36} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={togglePlay}
          style={{
            width: 68,
            height: 68,
            borderRadius: 34,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MaterialIcons
            name={isPlaying ? 'pause' : 'play-arrow'}
            size={38}
            color="#121212"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onSeek(Math.min(duration, position + 10))}>
          <MaterialIcons name="forward-10" size={36} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setRepeatMode(p => (p + 1) % 3)}>
          <MaterialIcons
            name={repeatIcons[repeatMode]}
            size={24}
            color={repeatMode > 0 ? '#1DB954' : 'rgba(255,255,255,0.4)'}
          />
        </TouchableOpacity>
      </View>

      {/* VOLUME */}
      <View className="flex-row items-center gap-3">
        <MaterialIcons name="volume-mute" size={20} color="rgba(255,255,255,0.4)" />
        <View className="flex-1">
          <Slider
            minimumValue={0}
            maximumValue={1}
            value={volume}
            onValueChange={onVolumeChange}
            minimumTrackTintColor="#ffffff"
            maximumTrackTintColor="#ffffff25"
            thumbTintColor="#ffffff"
          />
        </View>
        <MaterialIcons name="volume-up" size={20} color="rgba(255,255,255,0.4)" />
      </View>

    </View>
  );
}