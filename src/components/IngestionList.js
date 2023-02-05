import React from 'react';
import { FlatList, View, Text, Dimensions } from 'react-native';
import { getToday } from '../hooks/useCaffeineHistory';
import Animated, { FadeInLeft, FadeIn, withEase } from 'react-native-reanimated';

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
  const renderItem = ({ item, index }) => {
    return (
      <Animated.View
        entering={FadeInLeft.duration(500 + 500 * index)}
        className="ml-2 mr-2 flex h-24 w-32 flex-col items-center justify-between rounded bg-dark-space-cadet p-1"
        style={{
          shadowColor: '#FDFFFC',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 5,
        }}
      >
        <Text className="text-xs font-bold text-shadow-blue">
          {item.date === getToday() ? 'TODAY' : getFormattedMonthDay(item.date)}
        </Text>
        <Text className="text-3xl font-bold text-baby-powder">{parseInt(item.caffeine)}mg</Text>
        <Text className="text-xs text-baby-powder">{item.time}</Text>
      </Animated.View>
    );
  };

  return (
    <Animated.View entering={FadeIn.duration(1000)} className="w-full">
      <Text className="ml-2 text-lg text-baby-powder">Your Caffeine History</Text>
      {history && history.length > 0 ? (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          horizontal={true}
          style={{ width }}
          className="pt-2 pb-2"
        />
      ) : (
        <Text className="font-regular ml-3 text-shadow-blue">No history yet</Text>
      )}
    </Animated.View>
  );
};

export default IngestionList;
