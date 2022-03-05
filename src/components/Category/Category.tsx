import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CategoryType } from '../CategoryList/categoryList.modal';

const Category = ({ categoryData }: { categoryData: CategoryType }) => {
  return (
    <View style={styles.container}>
      {/* <Image
        style={{ width: 75, height: 75, borderRadius: 150 / 2 }}
      /> */}
      <Text style={styles.label}>{categoryData.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    marginBottom: 20,
  },
  label: {},
});

export default Category;
