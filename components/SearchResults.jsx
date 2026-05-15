// features/search/components/SearchResults.jsx
import { router } from 'expo-router';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

const ResultItem = ({ item, type }) => {
  const handlePress = () => {
    if (type === 'album' || item.browseId) {
      router.push(`/album/${item.browseId}`);
    }
  };

  return (
    <TouchableOpacity 
      onPress={handlePress}
      className="flex-row items-center p-4 bg-white/5 mx-4 mb-2 rounded-lg"
    >
      {item.thumbnail && (
        <Image
          source={{ uri: item.thumbnail }}
          className="w-16 h-16 rounded-lg mr-4"
        />
      )}
      <View className="flex-1">
        <Text className="text-white font-semibold text-base" numberOfLines={1}>
          {item.title || item.name}
        </Text>
        <Text className="text-white/60 text-sm mt-1" numberOfLines={1}>
          {item.artist || item.description || 'Music'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const SearchResults = ({ results, isLoading }) => {
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-white/60">Searching...</Text>
      </View>
    );
  }

  if (!results || results.length === 0) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-white/60">No results found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={results}
      keyExtractor={(item, index) => `${item.browseId || item.id || index}`}
      renderItem={({ item }) => <ResultItem item={item} />}
      scrollEnabled={false}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
};