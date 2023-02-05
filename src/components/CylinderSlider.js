import React, { useEffect, useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useDerivedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { TouchableOpacity, Text, View, Image } from 'react-native';

const CylinderSlider = ({ level, yerbOnly = false }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (level < 33) {
      setIndex(0);
    } else if (level < 67) {
      setIndex(1);
    } else if (level < 90) {
      setIndex(2);
    } else {
      setIndex(3);
    }
  }, [level]);

  const height = useDerivedValue(() => {
    return 0.6 + (0.5 * level) / 100;
  }, [level]);

  const imageStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(height.value) }],
      width: withSpring(100 + level),
    };
  }, [level]);

  const images = [
    require('../../assets/Latte.png'),
    require('../../assets/Coffee.png'),
    require('../../assets/Yerb.png'),
    require('../../assets/BigYerb.png'),
  ];

  return (
    <Animated.Image
      source={images[yerbOnly ? 2 : index]}
      style={[{ resizeMode: 'contain', alignSelf: 'center' }, imageStyle]}
    />
  );
};

export default CylinderSlider;
