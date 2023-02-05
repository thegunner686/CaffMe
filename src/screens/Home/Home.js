import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BedTimeView from '../../components/BedTimeView';
import CaffeineGraph from '../../components/CaffeineGraph';
import IngestionList from '../../components/IngestionList';
import { useCaffeineHistory } from '../../hooks/useCaffeineHistory';
import { useHistoryChange } from '../../hooks/useHistoryChanges';
import { StatusBar } from 'expo-status-bar';
import RDAView from '../../components/RDAView';
import MaterialIcon from '@expo/vector-icons/MaterialIcons';
import { auth } from '../../utils/firebase';
import { signOut } from 'firebase/auth';

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
  const [hoursToRest, setHoursToRest] = useState(0);

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
      let curr = Math.floor(graphData.datasets[0].data[hour]);
      setCurrentCaffeineLevel(curr);

      for (let i = 0; true; i++) {
        let test = decayFunction(i * 1.5, hour, curr);
        if (test <= 50) {
          setHoursToRest(i);
          break;
        }
      }
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
      <StatusBar style="light" />
      <TouchableOpacity
        className="absolute top-16 right-3 flex h-10 w-10 items-center justify-center rounded-full  bg-opacity-50"
        onPress={() => signOut(auth)}
      >
        <MaterialIcon name="logout" color="#FDFFFC" size={32} />
      </TouchableOpacity>
      <View className="flex flex-col items-center justify-center">
        <Text className="text-sm text-shadow-blue">Current Caffeine Level</Text>
        <Text className="text-4xl font-extrabold text-baby-powder">{currentCaffeineLevel}mg</Text>
      </View>
      {currentCaffeineLevel >= 400 ? <RDAView /> : null}
      <CaffeineGraph data={graphData} />
      <IngestionList history={history} />
      <BedTimeView time={hoursToRest} />
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
