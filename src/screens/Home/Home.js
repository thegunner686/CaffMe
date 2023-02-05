import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CaffeineGraph from '../../components/CaffeineGraph';
import IngestionList from '../../components/IngestionList';
import { useCaffeineHistory } from '../../hooks/useCaffeineHistory';
import { useHistoryChange } from '../../hooks/useHistoryChanges';

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
  const [date, setDate] = useState(new Date());
  const { history, refreshHistory } = useCaffeineHistory(date);
  const [graphData, setGraphData] = useState({ labels: [], datasets: [{ data: [] }] });
  const [currentCaffeineLevel, setCurrentCaffeineLevel] = useState(0);
  const [historyChange] = useHistoryChange((state) => [state.historyChange]);

  useEffect(() => {
    let d = new Date();
    d.setDate(d.getDate() - 1);
    setDate(d);
  }, []);

  useEffect(() => {
    refreshHistory();
  }, [historyChange]);

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
        className="mt-4 flex h-12 w-9/12 flex-col items-center justify-center rounded bg-ocean-green shadow-sm shadow-dark-space-cadet"
        onPress={() => navigation.navigate('AddCaffeine')}
      >
        <Text className="text-center text-lg font-bold text-baby-powder ">Add Caffeine Intake</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;
