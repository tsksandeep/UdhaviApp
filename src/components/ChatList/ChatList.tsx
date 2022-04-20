import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View, Text } from 'react-native';
import { css } from '@emotion/native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Logo from '../Logo/Logo';
import { getChatGroups } from '../../firebase/chat';
import { Divider } from 'native-base';

export interface ChatGroupModel {
  id: string;
  name: string;
  groupId: string;
  description: string;
  members: Array<string>;
}

const ChatList = (props: any) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [groups, setGroups] = useState<Array<ChatGroupModel>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getChatGroupsCB = async () => {
      var chatGroupDataList: Array<ChatGroupModel> = [];
      const chatGroups = await getChatGroups(props.userData.userId);
      chatGroups.map((chatGroup: any) => {
        chatGroupDataList.push(chatGroup.data());
      });
      setGroups(chatGroupDataList);
      setLoading(false);
    };
    getChatGroupsCB();
  }, []);

  if (loading) {
    return (
      <View style={ChatListStyle.logoContainer}>
        <Logo />
      </View>
    );
  }

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={groups}
      keyExtractor={(_, index) => index.toString()}
      ItemSeparatorComponent={() => {
        return <Divider />;
      }}
      renderItem={({ item, index }) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate('Chat', {
                userData: props.userData,
                groupId: item.groupId,
              })
            }
          >
            <View style={ChatListStyle.groupContainer}>
              <Text style={ChatListStyle.groupTitle}>{item.name}</Text>
              <Text>{item.description}</Text>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const ChatListStyle = {
  logoContainer: css`
    height: 100%;
    display: flex;
    align-items: center;
    padding: 150px 30px 0 30px;
  `,
  container: css`
    width: 100%;
    flex: 1;
    background: #fdf6e4;
  `,
  groupContainer: css`
    padding: 10px;
  `,
  groupTitle: css`
    font-size: 24px;
  `,
};

export default ChatList;
