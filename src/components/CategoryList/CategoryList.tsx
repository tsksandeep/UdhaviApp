import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Category from '../Category/Category';
import { CategoryType } from './categoryList.modal';

const mockData: CategoryType[] = [
  {
    id: 1,
    name: 'Food',
    image: '',
  },
  {
    id: 2,
    name: 'Shelter',
    image: '',
  },
  {
    id: 3,
    name: 'Medicine',
    image: '',
  },
  {
    id: 4,
    name: 'Transport',
    image: '',
  },
  {
    id: 5,
    name: 'Groceries',
    image: '',
  },
  {
    id: 7,
    name: 'More',
    image: '',
  },
];

const CategoryList = () => {
  const renderItem = ({ item }: { item: CategoryType }) => {
    return <Category categoryData={item}></Category>;
  };

  return (
    <View style={styles.container}>
      <FlatList
        key={'#'}
        keyExtractor={(item) => '#' + item.id}
        data={mockData}
        renderItem={renderItem}
        numColumns={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: ' 100%',
    margin: 20,
  },
});

export default CategoryList;
