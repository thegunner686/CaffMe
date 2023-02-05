import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CaffeineGraph from '../../components/CaffeineGraph';
import IngestionList from '../../components/IngestionList';
import { useCaffeineHistory } from '../../hooks/useCaffeineHistory';

const getFormattedHour = (hour) => {
  let res = '';
  if (hour < 12) {
    res = `${hour + 1}:00am`;
  } else if (hour == 12) {
    res = `12:00pm`;
  } else {
    res = `${hour - 12}:00pm`;
  }
  return res;
};

const decayFunction = (currentHour, ingestHour, ingestAmount) => {
  return ingestAmount * Math.exp((Math.log(1 / 2) / 5) * (currentHour - ingestHour));
};

const labels = [
  '',
  '',
  '',
  '',
  '',
  '',
  '5:00am',
  '',
  '',
  '',
  '',
  '',
  '12:00pm',
  '',
  '',
  '',
  '',
  '',
  '7:00pm',
  '',
  '',
  '',
  '',
  '',
];

const HomeScreen = ({ navigation }) => {
  const { history, refreshHistory } = useCaffeineHistory();
  const [graphData, setGraphData] = useState({ labels: [], datasets: [{ data: [] }] });
  const [currentCaffeineLevel, setCurrentCaffeineLevel] = useState(0);

  useEffect(() => {
    if (graphData?.datasets && graphData.datasets[0].data.length > 0) {
      let hour = new Date().getHours();
      setCurrentCaffeineLevel(Math.floor(graphData.datasets[0].data[hour]));
    }
  }, [graphData]);

  useEffect(() => {
    let data = [];
    for (let i = 0; i < 24; i++) {
      data.push(0);
    }
    let now = new Date().getHours();
    for (const entry of history) {
      let { hour, caffeine } = entry;
      data[hour] += parseInt(caffeine);
      for (let i = hour + 1; i < 24; i++) {
        data[i] += parseInt(decayFunction(i, hour, caffeine));
      }
    }
    setGraphData({
      labels,
      datasets: [
        {
          data,
        },
      ],
    });
  }, [history]);

  return (
    <SafeAreaView className="flex flex-1 flex-col items-center bg-space-cadet">
      <View className="flex flex-col items-center justify-center">
        <Text className="text-sm text-shadow-blue">Current Caffeine Level</Text>
        <Text className="text-4xl font-extrabold text-baby-powder">{currentCaffeineLevel}mg</Text>
      </View>
      <CaffeineGraph data={graphData} />
      <IngestionList history={history} />
      <TouchableOpacity
        className="flex h-12 w-7/12 flex-col items-center justify-center rounded bg-ocean-green"
        onPress={refreshHistory}
      >
        <Text className="text-center text-lg font-bold text-baby-powder">Refresh</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex h-12 w-7/12 flex-col items-center justify-center rounded bg-ocean-green"
        onPress={() => navigation.navigate('AddCaffeine')}
      >
        <Text className="text-center text-lg font-bold text-baby-powder">Add Caffeine Entry</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;
