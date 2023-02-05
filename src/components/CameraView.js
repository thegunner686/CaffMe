import { Camera } from 'expo-camera';
import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import MaterialIcon from '@expo/vector-icons/MaterialIcons';

const CameraView = ({ onCapture, goBack }) => {
  const cameraRef = useRef(null);

  const takePicture = async () => {
    const photo = await cameraRef.current.takePictureAsync({ imageType: 'jpg' });
    onCapture(photo);
  };

  return (
    <Camera style={styles.camera} ref={cameraRef}>
      <TouchableOpacity
        className="absolute left-5 top-16 flex h-10 w-10 items-center justify-center rounded-full bg-dark-space-cadet bg-opacity-50"
        onPress={goBack}
      >
        <MaterialIcon name="chevron-left" color="#FDFFFC" size={24} />
      </TouchableOpacity>
      <TouchableOpacity
        className="absolute bottom-16 flex h-24 w-24 flex-row items-center justify-center self-center rounded-full bg-baby-powder shadow shadow-dark-space-cadet"
        onPress={takePicture}
      >
        <MaterialIcon name="camera-alt" size={36} />
      </TouchableOpacity>
    </Camera>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
});

export default CameraView;
