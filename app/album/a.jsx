import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import About from '../../features/album/components/About';
import AlbumHeader from '../../features/album/components/AlbumHeader';
import SongList from '../../features/album/components/SongList';
import { useAlbum } from '../../features/album/hooks/useAlbum';

export default function AlbumScreen() {
  const router = useRouter();
  const { browseId } = useLocalSearchParams();
  const { data: album, isLoading, error } = useAlbum(browseId);
  const [activeTab, setActiveTab] = useState('songs');

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator size="large" color="#1db954" />
        <Text className="text-white/60 mt-4">Loading album....</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-black px-4">
        <Text className="text-red-400 text-lg mb-2">Error</Text>
        <Text className="text-white/60 text-center">{error.message}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      {/* Back Button */}
      <TouchableOpacity 
        onPress={() => router.back()}
        className="p-4 z-10"
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Album Header */}
        <AlbumHeader album={album} />

        {/* Tabs */}
        <View className="flex-row border-b border-white/10 px-4 mt-4">
          <TouchableOpacity
            onPress={() => setActiveTab('songs')}
            className={`pb-3 mr-6 ${activeTab === 'songs' ? 'border-b-2 border-white' : ''}`}
          >
            <Text className={`font-semibold ${activeTab === 'songs' ? 'text-white' : 'text-white/40'}`}>
              Songs
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab('about')}
            className={`pb-3 ${activeTab === 'about' ? 'border-b-2 border-white' : ''}`}
          >
            <Text className={`font-semibold ${activeTab === 'about' ? 'text-white' : 'text-white/40'}`}>
              About
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === 'songs' ? (
          <SongList songs={album.songs} />
        ) : (
          <About album={album} />
        )}
      </ScrollView>
    </View>
  );
}