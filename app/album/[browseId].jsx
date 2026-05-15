import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { useState } from 'react';

import AlbumHeader from '../../features/album/components/AlbumHeader';
import { SongItem } from '../../features/album/components/SongList';
import { useAlbum } from '../../features/album/hooks/useAlbum';

export default function AlbumScreen() {

  const router = useRouter();
  const { browseId } = useLocalSearchParams();

  const { data: album, isLoading, error } = useAlbum(browseId);
  const [currentSongId, setCurrentSongId] = useState(null);

  const [showBg, setShowBg] = useState(false);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator size="large" color="#1db954" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">

      {/* HEADER */}
      <View className="absolute top-0 pt-14 left-0 right-0 flex-row items-center justify-between px-4 p-4 z-10" style={{ backgroundColor: showBg ? 'black' : 'transparent', }}>
        <View className='flex-row gap-4 items-center'>

          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={26} color="white" />
          </TouchableOpacity>

          {showBg && (
            <Text style={{ fontSize: 20 }} className='text-white font-medium tracking-tighter' numberOfLines={1}>
              {album?.name}
            </Text>
          )}
        </View>

        <View className="flex-row items-center gap-6">
          <MaterialIcons name="share" size={24} color="white" />
          <MaterialIcons name="more-vert" size={24} color="white" />
        </View>

      </View>

      <FlatList
        data={album?.songs ?? []}  // ✅ safe access
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        onScroll={(event) => {
          const y = event.nativeEvent.contentOffset.y;
          if (y >= 320 && !showBg) setShowBg(true);
          if (y < 300 && showBg) setShowBg(false);
        }}
        scrollEventThrottle={16}
        style={{ paddingBottom: 200 }}
        contentContainerStyle={{ paddingBottom: 100 }}


        ListHeaderComponent={() => <AlbumHeader album={album} />}

        renderItem={({ item, index }) => (
          <SongItem
            song={item}
            index={index}
            currentSongId={currentSongId}
            onPress={(id) => setCurrentSongId(id)}  // ✅ click pe set hoga
          />
        )}

      />

    </View>
  );
}