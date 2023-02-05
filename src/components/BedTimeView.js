import React from 'react';
import { Text, View, Image, Button } from 'react-native';

const BedTimeView = ({ time }) => {
  return (
    <View className="flex w-full flex-row justify-center rounded p-4 pl-8">
      <Image style={{ height: 90, width: 75 }} source={require('../../assets/moon.png')} />
      <View style={{ paddingLeft: 10, paddingRight: 20 }}>
        <Text className="text-sm font-bold text-shadow-blue">SLEEP HEALTH</Text>
        <Text className="text-4xl font-extrabold text-baby-powder">{time} hours</Text>
        <Text className="text-sm text-shadow-blue">
          Until your caffeine levels are low enough to get optimal sleep quality
        </Text>
      </View>
    </View>
  );
};
export default BedTimeView;
