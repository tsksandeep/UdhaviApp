import { GiftedChat } from 'react-native-gifted-chat';
import { chatGroupsRef, getChatStorageRef } from './ref';

export const onSendChatCallback = (
  messagesRef: any,
  messages: any,
  setMessages: Function,
): any => {
  setMessages((previousMessages: any) =>
    GiftedChat.append(previousMessages, messages),
  );

  messagesRef.doc().set(messages[0]);
};

export const unsubscribeChatCallback = (
  messagesRef: any,
  setMessages: Function,
) => {
  const queryResponse = messagesRef.orderBy('createdAt', 'desc');
  const unsubscribe = queryResponse.onSnapshot((querySnapshot: any) => {
    setMessages(
      querySnapshot.docs.map((doc: any) => {
        const data = doc.data();
        const info: any = {
          _id: data._id,
          createdAt: data.createdAt.toDate(),
          user: data.user,
        };

        if (data.text) info['text'] = data.text;
        if (data.file) info['file'] = data.file;
        if (data.image) info['image'] = data.image;
        if (data.location) info['location'] = data.location;
        if (data.sharedContact) info['sharedContact'] = data.sharedContact;

        return info;
      }),
    );
  });

  return () => unsubscribe();
};

export const uploadChatFile = async (
  groupid: string,
  uri: string,
  setTransferring: Function,
  setTransferred: Function,
) => {
  const filename = uri.substring(uri.lastIndexOf('/') + 1);
  const fileRef = getChatStorageRef(groupid, filename);
  const blob = await (await fetch(uri)).blob();

  setTransferring(true);
  setTransferred(0.0);

  var uploadTask = fileRef.put(blob);
  uploadTask.on(
    'state_changed',
    (snapshot) => {
      setTransferred(
        ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2),
      );
    },
    (error) => {
      switch (error.code) {
        case 'storage/unauthorized':
          console.log("User doesn't have permission to access the object");
        case 'storage/canceled':
          console.log('User canceled the upload');
        case 'storage/unknown':
          console.log('Unknown error occurred, inspect error.serverResponse');
        default:
          console.log(error);
      }
      setTransferred(0.0);
      setTransferring(false);
    },
    () => {
      setTransferred(0.0);
      setTransferring(false);
    },
  );
};

export const getChatGroups = async (userId: string): Promise<any> => {
  return (await chatGroupsRef.where('userList', 'array-contains', userId).get())
    .docs;
};
