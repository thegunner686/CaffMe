import React from 'react';
import { FlatList, View, Text, Dimensions } from 'react-native';
import { getToday } from '../hooks/useCaffeineHistory';

const width = Dimensions.get('window').width;

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const getFormattedMonthDay = (date) => {
  const [month, day, year] = date.split('/');
  return `${months[month - 1]} ${day}`;
};

const IngestionList = ({ history }) => {
  const renderItem = ({ item }) => (
    <View
      className="ml-2 mr-2 flex h-24 w-32 flex-col items-center justify-between rounded bg-dark-space-cadet p-1"
      style={{
        shadowColor: '#FDFFFC',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
        elevation: 5,
      }}
    >
      <Text className="text-xs font-bold text-shadow-blue">
        {item.date === getToday() ? 'TODAY' : getFormattedMonthDay(item.date)}
      </Text>
      <Text className="text-3xl font-bold text-baby-powder">{item.caffeine}mg</Text>
      <Text className="text-xs text-baby-powder">{item.time}</Text>
    </View>
  );

  return (
    <View className="w-full">
      <Text className="ml-2 text-lg text-baby-powder">Your Caffeine History</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal={true}
        style={{ width }}
        className="pt-2 pb-2"
      />
    </View>
  );
};

export default IngestionList;
