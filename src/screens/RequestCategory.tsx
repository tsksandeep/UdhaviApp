import React from 'react';
import { View } from 'react-native';
import { css } from '@emotion/native';
import MenuBar from '../components/MenuBar/MenuBar';
import GroupList from '../components/GroupList/GroupList';

const RequestCategory = (props: any) => {
  return (
    <View style={RequestStyle.container}>
      <MenuBar showBackButton={true} />
      <GroupList />
    </View>
  );
};

const RequestStyle = {
  container: css`
    width: 100%;
    flex: 1;
    padding: 24px;
    background: #fdf6e4;
  `,
};

export default RequestCategory;
