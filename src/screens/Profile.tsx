import React from 'react';
import { View } from 'react-native';
import ProfileMain from '../components/ProfileMain/ProfileMain';
import contactData from '../mockData/contact.json';
import MenuBar from '../components/MenuBar/MenuBar';
import { css } from '@emotion/native';

const Profile = () => {
  return (
    <View style={ProfileStyle.container}>
      <MenuBar showBackButton={true} showContainerShadow />
      <ProfileMain {...contactData} />
    </View>
  );
};

const ProfileStyle = {
  container: css`
    width: 100%;
    flex: 1;
    background: #fdf6e4;
  `,
};

export default Profile;
