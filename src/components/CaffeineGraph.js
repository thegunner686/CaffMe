import React, { useEffect, useState } from 'react';
import { BarChart } from 'react-native-chart-kit';
import { StyleSheet, Dimensions, View, Text } from 'react-native';

const width = Dimensions.get('window').width;

const CaffeineGraph = ({ data }) => {
  const [maxCaffeine, setMaxCaffeine] = useState(0);
  const chartConfig = {
    backgroundGradientFrom: '#08130D',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0,
    fillShadowGradientOpacity: 1,
    color: () => '#D66853', //'#26C485',
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.2,
    decimalPlaces: 0,
    useShadowColorFromDataset: false, // optional
    labelColor: () => '#FDFFFC',
  };

  useEffect(() => {
    if (data?.datasets && data.datasets[0].data.length > 0) {
      let max = 0;
      for (const d of data.datasets[0].data) {
        if (d > max) max = d;
      }
      setMaxCaffeine(max);
    }
  }, [data]);

  return (
    <View className="m-4 h-52 rounded bg-dark-space-cadet pt-2 shadow-sm shadow-dark-space-cadet">
      <Text className="absolute left-2 top-2 font-bold text-baby-powder">{maxCaffeine}mg</Text>
      <View
        className="absolute top-6 self-center rounded border border-dashed border-shadow-blue"
        style={{ height: 1, width: (width / 10) * 9 }}
      ></View>
      <BarChart
        style={styles.graph}
        data={data}
        width={(width / 10) * 9.5}
        height={width / 2}
        chartConfig={chartConfig}
        withInnerLines={false}
        withHorizontalLabels={false}
        yLabelsOffset={0}
        flatColor={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  graph: {
    position: 'relative',
    left: -40,
  },
});

export default CaffeineGraph;
