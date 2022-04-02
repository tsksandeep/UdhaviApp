import React from 'react';
import { Card, Icon } from 'react-native-elements';
import {
  FlatList,
  Image,
  ImageBackground,
  Linking,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Email from '../Email/Email';
import Separator from '../Separator/Separator';
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

const Contact = (props: profileMainProps) => {
  const onPressPlace = () => {
    console.log('place');
  };

  const onPressTel = (number: string) => {
    Linking.openURL(`tel://${number}`).catch((err) =>
      console.log('Error:', err),
    );
  };

  const onPressSms = () => {
    console.log('sms');
  };

  const onPressEmail = (email: string) => {
    Linking.openURL(`mailto://${email}?subject=subject&body=body`).catch(
      (err) => console.log('Error:', err),
    );
  };

  const renderHeader = () => {
    const {
      avatar,
      avatarBackground,
      name,
      address: { city, country },
    } = props;

    return (
      <View style={ProfileMainStyles.headerContainer}>
        <ImageBackground
          style={ProfileMainStyles.headerBackgroundImage}
          blurRadius={10}
          source={{ uri: avatarBackground }}
        >
          <View style={ProfileMainStyles.headerColumn}>
            <Image
              style={ProfileMainStyles.userImage}
              source={{ uri: avatar }}
            />
            <Text style={ProfileMainStyles.userNameText}>{name}</Text>
            <View style={ProfileMainStyles.userAddressRow}>
              <View>
                <Icon
                  name="place"
                  underlayColor="transparent"
                  iconStyle={ProfileMainStyles.placeIcon}
                  onPress={onPressPlace}
                />
              </View>
              <View style={ProfileMainStyles.userCityRow}>
                <Text style={ProfileMainStyles.userCityText}>
                  {city}, {country}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };

  const renderTel = () => (
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
  );

  const renderEmail = () => (
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
  );

  return (
    <ScrollView
      style={ProfileMainStyles.scroll}
      keyboardShouldPersistTaps="always"
    >
      <View style={ProfileMainStyles.container}>
        <Card containerStyle={ProfileMainStyles.cardContainer}>
          {renderHeader()}
          {renderTel()}
          {Separator()}
          {renderEmail()}
        </Card>
      </View>
    </ScrollView>
  );
};

export default Contact;
