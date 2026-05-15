// app/(tabs)/search.jsx
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { searchMusic } from '../../services/musicApi';

const FILTERS = [
  { id: 'songs', label: 'Top result' },
  { id: 'songs', label: 'Songs' },
  { id: 'albums', label: 'Albums' },
  { id: 'artists', label: 'Artists' },
  { id: 'playlists', label: 'Playlists' },
];

const SearchResultItem = ({ item }) => {
  const handlePress = () => {
    if (item.browseId) {
      router.push(`/album/${item.browseId}`);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="flex-row items-center p-3 mx-4 mb-2 active:bg-white/5 rounded-lg"
    >
      {item.thumbnail && (
        <Image
          source={{ uri: item.thumbnail }}
          className="rounded-md mr-3"
          style={{ width: 56, height: 56 }}
          resizeMode="cover"
        />
      )}

      <View className="flex-1">
        <Text className="text-white font-semibold text-base" numberOfLines={1}>
          {item.title || item.name}
        </Text>

        <Text className="text-white/60 text-sm mt-1" numberOfLines={1}>
          {item.artist || 'Music'}
        </Text>

        {item.year && (
          <Text className="text-white/40 text-xs mt-0.5">
            {item.year}
          </Text>
        )}
      </View>

      <TouchableOpacity className="p-2">
        <Ionicons name="ellipsis-vertical" size={20} color="rgba(255,255,255,0.4)" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('songs');

  const { data, isLoading, error } = useQuery({
    queryKey: ['search', query, activeFilter],
    queryFn: () => searchMusic(query, activeFilter),
    enabled: !!query && query.trim().length > 0,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <View className="flex-1 bg-black">
      {/* Search Bar */}
      <View className="px-4 pt-12 pb-3 bg-black">
        <View className="flex-row items-center bg-white/10 rounded-full px-4 border border-white/20">
          <Ionicons name="search" size={20} color="rgba(255,255,255,0.6)" />
          <TextInput
            placeholder="Search songs, albums, artists..."
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={query}
            onChangeText={setQuery}
            className="flex-1 text-white py-3 px-3"
            style={{ fontSize: 16, color: 'white' }}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')} className="p-1">
              <Ionicons name="close-circle" size={20} color="rgba(255,255,255,0.6)" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter Tabs - ALWAYS VISIBLE when query exists */}
      {query.trim().length > 0 && (
        <View className="pb-3 bg-black">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
          >
            {FILTERS.map((filter, index) => (
              <TouchableOpacity
                key={`${filter.id}-${index}`}
                onPress={() => {
                  console.log('Filter clicked:', filter.id);
                  setActiveFilter(filter.id);
                }}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 20,
                  backgroundColor: activeFilter === filter.id ? '#fff' : 'rgba(255,255,255,0.1)',
                }}
              >
                <Text
                  style={{
                    color: activeFilter === filter.id ? '#000' : '#fff',
                    fontWeight: '600',
                    fontSize: 14,
                  }}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Results */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {query.trim().length === 0 ? (
          <View className="items-center justify-center flex-1 py-20 px-4">
            <Ionicons name="search" size={80} color="rgba(255,255,255,0.1)" />
            <Text className="text-white/60 text-center text-lg mt-4">
              Search for songs, albums, or artists
            </Text>
          </View>
        ) : isLoading ? (
          <View className="items-center py-10">
            <ActivityIndicator size="large" color="#1db954" />
            <Text className="text-white/60 mt-4">Searching...</Text>
          </View>
        ) : error ? (
          <View className="items-center py-10 px-4">
            <Text className="text-red-400 text-base mb-2">Error</Text>
            <Text className="text-white/60 text-center">{error.message}</Text>
          </View>
        ) : !data || data.length === 0 ? (
          <View className="items-center py-10 px-4">
            <Text className="text-white/60 text-base">No results found</Text>
          </View>
        ) : (
          <View className="pt-2">
            <Text className="text-white/40 text-xs uppercase px-4 mb-3 tracking-wide">
              {activeFilter} • {data.length} {data.length === 1 ? 'Result' : 'Results'}
            </Text>
            <FlatList
              data={data}
              keyExtractor={(item, index) => item.browseId || item.videoId || `result-${index}`}
              renderItem={({ item }) => <SearchResultItem item={item} />}
              scrollEnabled={false}
              contentContainerStyle={{ paddingBottom: 100 }}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}