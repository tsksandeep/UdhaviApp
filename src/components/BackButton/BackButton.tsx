import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TouchableOpacity, Image, ImageStyle } from 'react-native';
import { css, ReactNativeStyle } from '@emotion/native';
import BackButtonIcon from '../../assets/images/arrow_back.png';

const BackButton = ({ styles }: { styles?: ReactNativeStyle }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles}>
      <Image
        style={BackButtonStyleComponent.image as ImageStyle}
        source={BackButtonIcon}
      />
    </TouchableOpacity>
  );
};

const BackButtonStyleComponent = {
  image: css`
    width: 35px;
    height: 35px;
  `,
};

export default BackButton;
