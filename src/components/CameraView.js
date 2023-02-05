import { Camera } from 'expo-camera';
import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import MaterialIcon from '@expo/vector-icons/MaterialIcons';

const CameraView = ({ onCapture }) => {
  const cameraRef = useRef(null);

  const takePicture = async () => {
    const photo = await cameraRef.current.takePictureAsync({ imageType: 'jpg' });
    onCapture(photo);
  };

  return (
    <Camera style={styles.camera} ref={cameraRef}>
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
