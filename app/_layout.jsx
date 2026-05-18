import { usePlayer } from '@/features/player/hooks/usePlayer';
import { MaterialIcons } from '@expo/vector-icons';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack, usePathname, useRouter } from 'expo-router';
import { Dimensions, Text, TouchableOpacity } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FullScreenPlayer from '../features/player/components/FullScreenPlayer';
import MiniPlayer from '../features/player/components/MiniPlayer';
import "../global.css";
import { queryClient } from '../services/queryClient';
import { usePlayerStore } from '../store/playerStore';

const { height } = Dimensions.get('window');
const MINI_PLAYER_HEIGHT = 64;
const TAB_BAR_HEIGHT = 60;
const MINI_PLAYER_BOTTOM = TAB_BAR_HEIGHT + 12;

const TABS = [
  { name: '(tabs)/index', route: '/', icon: 'home-filled', label: 'Home' },
  { name: '(tabs)/search', route: '/search', icon: 'search', label: 'Search' },
  { name: '(tabs)/Insights', route: '/Library', icon: 'library-music', label: 'Library' },
  { name: '(tabs)/Settings', route: '/Settings', icon: 'settings', label: 'Settings' },
];

function CustomTabBar({ opacity }) {
  const router = useRouter();
  const pathname = usePathname();

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: interpolate(opacity.value, [0, 1], [20, 0]) }],
  }));

  return (
    <Animated.View style={[{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      height: TAB_BAR_HEIGHT, backgroundColor: 'black',
      flexDirection: 'row', alignItems: 'center',
      zIndex: 100,
    }, animatedStyle]}>
      {TABS.map(tab => {
        const active = pathname === tab.route || pathname.startsWith(tab.route + '/');
        return (
          <TouchableOpacity
            key={tab.name}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 2 }}
            onPress={() => router.push(tab.route)}
          >
            <MaterialIcons name={tab.icon} size={26} color={active ? 'white' : 'rgba(255,255,255,0.45)'} />
            <Text style={{ fontSize: 9, color: active ? 'white' : 'rgba(255,255,255,0.45)' }}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
}

function PlayerSheet() {
  const { currentSong } = usePlayerStore();
  const translateY = useSharedValue(0); // 0 = mini, -height = full

  // MiniPlayer opacity — 0 jab full screen, 1 jab mini
  const miniOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(translateY.value, [-height * 0.3, 0], [0, 1]),
  }));

  // FullPlayer — sirf jab full screen ho tab touch lo
  const fullOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(translateY.value, [-height * 0.3, -height * 0.1], [1, 0]),
  }));

  // ✅ Alag se pointerEvents handle karo
  const fullPointerStyle = useAnimatedStyle(() => ({
    pointerEvents: translateY.value < -height * 0.2 ? 'auto' : 'none',
  }));

  // Tab bar opacity
  const tabOpacity = useSharedValue(1);
  const tabStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateY.value, [-height * 0.2, 0], [0, 1]),
  }));

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      const newVal = translateY.value + e.changeY;
      translateY.value = Math.max(-height, Math.min(0, newVal));
      tabOpacity.value = interpolate(translateY.value, [-height * 0.2, 0], [0, 1]);
    })
    .onEnd((e) => {
      if (e.velocityY < -500 || translateY.value < -height * 0.3) {
        // Open full screen
        translateY.value = withSpring(-height, { damping: 20, stiffness: 90 });
        tabOpacity.value = withSpring(0);
      } else {
        // Back to mini
        translateY.value = withSpring(0, { damping: 20, stiffness: 90 });
        tabOpacity.value = withSpring(1);
      }
    });

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    pointerEvents: translateY.value < -10 ? 'auto' : 'box-none', // ✅ box-none = sheet touch nahi block karta
  }));

  const tabBarStyle = useAnimatedStyle(() => ({
    opacity: tabOpacity.value,
    pointerEvents: tabOpacity.value < 0.1 ? 'none' : 'auto',
  }));

  if (!currentSong) return null;

  return (
    <>

      {/* Player Sheet */}
      <GestureDetector gesture={gesture}>
        <Animated.View style={[{
          position: 'absolute',
          bottom: MINI_PLAYER_BOTTOM,
          left: 0,
          right: 0,
          height: height + MINI_PLAYER_HEIGHT,
          zIndex: 200,
        }, sheetStyle]}
          pointerEvents="box-none"  // ✅ yeh add karo
        >

          {/* FullScreen Player — upar */}
          <Animated.View style={[{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: height,
          }, fullOpacity]}>
            <FullScreenPlayer />
          </Animated.View>

          {/* MiniPlayer — neeche */}
          <Animated.View style={[{
            position: 'absolute',
            bottom: 0,
            left: 16,
            right: 16,
            height: MINI_PLAYER_HEIGHT,
          }, miniOpacity]}>
            <MiniPlayer gesture={gesture} />
          </Animated.View>

        </Animated.View>
      </GestureDetector>
    </>
  );
}

export default function RootLayout() {
  usePlayer();

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: true, contentStyle: { backgroundColor: 'black' } }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="album/[browseId]" options={{ headerShown: false }} />
            <Stack.Screen name="artist/[channelId]" options={{ headerShown: false }} />
          </Stack>

          {/* ✅ Tab bar hamesha dikhega */}
          <CustomTabBar opacity={useSharedValue(1)} />

          {/* PlayerSheet — sirf jab song chal raha ho */}
          <PlayerSheet />

        </GestureHandlerRootView>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}