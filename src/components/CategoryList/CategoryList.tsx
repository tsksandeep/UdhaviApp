import { css } from '@emotion/native';
import React from 'react';
import { View, FlatList, Text } from 'react-native';
import Category from '../Category/Category';
import { CategoryType } from './CategoryList.modal';

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
    id: 6,
    name: 'Shelter',
    image: '',
  },
  {
    id: 7,
    name: 'Transport',
    image: '',
  },
  {
    id: 8,
    name: 'Groceries',
    image: '',
  },
  {
    id: 9,
    name: 'More',
    image: '',
  },
];

const CategoryList = () => {
  const renderItem = ({ item }: { item: CategoryType }) => {
    return <Category categoryData={item} />;
  };

  return (
    <View>
      <Text style={styles.headerText}>
        I need <Text style={styles.specialHeaderText}>udhavi</Text> for
      </Text>
      <View style={styles.listContainer}>
        <FlatList
          key={'#'}
          keyExtractor={(item) => '#' + item.id}
          data={mockData}
          renderItem={renderItem}
          numColumns={3}
        />
      </View>
    </View>
  );
};

const styles = {
  headerText: css`
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 10px;
  `,
  specialHeaderText: css`
    font-family: 'Pacifico';
    font-size: 30px;
    color: #560cce;
    text-transform: capitalize;
  `,
  listContainer: css`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
};

export default CategoryList;
