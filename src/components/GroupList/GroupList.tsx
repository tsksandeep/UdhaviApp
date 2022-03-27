import React from 'react';
import { Text, View, SectionList, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { css } from '@emotion/native';
import { CategoryType } from '../CategoryList/CategoryList.modal';
import { groupListData } from './constants/groupListData';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const GroupList = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const Item = ({ item }: { item: CategoryType }) => (
    <Pressable
      style={styles.itemContainer}
      onPress={() => {
        navigation.navigate('Request', { name: item.name });
      }}
    >
      <MaterialIcons name="account-circle" size={20} color="black" />
      <Text style={styles.itemName}>{item.name}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <SectionList
        showsVerticalScrollIndicator={false}
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
    height: 100%;
    padding: 0px 10px 130px 10px;
  `,
  itemContainer: css`
    flex-direction: row;
    background: #dfe6e9;
    margin: 4px 0;
    border-radius: 8px;
    padding: 8px;
    align-items: center;
  `,
  itemName: css`
    font-size: 16px;
    font-weight: 500;
    margin-left: 5px;
  `,
  header: css`
    font-size: 24px;
    color: #560cce;
    font-family: 'Pacifico';
    background: #fdf6e4;
    padding-top: 10px;
  `,
};

export default GroupList;
