import React, { useRef, useState } from 'react';
import { css } from '@emotion/native';
import {
  Text,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';

import TextInput from '../components/TextInput/TextInput';
import Button from '../components/Button/Button';
import { writeRequestData } from '../firebase/db';
import { RequestData } from '../firebase/model';
import bindDispatch from '../utils/actions';
import { phoneNumberValidator } from '../helpers/validator';
import { RequestInitialState } from '../store/reducers/request';
import { generateHash } from '../helpers/hash';

const keyboardVerticalOffset = Platform.OS === 'ios' ? -50 : 0;

const Request = ({
  actions,
  request,
}: {
  actions: any;
  request: RequestInitialState;
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [name, setName] = useState({ value: '', error: '' });
  const [phoneNumber, setPhoneNumber] = useState({ value: '+91 ', error: '' });
  const [info, setInfo] = useState({ value: '', error: '' });
  const [location, setLocation] = useState({ value: '', error: '' });
  const [deliveryTime, setDeliveryTime] = useState({ value: '', error: '' });
  const [notes, setNotes] = useState({ value: '', error: '' });
  const [isErr, setIsErr] = useState(false);
  const scrollViewRef: React.LegacyRef<ScrollView> | null = useRef(null);

  const checkErrors = (): boolean => {
    if (!name.value) {
      setName({ ...name, error: 'Name should not be empty' });
    }

    const phoneNumberError = phoneNumberValidator(phoneNumber.value);
    if (phoneNumberError) {
      setPhoneNumber({ ...phoneNumber, error: phoneNumberError });
    }

    if (!info.value) {
      setInfo({ ...info, error: 'What is needed should not be empty' });
    }

    if (!location.value) {
      setLocation({ ...location, error: 'Location should not be empty' });
    }

    if (!deliveryTime.value) {
      setDeliveryTime({
        ...deliveryTime,
        error: 'Delivery time should not be empty',
      });
    }

    if (!notes.value) {
      setNotes({ ...notes, error: 'Notes should not be empty' });
    }

    if (
      !name.value ||
      phoneNumberError ||
      !info.value ||
      !location.value ||
      !deliveryTime.value ||
      !notes.value
    ) {
      return true;
    }

    return false;
  };

  const onSubmit = async () => {
    if (checkErrors()) {
      setIsErr(true);
      if (scrollViewRef.current !== null) {
        scrollViewRef.current.scrollTo({
          y: 0,
          animated: true,
        });
      }
      return;
    }

    const date = new Date().getTime();
    const requestData: RequestData = {
      id: generateHash(name.value + phoneNumber.value + date.toString()),
      name: name.value,
      phoneNumber: phoneNumber.value,
      info: info.value,
      location: location.value,
      deliveryTime: deliveryTime.value,
      notes: notes.value,
      date: date,
    };

    setIsErr(false);
    await writeRequestData(requestData);
    actions.updateRequestForm(requestData);

    navigation.navigate('Home', {
      message:
        Math.floor(Math.random() * 10000).toString() +
        ': Successfully submitted the request',
    });
  };

  return (
    <SafeAreaView style={RequestStyle.container}>
      <KeyboardAvoidingView
        behavior="height"
        keyboardVerticalOffset={keyboardVerticalOffset}
        style={{ flex: 1 }}
      >
        <KeyboardAwareScrollView>
          <View>
            <Text style={RequestStyle.header}>Submit your request</Text>
            {isErr && (
              <Text style={RequestStyle.errText}>
                *Please fill all the fields properly before submitting
              </Text>
            )}
            <TextInput
              label="Name"
              returnKeyType="next"
              value={name.value}
              onChangeText={(text: string) =>
                setName({ value: text, error: '' })
              }
              error={!!name.error}
              errorText={name.error}
              autoCapitalize="none"
            />
            <TextInput
              label="Phone"
              returnKeyType="next"
              value={phoneNumber.value}
              onChangeText={(text: string) =>
                setPhoneNumber({ value: text, error: '' })
              }
              error={!!phoneNumber.error}
              errorText={phoneNumber.error}
              autoCapitalize="none"
            />
            <TextInput
              label="What is needed?"
              returnKeyType="next"
              value={info.value}
              onChangeText={(text: string) =>
                setInfo({ value: text, error: '' })
              }
              error={!!info.error}
              errorText={info.error}
              autoCapitalize="none"
              multiline={true}
              numberOfLines={5}
            />
            <TextInput
              label="Delivery Location"
              returnKeyType="next"
              value={location.value}
              onChangeText={(text: string) =>
                setLocation({ value: text, error: '' })
              }
              error={!!location.error}
              errorText={location.error}
              autoCapitalize="none"
            />
            <TextInput
              label="Delivery Time"
              returnKeyType="next"
              value={deliveryTime.value}
              onChangeText={(text: string) =>
                setDeliveryTime({ value: text, error: '' })
              }
              error={!!deliveryTime.error}
              errorText={deliveryTime.error}
              autoCapitalize="none"
            />
            <TextInput
              label="Notes"
              returnKeyType="next"
              value={notes.value}
              onChangeText={(text: string) =>
                setNotes({ value: text, error: '' })
              }
              error={!!notes.error}
              errorText={notes.error}
              autoCapitalize="none"
              multiline={true}
              numberOfLines={150}
            />
            <Button
              style={RequestStyle.submitButton}
              mode="outlined"
              onPress={onSubmit}
            >
              Submit
            </Button>
          </View>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const RequestStyle = {
  container: css`
    flex: 1;
    background: white;
    padding: 70px 30px 0px 30px;
  `,
  header: css`
    min-height: 80px;
    width: 100%;
    text-align: center;
    font-family: 'Pacifico';
    font-size: 32px;
    padding: 0 10px;
    margin-bottom: 0px;
    color: #560cce;
  `,
  errText: css`
    width: 100%;
    text-align: center;
    font-size: 16px;
    margin-bottom: 10px;
    color: #e74c3c;
    line-height: 24px;
  `,
  submitButton: css`
    margin-top: 20px;
    margin-bottom: 20px;
    border: 2px solid rgb(196, 34, 255);
  `,
};

const selector = createSelector(
  (state: any) => state.request,
  (request: RequestInitialState) => ({ request }),
);

export default connect(selector, bindDispatch)(Request);
