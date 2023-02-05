import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CylinderSlider from '../../components/CylinderSlider';
import VerticalSlider from 'rn-vertical-slider';
import { addCaffeineEntry } from '../../hooks/useCaffeineHistory';
import { useHistoryChange } from '../../hooks/useHistoryChanges';
import BackButton from '../../components/BackButton';

const AddCaffeineScreen = ({ navigation }) => {
  const [level, setLevel] = useState(0);
  const [caffeine, setCaffeine] = useState(0);
  const [color, setColor] = useState('#FDFFFC');
  const [triggerRefresh] = useHistoryChange((state) => [state.triggerRefresh]);

  useEffect(() => {
    let max = 500;
    let caff = max * (level / 100);
    setCaffeine(caff);

    if (caff < 200) {
      setColor('#FDFFFC');
    } else if (caff < 300) {
      setColor('#FFE156');
    } else {
      setColor('#D66853');
    }
  }, [level, setColor]);

  return (
    <SafeAreaView className="flex flex-1 flex-col items-center justify-end bg-space-cadet">
      <View className="h-2/12 justify-betwee flex w-full flex-row items-center">
        <View className="flex flex-shrink items-center justify-center p-2">
          <BackButton onPress={() => navigation.navigate('Home')} />
        </View>
        <Text
          className="flex-grow self-center pt-4 text-center text-5xl font-bold  text-baby-powder"
          style={{ color }}
        >
          {caffeine}mg
        </Text>
        <View className="flex-shrink p-2">
          <View className="h-10 w-10"></View>
        </View>
      </View>
      <View className="h-11/12 items-cente flex w-full flex-grow flex-row justify-center">
        <View className="flex h-full w-9/12 items-center justify-center">
          <CylinderSlider level={level} />
        </View>
        <View className="flex-shrink items-center justify-center p-2">
          <VerticalSlider
            value={level}
            disabled={false}
            min={0}
            max={100}
            onChange={setLevel}
            onComplete={setLevel}
            width={50}
            height={300}
            step={1}
            borderRadius={5}
            minimumTrackTintColor={'#FDFFFC'}
            maximumTrackTintColor={'#1E202E'}
          />
        </View>
      </View>
      <View className="h-2/12 mb-2 w-full items-center">
        <TouchableOpacity
          className="flex h-12 w-9/12 flex-col items-center justify-center rounded bg-ocean-green shadow-sm shadow-dark-space-cadet"
          onPress={async () => {
            await addCaffeineEntry({ caffeine });
            triggerRefresh();
            navigation.navigate('Home');
          }}
        >
          <Text className="text-center text-lg font-bold text-baby-powder">Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddCaffeineScreen;
