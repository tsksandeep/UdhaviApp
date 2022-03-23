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
      querySnapshot.docs.map((doc: any) => ({
        _id: doc.data()._id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user,
      })),
    );
  });

  return () => unsubscribe();
};
