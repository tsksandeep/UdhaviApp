import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import EmailStyles from './Email.style';

const Email = ({
  onPressEmail,
  name,
  email,
  index,
}: {
  onPressEmail: Function;
  name: string;
  email: string;
  index: number;
}) => (
  <View style={EmailStyles.container}>
    <View style={EmailStyles.emailRow}>
      <View style={EmailStyles.emailColumn}>
        <Text style={EmailStyles.emailText}>{email}</Text>
      </View>
      <View style={EmailStyles.emailNameColumn}>
        {name.length !== 0 && (
          <Text style={EmailStyles.emailNameText}>{name}</Text>
        )}
      </View>
    </View>
    <View style={EmailStyles.iconRow}>
      <TouchableOpacity onPress={() => onPressEmail()}>
        <MaterialIcons name="email" size={24} style={EmailStyles.emailIcon} />
      </TouchableOpacity>
    </View>
  </View>
);

export default Email;
