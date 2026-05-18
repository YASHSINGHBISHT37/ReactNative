import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { useEffect, useState } from 'react';

import axios from 'axios';
import AlbumHeader from '../../features/album/components/AlbumHeader';
import SongList from '../../features/album/components/SongList';
import { useAlbum } from '../../features/album/hooks/useAlbum';

export default function AlbumScreen() {



  const router = useRouter();
  const { browseId } = useLocalSearchParams();

  const { data: album, isLoading, error } = useAlbum(browseId);
  const [currentSongId, setCurrentSongId] = useState(null);
  const [showBg, setShowBg] = useState(false);

  // AlbumScreen mein
  useEffect(() => {
    if (album?.songs) {
      // Pehle 3 songs prefetch karo
      album.songs.slice(0, 3).forEach(song => {
        axios.get(`http://192.168.1.8:8000/player/stream/${song.videoId}`)
          .catch(() => { }); // errors ignore karo
      });
    }
  }, [album])

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }


  return (
    <View className="flex-1 bg-black">
      {/* HEADER */}
      <View className="absolute top-0 pt-14 left-0 right-0 flex-row items-center justify-between px-4 p-4 z-10" style={{ backgroundColor: showBg ? 'black' : 'transparent' }}>
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

      <SongList
        songs={album?.songs ?? []}
        currentSongId={currentSongId}
        setCurrentSongId={setCurrentSongId}  // 👈 yeh pass karo
        ListHeaderComponent={() => <AlbumHeader album={album} />}  // 👈 header bhi
        onScroll={(event) => {
          const y = event.nativeEvent.contentOffset.y;
          if (y >= 320 && !showBg) setShowBg(true);
          if (y < 300 && showBg) setShowBg(false);
        }}
      />
    </View>
  );
}