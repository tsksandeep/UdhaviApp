import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import TelStyles from './Tel.style';

const Tel = ({
  containerStyle,
  index,
  name,
  number,
  onPressSms,
  onPressTel,
}: {
  containerStyle: any;
  index: number;
  name: string;
  number: string;
  onPressSms: Function;
  onPressTel: Function;
}) => {
  return (
    <TouchableOpacity onPress={() => onPressTel(number)}>
      <View style={[TelStyles.container, containerStyle]}>
        <View style={TelStyles.iconRow}>
          {index === 0 && (
            <Icon
              name="call"
              underlayColor="transparent"
              iconStyle={TelStyles.telIcon}
              onPress={() => onPressTel(number)}
            />
          )}
        </View>
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
        <View style={TelStyles.smsRow}>
          <Icon
            name="textsms"
            underlayColor="transparent"
            iconStyle={TelStyles.smsIcon}
            onPress={() => onPressSms()}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Tel;
