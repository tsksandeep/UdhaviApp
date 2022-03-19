import { css } from '@emotion/native';
import { HStack, VStack } from 'native-base';
import React from 'react';
import { Text } from 'react-native';
import Category from '../Category/Category';
import { CategoryType } from './CategoryList.modal';
import { categoryListData } from './constants/categoryListData';

const CategoryHStack = ({ categories }: { categories: CategoryType[] }) => {
  return (
    <HStack alignItems="center" justifyContent="center">
      {categories.map((category: CategoryType, index: number) => (
        <Category key={index} categoryData={category} />
      ))}
    </HStack>
  );
};

const CategoryVStack = () => {
  return (
    <VStack>
      <CategoryHStack categories={categoryListData.slice(0, 3)} />
      <CategoryHStack categories={categoryListData.slice(3, 6)} />
      <CategoryHStack categories={categoryListData.slice(6, 9)} />
    </VStack>
  );
};

const CategoryList = () => {
  return (
    <>
      <Text style={styles.headerText}>
        I need <Text style={styles.specialHeaderText}>udhavi</Text> for
      </Text>
      <CategoryVStack />
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
