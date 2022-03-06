import React from 'react';
import { View, Text } from 'react-native';
import { CategoryType } from '../CategoryList/CategoryList.modal';
import { MaterialIcons } from '@expo/vector-icons';
import { css } from '@emotion/native';

const Category = ({ categoryData }: { categoryData: CategoryType }) => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="account-circle" size={40} color="black" />
      <Text>{categoryData.name}</Text>
    </View>
  );
};

const styles = {
  container: css`
    width: 100px;
    margin: 10px;
    padding: 10px 0;
    align-items: center;
    background: #dfe6e9;
    border-radius: 30px;
  `,
};

export default Category;
