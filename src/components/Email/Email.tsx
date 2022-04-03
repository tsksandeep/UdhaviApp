import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import EmailStyles from './Email.style';

const Email = ({
  containerStyle,
  onPressEmail,
  name,
  email,
  index,
}: {
  containerStyle: any;
  onPressEmail: Function;
  name: string;
  email: string;
  index: number;
}) => (
  <TouchableOpacity onPress={() => onPressEmail(email)}>
    <View style={[EmailStyles.container, containerStyle]}>
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
        <Icon
          name="email"
          underlayColor="transparent"
          iconStyle={EmailStyles.emailIcon}
          onPress={() => onPressEmail()}
        />
      </View>
    </View>
  </TouchableOpacity>
);

export default Email;
