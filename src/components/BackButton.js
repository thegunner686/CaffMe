import React from 'react';
import MaterialIcon from '@expo/vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';

const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      className="flex h-10 w-10 items-center justify-center rounded-full bg-dark-space-cadet bg-opacity-50"
      onPress={onPress}
    >
      <MaterialIcon name="chevron-left" color="#FDFFFC" size={24} />
    </TouchableOpacity>
  );
};

export default BackButton;
