import { css } from '@emotion/native';
import { HStack, VStack } from 'native-base';
import React, { useState } from 'react';
import { Text } from 'react-native';
import Category from '../Category/Category';
import GroupList from '../GroupList/GroupList';
import { CategoryType } from './CategoryList.modal';
import { categoryListData } from './constants/categoryListData';

const CategoryHStack = ({
  categories,
  setShowGroupedList,
}: {
  categories: CategoryType[];
  setShowGroupedList: Function;
}) => {
  return (
    <HStack alignItems="center" justifyContent="center">
      {categories.map((category: CategoryType, index: number) => (
        <Category
          key={index}
          categoryData={category}
          setShowGroupedList={setShowGroupedList}
        />
      ))}
    </HStack>
  );
};

const CategoryVStack = ({
  setShowGroupedList,
}: {
  setShowGroupedList: Function;
}) => {
  return (
    <VStack>
      <CategoryHStack
        categories={categoryListData.slice(0, 3)}
        setShowGroupedList={setShowGroupedList}
      />
      <CategoryHStack
        categories={categoryListData.slice(3, 6)}
        setShowGroupedList={setShowGroupedList}
      />
      <CategoryHStack
        categories={categoryListData.slice(6, 9)}
        setShowGroupedList={setShowGroupedList}
      />
    </VStack>
  );
};

const CategoryList = () => {
  const [showGroupedList, setShowGroupedList] = useState();

  if (showGroupedList) {
    return <GroupList setShowGroupedList={setShowGroupedList} />;
  }

  return (
    <>
      <Text style={styles.headerText}>
        I need <Text style={styles.specialHeaderText}>udhavi</Text> for
      </Text>
      <CategoryVStack setShowGroupedList={setShowGroupedList} />
    </>
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
};

export default CategoryList;
