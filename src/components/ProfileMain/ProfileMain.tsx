import React from 'react';
import { Card } from 'react-native-elements';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Entypo } from '@expo/vector-icons';

import Button from '../../components/Button/Button';
import Email from '../Email/Email';
import Tel from '../Tel/Tel';
import ProfileMainStyles from './ProfileMain.style';
import { FirebaseAuth } from '../../firebase/config';
import {
  onPressEmail,
  onPressPlace,
  onPressSms,
  onPressTel,
} from '../../common/common';

type profileMainProps = {
  avatar: string;
  avatarBackground: string;
  name: string;
  address: { city: string; country: string };
  emails: { email: string; id: number; name: string };
  tels: { id: number; name: string; number: string };
};

const ProfileMain = (props: profileMainProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

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
                  <Entypo
                    name="location-pin"
                    size={24}
                    color="black"
                    style={ProfileMainStyles.placeIcon}
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
      <Button
        style={ProfileMainStyles.logoutButton}
        onPress={async () => {
          await FirebaseAuth.signOut();
          navigation.navigate('Home', { shouldLogout: true });
        }}
      >
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
