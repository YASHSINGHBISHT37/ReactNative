import { MaterialIcons } from '@expo/vector-icons';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack, usePathname, useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FullScreenPlayer from '../components/FullScreenPlayer';
import MiniPlayer from '../components/MiniPlayer';
import "../global.css";
import { queryClient } from '../services/queryClient';

const TABS = [
  { name: '(tabs)/index', route: '/', icon: 'home-filled', label: 'Home' },
  { name: '(tabs)/search', route: '/search', icon: 'search', label: 'Search' },
  { name: '(tabs)/Insights', route: '/Library', icon: 'library-music', label: 'Library' },
  { name: '(tabs)/Settings', route: '/Settings', icon: 'settings', label: 'Settings' },
  { name: '(tabs)/insight', route: '/insights', icon: 'insight', label: 'Settings' },
];

function CustomTabBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      height: 60, backgroundColor: 'black',
      flexDirection: 'row', alignItems: 'center',
      zIndex: 100,
    }}>
      {TABS.map(tab => {
        const active = pathname === tab.route || pathname.startsWith(tab.route + '/');
        return (
          <TouchableOpacity
            key={tab.name}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 2 }}
            onPress={() => router.push(tab.route)}
          >
            <MaterialIcons
              name={tab.icon}
              size={26}
              color={active ? 'white' : 'rgba(255,255,255,0.45)'}
            />
            <Text style={{ fontSize: 9, color: active ? 'white' : 'rgba(255,255,255,0.45)' }}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'black' } }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="album/[browseId]" options={{ headerShown: false }} />
        </Stack>

        {/* MiniPlayer*/}
        <View style={{ position: 'absolute', bottom: 62, left: 0, right: 0, paddingHorizontal: 16, zIndex: 99 }}>
          <MiniPlayer song={{ title: 'Charcoal Baby', artist: 'Don Toliver' }} />
        </View>

        {/* FullScreenPlayer*/}
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10000, width: '100%',height:'100%', paddingHorizontal: 0}}>
          <FullScreenPlayer song={{ title: 'Savage Mode II',name:'Runnin', artist: '21 Savage, Metro Boomin' }} />
        </View>


        {/* Tab bar — always visible on every screen */}
        <CustomTabBar />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}