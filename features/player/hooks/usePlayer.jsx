import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { useEffect } from 'react';
import { usePlayerStore } from '../../../store/playerStore';

export const usePlayer = () => {
  const { streamUrl, setIsPlaying, setPlayer, playNext } = usePlayerStore();
  const player = useAudioPlayer(null);
  const status = useAudioPlayerStatus(player);

  useEffect(() => {
    setPlayer(player);
  }, []);  // ✅ sirf ek baar

  useEffect(() => {
    if (streamUrl) {
      player.replace({ uri: streamUrl });
      player.play();
      setIsPlaying(true);
    }
  }, [streamUrl]);

  useEffect(() => {
    if (status.didJustFinish) {
      playNext();
    }
  }, [status.didJustFinish]);
};