import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import TelStyles from './Tel.style';

const Tel = ({
  index,
  name,
  number,
  onPressSms,
  onPressTel,
}: {
  index: number;
  name: string;
  number: string;
  onPressSms: Function;
  onPressTel: Function;
}) => {
  return (
    <View style={TelStyles.container}>
      <View style={TelStyles.telRow}>
        <View style={TelStyles.telNumberColumn}>
          <Text style={TelStyles.telNumberText}>{number}</Text>
        </View>
        <View style={TelStyles.telNameColumn}>
          {name.length !== 0 && (
            <Text style={TelStyles.telNameText}>{name}</Text>
          )}
        </View>
      </View>
      <View style={TelStyles.iconRow}>
        <TouchableOpacity onPress={() => onPressTel(number)}>
          <FontAwesome name="phone" size={24} style={TelStyles.telIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPressSms(number)}>
          <MaterialCommunityIcons
            name="message"
            size={24}
            style={TelStyles.smsIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Tel;
