import React from 'react';
import { Text, View, Image } from 'react-native';

const RDAView = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#08130D',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#000',
        paddingVertical: 8,
        marginTop: 5,
        width: '90%',
      }}
      className="flex flex-row items-center justify-center"
    >
      <Image style={{ height: 24, width: 24 }} source={require('../../assets/danger.png')} />
      <View style={{ paddingLeft: 10, paddingRight: 20 }}>
        <Text className="text-lg font-bold text-baby-powder">RDA of 400mg exceeded</Text>
      </View>
    </View>
  );
};
export default RDAView;
