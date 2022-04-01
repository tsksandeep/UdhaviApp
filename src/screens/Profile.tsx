import React from 'react';
import { View } from 'react-native';
import ProfileMain from '../components/ProfileMain/ProfileMain';
import contactData from '../mockData/contact.json';

const Profile = () => {
  return (
    <View>
      <ProfileMain {...contactData} />
    </View>
  );
};

export default Profile;
