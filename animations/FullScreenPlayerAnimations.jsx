import { Animated } from 'react-native';

const DURATION = 200;

export const pressInAnimation = ({ widthAnim }) => {
  Animated.timing(widthAnim, {
    toValue: 90,
    duration: DURATION,
    useNativeDriver: false,
  }).start();
};

export const pressOutAnimation = ({ widthAnim }) => {
  Animated.timing(widthAnim, {
    toValue: 70,
    duration: DURATION,
    useNativeDriver: false,
  }).start();
};

export const playButtonPressIn = ({
  leftWidth,
  rightWidth,
  playScale,
}) => {
  Animated.parallel([
    Animated.timing(leftWidth, {
      toValue: 50,
      duration: DURATION,
      useNativeDriver: false,
    }),

    Animated.timing(rightWidth, {
      toValue: 50,
      duration: DURATION,
      useNativeDriver: false,
    }),

  ]).start();
};

export const playButtonPressOut = ({
  leftWidth,
  rightWidth,
  playScale,
}) => {
  Animated.parallel([
    Animated.timing(leftWidth, {
      toValue: 70,
      duration: DURATION,
      useNativeDriver: false,
    }),

    Animated.timing(rightWidth, {
      toValue: 70,
      duration: DURATION,
      useNativeDriver: false,
    }),

  ]).start();
};

export const toggleSongInfoAnimation = ({
  slideAnim,
  open,
  setOpen,
}) => {
  Animated.timing(slideAnim, {
    toValue: open ? -60 : 0,
    duration: 220,
    useNativeDriver: true,
  }).start();

  setOpen(!open);
};