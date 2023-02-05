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

const CylinderSlider = ({ level }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (level < 33) {
      setIndex(0);
    } else if (level < 67) {
      setIndex(1);
    } else {
      setIndex(2);
    }
  }, [level]);

  const height = useDerivedValue(() => {
    return level / 100;
  }, [level]);

  const imageStyle = useAnimatedStyle(() => {
    return { transform: [{ scale: withSpring(height.value) }], width: withSpring(level * 3) };
  }, [level]);

  const images = [
    require('../../assets/Latte.png'),
    require('../../assets/Coffee.png'),
    require('../../assets/Yerb.png'),
  ];

  return (
    <Animated.Image
      source={images[index]}
      style={[{ resizeMode: 'contain', alignSelf: 'center' }, imageStyle]}
    />
  );
};

export default CylinderSlider;
