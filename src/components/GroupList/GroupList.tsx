import React from 'react';
import { Text, View, SectionList, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { css } from '@emotion/native';
import { CategoryType } from '../CategoryList/CategoryList.modal';
import { groupListData } from './constants/groupListData';

const GroupList = () => {
  const Item = ({ item }: { item: CategoryType }) => (
    <Pressable style={styles.itemContainer} onPress={() => {}}>
      <MaterialIcons name="account-circle" size={40} color="black" />
      <Text>{item.name}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={groupListData}
        keyExtractor={(_, index) => '#' + index}
        renderItem={({ item }) => <Item item={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </View>
  );
};

const styles = {
  container: css`
    height: 80%;
  `,
  itemContainer: css`
    flex-direction: row;
    background: #dfe6e9;
    margin: 12px;
    border-radius: 8px;
    padding: 10px;
    align-items: center;
  `,
  header: css`
    font-size: 32px;
    color: #560cce;
    font-family: 'Pacifico';
    background: #fdf6e4;
  `,
};

export default GroupList;
