import React, { useState } from 'react';
import { css } from '@emotion/native';
import { Text, View, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';
import bindDispatch from '../../utils/actions';
import { phoneNumberValidator } from '../../helpers/validator';
import { AppInitialState } from '../../store/reducers/app';
import MapScreenAutoComplete from '../MapScreenAutoComplete/MapScreenAutoComplete';
import MapScreen from '../MapScreen/MapScreen';
import { generateHash } from '../../helpers/hash';
import { LocationType, RequestData } from '../../firebase/model';
import { writeRequestData } from '../../firebase/entity';
import { RequestStatesMap } from '../../constants/constants';

const RequestFormComponent = ({
  actions,
  app,
  category,
}: {
  actions: any;
  app: AppInitialState;
  category: string;
}) => {
  const [date, setDate] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [requestLocation, setRequestLocation] = useState({ lat: 0, lng: 0 });

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    makeRequest(data);
  };

  const onDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowTimePicker(false);
  };

  const makeRequest = async (data: any) => {
    const requestForm = app.requestForm;
    const date = new Date().getTime();
    const requestData = {
      id: generateHash(
        requestForm.name + app.user.phoneNumber + date.toString(),
      ),
      name: data.name,
      phoneNumber: app.user.phoneNumber,
      requestorPhoneNumber: data.phoneNumber,
      info: data.info,
      location: {
        latitude: requestForm.location.latitude,
        longitude: requestForm.location.longitude,
      } as LocationType,
      deliveryTime: requestForm.deliveryTime,
      notes: data.notes,
      date: date,
      status: RequestStatesMap.New,
      category: category,
      assignedVolunteerIds: [''],
    } as RequestData;

    await writeRequestData(requestData);
    actions.createRequestForm(requestData);

    let requestsMap = app.requestsMap;
    requestsMap.set(requestData.id, requestData);
    actions.updateRequestsMap(requestsMap);

    navigation.navigate('Home', {});
  };

  return (
    <BottomSheetScrollView keyboardShouldPersistTaps="handled">
      <View style={RequestFormStyle.container}>
        <Text style={RequestFormStyle.header}>Submit your request</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Name"
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
              placeholder="Phone (10 digits)"
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
              placeholder="What is needed?"
              returnKeyType="next"
              value={value}
              onChangeText={(text: string) => onChange(text)}
              autoCapitalize="none"
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
        <Pressable onPress={() => setShowTimePicker(true)}>
          <View pointerEvents="none">
            <TextInput
              placeholder="Delivery Time"
              returnKeyType="next"
              autoCapitalize="none"
              value={moment(app.requestForm.deliveryTime || date).format(
                'DD:MM:YYYY HH:MM',
              )}
              editable={false}
              pointerEvents="none"
            />
          </View>
        </Pressable>
        {showTimePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            mode={'time'}
            value={app.requestForm.deliveryTime || date}
            display="default"
            onChange={onDateChange}
          />
        )}
        <Controller
          control={control}
          name="notes"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Notes"
              returnKeyType="next"
              value={value}
              onChangeText={(text: string) => onChange(text)}
              autoCapitalize="none"
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
        <ScrollView
          style={RequestFormStyle.autoCompleteContainer}
          keyboardShouldPersistTaps="handled"
        >
          <MapScreenAutoComplete
            styles={RequestFormStyle.locationInput}
            requestLocation={requestLocation}
            setRequestLocation={setRequestLocation}
          ></MapScreenAutoComplete>
        </ScrollView>

        <View style={RequestFormStyle.mapViewContainer}>
          <MapScreen
            requestLocation={requestLocation}
            setRequestLocation={setRequestLocation}
          />
        </View>
        <Button
          style={RequestFormStyle.submitButton}
          mode="outlined"
          disabled={!date}
          onPress={handleSubmit(onSubmit)}
        >
          Submit
        </Button>
      </View>
    </BottomSheetScrollView>
  );
};

const RequestFormStyle = {
  container: css`
    padding: 0 20px;
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
    margin: 30px 0px 50px 0;
    background: #560cce;
    border: none;
    width: 100%;
  `,
  locationInput: css`
    width: 100%;
    background: white;
    flex-direction: column;
    position: relative;
  `,
  autoCompleteContainer: css`
    width: 100%;
    overflow: visible;
    margin: 10px 0;
  `,
  mapViewContainer: css`
    border-radius: 10px;
    overflow: hidden;
  `,
};

const selector = createSelector(
  (state: any) => state.app,
  (app: AppInitialState) => ({ app }),
);

export default connect(selector, bindDispatch)(RequestFormComponent);
