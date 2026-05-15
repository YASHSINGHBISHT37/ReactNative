import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming } from 'react-native-reanimated';

const Bar = ({ delay, isPlaying }) => {
  const barHeight = useSharedValue(4);

  useEffect(() => {
    if (isPlaying) {
      barHeight.value = withDelay(delay, withRepeat(
        withTiming(14, { duration: 540 }), -1, true
      ));
    } else {
      barHeight.value = withTiming(4);
    }
  }, [isPlaying]);

  const style = useAnimatedStyle(() => ({
    height: barHeight.value,
  }));

  return (
    <Animated.View style={[{ width: 2.4, backgroundColor: 'white', borderRadius: 1, marginHorizontal: 1.4 }, style]} />
  );
};

const PlayingIndicator = ({ isPlaying }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 16,backgroundColor:'' }}>
      <Bar delay={0} isPlaying={isPlaying} />
      <Bar delay={150} isPlaying={isPlaying} />
      <Bar delay={300} isPlaying={isPlaying} />
    </View>
  )
};

export default PlayingIndicator;