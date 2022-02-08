import React, { useState } from 'react';
import { css } from '@emotion/native';
import { Text, SafeAreaView, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import TextInput from '../components/TextInput/TextInput';
import Button from '../components/Button/Button';
import { writeRequestData } from '../firebase/requests';
import { RequestData } from '../firebase/model';
import bindDispatch from '../utils/actions';
import { phoneNumberValidator } from '../helpers/validator';
import { RequestInitialState } from '../store/reducers/requestForm';
import { generateHash } from '../helpers/hash';
import { useForm, Controller } from 'react-hook-form';
import PlacesAutoComplete from '../components/PlacesAutoComplete/PlacesAutoComplete';

const Request = ({
  actions,
  request,
}: {
  actions: any;
  request: RequestInitialState;
}) => {
  const [selectedCoordinates, setSelectedCoordinates] = useState({
    latitude: 0,
    longitude: 0,
  });

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const date = new Date().getTime();
    const requestData: RequestData = {
      id: generateHash(data.name + data.phoneNumber + date.toString()),
      name: data.name,
      phoneNumber: data.phoneNumber,
      info: data.info,
      location: selectedCoordinates,
      deliveryTime: data.deliveryTime,
      notes: data.notes,
      date: date,
      assignedVolunteerIds: [],
    };

    await writeRequestData(requestData);
    actions.updateRequestForm(requestData);

    navigation.navigate('Home', {
      message:
        Math.floor(Math.random() * 10000).toString() +
        ': Successfully submitted the request',
    });
  };

  const onSelectCoordinates = (data: any) => {
    setSelectedCoordinates(data);
  };

  return (
    <SafeAreaView style={RequestStyle.container}>
      <KeyboardAwareScrollView
        extraScrollHeight={75}
        keyboardShouldPersistTaps={'always'}
      >
        <View>
          <Text style={RequestStyle.header}>Submit your request</Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Name"
                returnKeyType="next"
                value={value}
                onChangeText={(text: string) => onChange(text)}
                autoCapitalize="none"
                error={!!errors?.name?.message}
                errorText={errors?.name?.message}
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'Name is required!',
              },
            }}
          />

          <Controller
            control={control}
            name="phoneNumber"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Phone"
                returnKeyType="next"
                value={value}
                onChangeText={(text: string) => onChange(text)}
                autoCapitalize="none"
                error={!!errors?.phoneNumber?.message}
                errorText={errors?.phoneNumber?.message}
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'Phone Number is required!',
              },
              validate: (value: string) => phoneNumberValidator(value),
            }}
          />

          <Controller
            control={control}
            name="info"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="What is needed?"
                returnKeyType="next"
                value={value}
                onChangeText={(text: string) => onChange(text)}
                autoCapitalize="none"
                multiline={true}
                numberOfLines={5}
                error={!!errors?.info?.message}
                errorText={errors?.info?.message}
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'Info is required!',
              },
            }}
          />

          <Controller
            control={control}
            name="location"
            render={({ field: { onChange, value } }) => (
              <PlacesAutoComplete
                onSelectCoordinates={onSelectCoordinates}
                styles={styles.locationInput}
                error={!!errors?.info?.message}
                onChangeText={(text: string) => onChange(text)}
                errorText={errors?.location?.message}
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'Location is required!',
              },
            }}
          />

          <Controller
            control={control}
            name="deliveryTime"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Delivery Time"
                returnKeyType="next"
                value={value}
                onChangeText={(text: string) => onChange(text)}
                autoCapitalize="none"
                error={!!errors?.deliveryTime?.message}
                errorText={errors?.deliveryTime?.message}
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'Delivery Time is required!',
              },
            }}
          />

          <Controller
            control={control}
            name="notes"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Notes"
                returnKeyType="next"
                value={value}
                onChangeText={(text: string) => onChange(text)}
                autoCapitalize="none"
                multiline={true}
                numberOfLines={150}
                error={!!errors?.notes?.message}
                errorText={errors?.notes?.message}
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'Notes is required!',
              },
            }}
          />
          <Button
            style={RequestStyle.submitButton}
            mode="outlined"
            onPress={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        </View>
      </KeyboardAwareScrollView>
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

const styles = StyleSheet.create({
  locationInput: {
    width: ' 100%',
    backgroundColor: 'white',
    flexDirection: 'column',
  },
});

const selector = createSelector(
  (state: any) => state.request,
  (request: RequestInitialState) => ({ request }),
);

export default connect(selector, bindDispatch)(Request);
