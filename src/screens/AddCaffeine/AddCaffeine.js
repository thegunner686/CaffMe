import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CylinderSlider from '../../components/CylinderSlider';
import VerticalSlider from 'rn-vertical-slider';
import { addCaffeineEntry } from '../../hooks/useCaffeineHistory';
import { useHistoryChange } from '../../hooks/useHistoryChanges';
import BackButton from '../../components/BackButton';
import MaterialIcon from '@expo/vector-icons/MaterialIcons';
import { Camera, CameraType, takePictureAsync } from 'expo-camera';
import CameraView from '../../components/CameraView';
import { getPrediction } from '../../utils/tf';
import { encode, decode } from 'uint8-to-base64';
import * as FileSystem from 'expo-file-system';

const AddCaffeineScreen = ({ navigation }) => {
  const [level, setLevel] = useState(0);
  const [caffeine, setCaffeine] = useState(0);
  const [color, setColor] = useState('#FDFFFC');
  const [triggerRefresh] = useHistoryChange((state) => [state.triggerRefresh]);
  const [imageTextResult, setImageTextResult] = useState('');
  const [selectedOption, setSelectedOption] = useState('mg');
  const [mgfloz, setMgfloz] = useState(9.7);
  const [oz, setOz] = useState(0);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);

  useEffect(() => {
    let max = selectedOption === 'floz' ? 40 : 500;
    let caff =
      selectedOption === 'floz' ? mgfloz * Math.floor((level / 100) * max) : (level / 100) * max;
    setCaffeine(caff);
    setOz(Math.floor((level / 100) * max));
  }, [level, setColor, selectedOption]);

  const openCamera = async () => {
    const perm = await requestPermission();
    if (perm && perm.granted) {
      setShowCamera(true);
    }
  };

  const onPictureCapture = async (picture) => {
    console.log({ picture });
    setShowCamera(false);

    // const model = await getModel();
    //get the image data here

    let imageData;
    let res;
    try {
      res = await FileSystem.readAsStringAsync(picture.uri, { encoding: 'base64' });
      // const imageUri = picture.uri;

      // const response = await fetch(imageUri, {}, { isBinary: true });
      // const imageDataArrayBuffer = await response.arrayBuffer();
      // imageData = new Uint8Array(imageDataArrayBuffer);
    } catch (error) {
      // console.log('transform step');
      console.error(error);
    }

    try {
      const result = await getPrediction(res);
      const data = await result.json();
      // console.log({ data });
    } catch (error) {
      // console.log('fetch step');
      console.error(error);
    }

    // const imageTensor = decodeJpeg(imageData);
    // const prediction = (await model.predict(imageTensor))[0];
  };

  return showCamera ? (
    <CameraView onCapture={onPictureCapture} />
  ) : (
    <SafeAreaView className="flex flex-1 flex-col items-center justify-end bg-space-cadet">
      <View className="h-1/12 absolute left-0 top-10 w-full flex-row items-center justify-between">
        <View className="flex flex-shrink items-center justify-center p-2">
          <BackButton onPress={() => navigation.navigate('Home')} />
        </View>
        <Text
          className="flex-grow self-center pt-4 text-center text-5xl font-bold  text-baby-powder"
          style={{ color }}
        >
          {selectedOption === 'floz' ? oz : caffeine}
          {selectedOption === 'floz' ? ' oz' : ' mg'}
        </Text>
        <View className="flex-shrink p-2">
          <TouchableOpacity
            className="flex flex-row items-center justify-center rounded-full bg-dark-space-cadet p-2"
            onPress={openCamera}
          >
            <MaterialIcon name="camera-alt" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="absolute top-24 mt-2 flex w-full flex-col items-center justify-center ">
        <View className="flex w-full flex-row items-center justify-center">
          <TouchableOpacity
            onPress={() => setSelectedOption('mg')}
            className={
              'm-2 ml-4 flex h-10 w-36 items-center justify-center rounded-lg ' +
              (selectedOption === 'mg'
                ? 'bg-ocean-green text-baby-powder'
                : 'border border-ocean-green')
            }
          >
            <Text
              className={
                'text-lg font-bold ' +
                (selectedOption === 'mg' ? 'text-baby-powder' : 'text-ocean-green')
              }
            >
              Use mg
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={
              'm-2 ml-4 flex h-10 w-36 items-center justify-center rounded-lg ' +
              (selectedOption === 'floz'
                ? 'bg-ocean-green text-baby-powder'
                : 'border border-ocean-green text-ocean-green')
            }
            onPress={() => setSelectedOption('floz')}
          >
            <Text
              className={
                'text-lg font-bold ' +
                (selectedOption === 'floz' ? 'text-baby-powder' : 'text-ocean-green')
              }
            >
              Use fl oz
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="justify-cente relative -top-24 flex w-full flex-row items-center">
        <View className=" flex h-96 flex-grow items-center justify-center">
          <CylinderSlider level={level} yerbOnly={selectedOption === 'floz'} />
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
      <View className="h-2/12 mb-8 w-full items-center">
        <TouchableOpacity
          className="flex h-12 w-9/12 flex-col items-center justify-center rounded bg-ocean-green shadow-sm shadow-dark-space-cadet"
          onPress={async () => {
            if (caffeine == 0) return;
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
