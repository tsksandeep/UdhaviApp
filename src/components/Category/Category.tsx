import React from 'react';
import { Text, Pressable } from 'react-native';
import { CategoryType } from '../CategoryList/CategoryList.modal';
import { MaterialIcons } from '@expo/vector-icons';
import { css } from '@emotion/native';

const Category = ({
  categoryData,
  setShowGroupedList,
}: {
  categoryData: CategoryType;
  setShowGroupedList: any;
}) => {
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        if (categoryData.name === 'More') {
          setShowGroupedList(true);
        }
      }}
    >
      <MaterialIcons name="account-circle" size={40} color="black" />
      <Text>{categoryData.name}</Text>
    </Pressable>
  );
};

const styles = {
  container: css`
    width: 27%;
    margin: 10px;
    padding: 10px 0;
    align-items: center;
    justify-content: center;
    background: #dfe6e9;
    border-radius: 30px;
  `,
};

export default Category;
