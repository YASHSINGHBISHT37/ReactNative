import { create } from 'zustand';

export const usePlayerStore = create((set, get) => ({
  currentSong: null,
  currentSongId: null,
  streamUrl: null,
  isPlaying: false,
  _player: null,
  queue: [],        // ✅ saare songs
  queueIndex: 0,   // ✅ abhi kaunsa song chal raha hai

  setCurrentSong: (song) => set({ currentSong: song }),
  setCurrentSongId: (id) => set({ currentSongId: id }),
  setStreamUrl: (url) => set({ streamUrl: url }),
  setIsPlaying: (val) => set({ isPlaying: val }),
  setPlayer: (p) => set({ _player: p }),

  // ✅ Queue set karo aur pehla song play karo
  setQueue: (songs, startIndex = 0) => {
    set({ queue: songs, queueIndex: startIndex });
  },

  // ✅ Next song — last song pe related fetch hoga
  playNext: async () => {
    const { queue, queueIndex, _player } = get();
    const nextIndex = queueIndex + 1;

    if (nextIndex < queue.length) {
      // Queue mein agle song hain
      const nextSong = queue[nextIndex];
      set({ queueIndex: nextIndex });
      get().playSongFromQueue(nextSong);
    } else {
      // Last song tha — related songs fetch karo
      const currentSong = queue[queueIndex];
      if (!currentSong?.videoId) return;

      try {
        const res = await fetch(`http://192.168.1.8:8000/player/related/${currentSong.videoId}`);
        const data = await res.json();
        if (data.songs?.length > 0) {
          set({ queue: data.songs, queueIndex: 0 });
          get().playSongFromQueue(data.songs[0]);
        }
      } catch (err) {
        console.error('Related fetch error:', err);
      }
    }
  },

  // ✅ Prev song
  playPrev: () => {
    const { queue, queueIndex } = get();
    const prevIndex = queueIndex - 1;
    if (prevIndex >= 0) {
      const prevSong = queue[prevIndex];
      set({ queueIndex: prevIndex });
      get().playSongFromQueue(prevSong);
    }
  },

  // ✅ Song play karo — SongList jaisi logic
  playSongFromQueue: async (song) => {
    try {
      set({ currentSongId: song.videoId, currentSong: song });
      const res = await fetch(`http://192.168.1.8:8000/player/stream/${song.videoId}`);
      const data = await res.json();
      set({ streamUrl: data.stream_url });
    } catch (err) {
      console.error('Queue play error:', err);
    }
  },

  togglePlay: () => {
    const { _player, isPlaying } = get();
    if (!_player) return;
    if (isPlaying) {
      _player.pause();
      set({ isPlaying: false });
    } else {
      _player.play();
      set({ isPlaying: true });
    }
  },
}));