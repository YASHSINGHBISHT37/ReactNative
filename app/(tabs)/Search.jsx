// app/(tabs)/search.jsx
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { searchMusic } from '../../services/musicApi';
import { usePlayerStore } from '../../store/playerStore';

const FILTERS = [
  { id: 'song', label: 'Top Songs' },
  { id: 'artists', label: 'Artists' },
  { id: 'albums', label: 'Albums' },
  { id: 'songs', label: 'Songs' },
  { id: 'videos', label: 'Videos' },
  { id: 'playlists', label: 'Playlists' },
];

const SearchResultItem = ({ item }) => {
  const { setCurrentSong, setStreamUrl, setCurrentSongId } = usePlayerStore();

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

  const handlePress = () => {
    if (item.type === 'artist' && item.browseId) {
      router.push(`/artist/${item.browseId}`);
    } else if (item.browseId) {
      router.push(`/album/${item.browseId}`);
    } else if (item.videoId) {
      playSong(item);
    }
  };

  const isArtist = item.type === 'artist';

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#121212' }}
      activeOpacity={0.7}
    >
      {item.thumbnail ? (
        <Image
          source={{ uri: item.thumbnail }}
          style={{
            width: 58, height: 58,
            borderRadius: isArtist ? 100 : 6,  // circle for artists
            marginRight: 12,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.05)'
          }}
          resizeMode="cover"
        />
      ) : (
        <View style={{ width: 52, height: 52, borderRadius: isArtist ? 26 : 6, marginRight: 12, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name={isArtist ? 'person' : 'musical-note'} size={22} color="rgba(255,255,255,01)" />
        </View>
      )}

      <View style={{ flex: 1 }}>

        <Text className='font-medium  tracking-tigh' numberOfLines={1} style={{ color: 'white', fontSize: 16, }}>
          {item.title || item.name || item.artist}
        </Text>
        <View style={{ gap: isArtist ? 0 : 2 }} className='flex-row items-center'>

          <MaterialIcons name={isArtist ? '' : 'explicit'} size={12} color="rgba(255,255,255,0.6)" />

          <View className='flex-row items-center justify-center gap-1' style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: -1 }}>
            <Text numberOfLines={1} style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>{isArtist ? 'Artist' : item.artist || 'Music'}</Text>
            {!isArtist && (
              <View style={{ width: 2, height: 2, backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: 20 }}></View>
            )}
            <Text numberOfLines={1} style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>{item.year ? `${item.year}` : ''}</Text>
          </View>

        </View>
      </View>

      <TouchableOpacity style={{ padding: 8 }} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
        <Ionicons name="ellipsis-vertical" size={18} color="rgba(255,255,255,1)" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const Genre = () => (
  <View>
    
  </View>
)

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('songs');

  const { data, isLoading, error } = useQuery({
    queryKey: ['search', query, activeFilter],
    queryFn: () => searchMusic(query, activeFilter),
    enabled: !!query && query.trim().length > 0,  // wait for 3+ chars
    staleTime: 1000 * 60 * 5,
  });

  return (
    <View style={{ flex:1, backgroundColor: '#121212' }}>

      {/* Search Bar */}
      <View style={{ paddingHorizontal: 16, paddingTop: 52, paddingBottom: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 100, paddingHorizontal: 14, borderWidth: 0, borderColor: 'rgba(255,255,255,0.2)' }}>
          <Ionicons name="arrow-back" size={18} color="rgba(255,255,255,1)" />
          <TextInput
            placeholder="Songs, albums, artists..."
            placeholderTextColor="rgba(255,255,255,0.3)"
            value={query}
            onChangeText={setQuery}
            style={{ flex: 1, color: 'white', paddingVertical: 14, paddingHorizontal: 10, fontSize: 16 }}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close" size={20} color="rgba(255,255,255,0.5)" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter Tabs */}
<ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={{
    paddingHorizontal: 16,
    gap: 8,
  }}
>
  {FILTERS.map((filter) => (
    <TouchableOpacity
      key={filter.id}
      onPress={() => setActiveFilter(filter.id)}
      style={{
        paddingHorizontal: 12,
        borderRadius: 40,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:
          activeFilter === filter.id ? '#fff' : 'rgba(255,255,255,0.1)',
      }}
    >
      <Text
        style={{
          color: activeFilter === filter.id ? '#000' : '#fff',
          fontSize: 14,
          fontWeight: '500',
        }}
      >
        {filter.label}
      </Text>
    </TouchableOpacity>
  ))}
</ScrollView>

      {/* Results */}
      <FlatList
        data={data || []}
        keyExtractor={(item, index) => item.browseId || item.videoId || `result-${index}`}
        renderItem={({ item }) => <SearchResultItem item={item} />}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingTop: 8, paddingBottom: 120 }}
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center', paddingTop: 60 }}>
            {query.trim().length === 0 ? (
              <>
                <View className="w-fullflex flex-col items-center justify-center">
                  <Text style={{ color: 'rgba(255,255,255,1)', fontSize: 18 }} className="font-bold tracking-tight">Play what you love</Text>
                  <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }} className="tracking-tight">Search for artists, songs, albums and more.</Text>
                </View>
              </>
            ) : isLoading ? (
              <>
                {/* <ActivityIndicator size="large" color="white" /> */}
                <Text style={{ color: 'rgba(255,255,255,0.4)', marginTop: 12 }}>Searching...</Text>
              </>
            ) : error ? (
              <Text style={{ color: 'rgba(255,100,100,0.8)', fontSize: 14 }}>{error.message}</Text>
            ) : (
              <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 15 }}>No results found</Text>
            )}
          </View>
        )}
      />

    </View>
  );
}