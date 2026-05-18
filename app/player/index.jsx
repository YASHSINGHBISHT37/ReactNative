import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import FullScreenPlayer from '../../features/player/components/FullScreenPlayer';

const { height } = Dimensions.get('window');

export default function PlayerScreen() {
  const router = useRouter();
  const translateY = useSharedValue(height);

  useEffect(() => {
    translateY.value = withSpring(0, {
      damping: 20,
      stiffness: 90,
      mass: 1,
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      // Sirf neeche jaane do
      if (e.translationY > 0) {
        translateY.value = e.translationY;
      }
    })
    .onEnd((e) => {
      if (e.translationY > height * 0.25) {
        // 25% neeche gaya — close karo
        translateY.value = withSpring(height, {
          damping: 20,
          stiffness: 90,
        }, () => {
          // Animation khatam — screen band karo
          runOnJS(router.back)();
        });
      } else {
        // Wapas upar
        translateY.value = withSpring(0, {
          damping: 20,
          stiffness: 90,
        });
      }
    });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[{ flex: 1 }, animatedStyle]}>
          <FullScreenPlayer />
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}