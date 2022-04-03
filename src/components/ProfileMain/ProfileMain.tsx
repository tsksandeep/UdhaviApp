import React from 'react';
import { Card, Icon } from 'react-native-elements';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from 'react-native';
import * as Linking from 'expo-linking';

import Button from '../../components/Button/Button';
import Email from '../Email/Email';
import Tel from '../Tel/Tel';
import ProfileMainStyles from './ProfileMain.style';

type profileMainProps = {
  avatar: string;
  avatarBackground: string;
  name: string;
  address: { city: string; country: string };
  emails: { email: string; id: number; name: string };
  tels: { id: number; name: string; number: string };
};

const ProfileMain = (props: profileMainProps) => {
  const onPressPlace = async (location: string) => {
    const url = Platform.select({
      ios: `http://maps.google.com/?q=${location}`,
      android: `http://maps.google.com/?q=${location}`,
    });

    const supported = await Linking.canOpenURL(url!);
    if (supported) {
      return null;
    }

    return Linking.openURL(url!);
  };

  const onPressTel = async (number: string) => {
    const supported = await Linking.canOpenURL(`tel://${number}`);
    if (supported) {
      return null;
    }

    return Linking.openURL(`tel://${number}`);
  };

  const onPressSms = async (number: string) => {
    const supported = await Linking.canOpenURL(`sms://${number}`);
    if (supported) {
      return null;
    }

    return Linking.openURL(`sms://${number}`);
  };

  const onPressEmail = async (email: string) => {
    const supported = await Linking.canOpenURL(
      `mailto://${email}?subject=subject&body=body`,
    );
    if (supported) {
      return null;
    }

    return Linking.openURL(`mailto://${email}?subject=subject&body=body`);
  };

  const renderHeader = () => {
    const {
      avatar,
      name,
      address: { city, country },
    } = props;

    return (
      <View style={ProfileMainStyles.headerContainer}>
        <View style={ProfileMainStyles.headerBackgroundImage}>
          <View style={ProfileMainStyles.headerColumn}>
            <Image
              style={ProfileMainStyles.userImage}
              source={{ uri: avatar }}
            />
            <Text style={ProfileMainStyles.userNameText}>{name}</Text>
            <TouchableOpacity
              onPress={() => onPressPlace(city + ',' + country)}
            >
              <View style={ProfileMainStyles.userAddressRow}>
                <View>
                  <Icon
                    name="place"
                    underlayColor="transparent"
                    iconStyle={ProfileMainStyles.placeIcon}
                  />
                </View>
                <View style={ProfileMainStyles.userCityRow}>
                  <Text style={ProfileMainStyles.userCityText}>
                    {city}, {country}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderTel = () => (
    <>
      <View style={ProfileMainStyles.cardHeading}>
        <Text style={ProfileMainStyles.cardHeadingText}>Contact</Text>
      </View>
      <FlatList
        contentContainerStyle={ProfileMainStyles.telContainer}
        data={props.tels}
        renderItem={(list) => {
          const { id, name, number } = list.item;

          return (
            <Tel
              key={`tel-${id}`}
              index={list.index}
              name={name}
              number={number}
              onPressSms={onPressSms}
              onPressTel={onPressTel}
            />
          );
        }}
      />
    </>
  );

  const renderEmail = () => (
    <>
      <View style={ProfileMainStyles.cardHeading}>
        <Text style={ProfileMainStyles.cardHeadingText}>Email</Text>
      </View>
      <FlatList
        contentContainerStyle={ProfileMainStyles.emailContainer}
        data={props.emails}
        renderItem={(list) => {
          const { email, id, name } = list.item;

          return (
            <Email
              key={`email-${id}`}
              index={list.index}
              name={name}
              email={email}
              onPressEmail={onPressEmail}
            />
          );
        }}
      />
    </>
  );

  const renderLogout = () => {
    return (
      <Button style={ProfileMainStyles.logoutButton} onPress={() => {}}>
        Logout
      </Button>
    );
  };

  return (
    <ScrollView
      style={ProfileMainStyles.scroll}
      keyboardShouldPersistTaps="always"
    >
      <View style={ProfileMainStyles.container}>
        <Card containerStyle={ProfileMainStyles.cardContainer}>
          {renderHeader()}
          {renderTel()}
          {renderEmail()}
          {renderLogout()}
        </Card>
      </View>
    </ScrollView>
  );
};

export default ProfileMain;
