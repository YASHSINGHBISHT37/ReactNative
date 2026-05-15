import { MaterialIcons } from '@expo/vector-icons';
import { Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';
import PlayingIndicator from '../../../components/PlayingIndicator';

const { height } = Dimensions.get('window');

const SongItem = ({ song, index, currentSongId, onPress }) => {
  const isPlaying = currentSongId === song.id;

  return (
    <TouchableOpacity
      className="w-full flex-row items-center justify-between gap-4 p-3 px-4 active:bg-white/20 relative bg-black"
      onPress={() => onPress(song.id)}
    >
      {/* Track Number / Playing Indicator */}
      <View style={{ width: 20, alignItems: 'center' }}>
        {isPlaying ? (
          <PlayingIndicator isPlaying={isPlaying} />
        ) : (
          <Text className="text-white/60">{index + 1}</Text>
        )}
      </View>

      {/* Song Info */}
      <View className="flex-1 w-full" style={{ gap: 1 }}>
        <Text className="text-white w-full" numberOfLines={1} style={{ fontSize: height * 0.018 }}>{song.title}</Text>

        <View className="flex-row items-center">
          {song.isExplicit && (
            <MaterialIcons color="rgba(255,255,255,0.6)" style={{ marginRight: 3.5 }} name="explicit" size={13} />
          )}
          <Text className="text-white/60" style={{ fontSize: height * 0.014 }}>{song.artist}</Text>
        </View>
      </View>

      {/* More Options */}
      <TouchableOpacity onPress={(e) => e.stopPropagation()}>
        <MaterialIcons name="more-vert" color="rgba(255,255,255,0.7)" size={20} />
      </TouchableOpacity>

    </TouchableOpacity>
  );
};

const SongList = ({ songs, currentSongId }) => {
  return (
    <View className="flex-1">
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <SongItem song={item} index={index} currentSongId={currentSongId} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        style={{
        }}

        ListFooterComponent={() => (
          <Text className='bg-white text-white'>
            sdbSADSA
          </Text>
        )}
      />
    </View>
  );
};

export { SongItem };
export default SongList;