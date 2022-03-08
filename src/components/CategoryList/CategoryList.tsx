import { css } from '@emotion/native';
import React, { useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import Category from '../Category/Category';
import GroupList from '../GroupList/GroupList';
import { CategoryType } from './CategoryList.modal';
import { categoryListData } from './constants/categoryListData';

const CategoryList = () => {
  const [showGroupedList, setShowGroupedList] = useState();
  const renderItem = ({ item }: { item: CategoryType }) => {
    return (
      <Category categoryData={item} setShowGroupedList={setShowGroupedList} />
    );
  };

  return (
    <View>
      {showGroupedList ? (
        <GroupList setShowGroupedList={setShowGroupedList} />
      ) : (
        <>
          <Text style={styles.headerText}>
            I need <Text style={styles.specialHeaderText}>udhavi</Text> for
          </Text>
          <View style={styles.listContainer}>
            <FlatList
              key={'#'}
              keyExtractor={(item) => '#' + item.id}
              data={categoryListData}
              renderItem={renderItem}
              numColumns={3}
            />
          </View>
        </>
      )}
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
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
};

export default CategoryList;
