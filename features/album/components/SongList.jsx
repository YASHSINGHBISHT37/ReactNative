import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';
import PlayingIndicator from '../../../components/PlayingIndicator';
import { usePlayerStore } from '../../../store/playerStore';

const { height } = Dimensions.get('window');

const SongItem = ({ song, index, currentSongId, isPlaying: globalIsPlaying, onPress }) => {
  const isCurrentSong = currentSongId === song.videoId;
  const isPlaying = isCurrentSong && globalIsPlaying;

  return (
    <TouchableOpacity
      style={{ paddingHorizontal: 16, }}
      activeOpacity={1}
      onPress={() => onPress(song)}
    >
      <View
        style={{overflow:'', borderRadius: 30, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.1)', padding: 10,paddingHorizontal:14  }}
        className="flex-row items-center justify-between gap-4"
      >
        <View style={{ width: 20, alignItems: 'center' }}>
          {isCurrentSong ? (
            <PlayingIndicator isPlaying={isPlaying} />
          ) : (
            <Text className="text-white/60">{index + 1}</Text>
          )}
        </View>

        <View className="flex-1 w-full" style={{ gap: 1 }}>
          <Text className="text-white w-full" numberOfLines={1} style={{ fontSize: height * 0.018 }}>
            {song.title}
          </Text>
          <View className="flex-row items-center">
            {song.isExplicit && (
              <MaterialIcons color="rgba(255,255,255,0.6)" style={{ marginRight: 3.5 }} name="explicit" size={13} />
            )}
            <Text className="text-white/60" style={{ fontSize: height * 0.014 }}>{song.artist}</Text>
            <Text className="text-white/60" style={{ fontSize: height * 0.014 }}>{song.duration}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={(e) => e.stopPropagation()}>
          <MaterialIcons name="more-vert" color="rgba(255,255,255,0.7)" size={20} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const SongList = ({ songs, ListHeaderComponent, onScroll }) => {
  const { setCurrentSong, setStreamUrl, setCurrentSongId, currentSongId, isPlaying, setQueue } = usePlayerStore();

  const playSong = async (song) => {
    try {
      // ✅ Poora album queue mein daalo, clicked song se shuru
      const clickedIndex = songs.findIndex(s => s.videoId === song.videoId);
      setQueue(songs, clickedIndex);

      setCurrentSongId(song.videoId);
      const { data } = await axios.get(`http://192.168.1.8:8000/player/stream/${song.videoId}`);
      setCurrentSong(song);
      setStreamUrl(data.stream_url);
    } catch (err) {
      console.error('Play error:', err.message);
    }
  };

  return (
    <View className="flex-1">
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <SongItem
            song={item}
            index={index}
            currentSongId={currentSongId}
            isPlaying={isPlaying}
            onPress={playSong}
          />
        )}
        ListHeaderComponent={ListHeaderComponent}
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      />
    </View>
  );
};

export { SongItem };
export default SongList;