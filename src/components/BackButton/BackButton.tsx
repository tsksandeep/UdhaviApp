import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TouchableOpacity, Image, ImageStyle } from 'react-native';
import BackButtonStyleComponent from './BackButton.style';
import { ReactNativeStyle } from '@emotion/native';
import BackButtonIcon from '../../assets/images/arrow_back.png';

const BackButton = ({
  setState,
  styles,
}: {
  setState: any;
  styles?: ReactNativeStyle;
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handlePress = () => {
    if (setState) {
      setState(false);
    } else {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles || BackButtonStyleComponent.container}
    >
      <Image
        style={BackButtonStyleComponent.image as ImageStyle}
        source={BackButtonIcon}
      />
    </TouchableOpacity>
  );
};

export default BackButton;
