import { addDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

export const onSendCallback = (
  messagesRef: any,
  messages: IMessage[],
  setMessages: Function,
): any => {
  setMessages((previousMessages: any) =>
    GiftedChat.append(previousMessages, messages),
  );

  addDoc(messagesRef, messages[0]);
};

export const unsubscribeCallback = (
  messagesRef: any,
  setMessages: Function,
) => {
  const queryResponse = query(messagesRef, orderBy('createdAt', 'desc'));

  const unsubscribe = onSnapshot(queryResponse, (querySnapshot: any) => {
    setMessages(
      querySnapshot.docs.map((doc: any) => {
        const data = doc.data();
        return {
          _id: data._id,
          createdAt: data.createdAt.toDate(),
          text: data.text,
          user: data.user,
        };
      }),
    );
  });

  return () => unsubscribe();
};
