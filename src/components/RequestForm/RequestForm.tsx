import React, { useState, useEffect } from 'react';
import { css } from '@emotion/native';
import { Text, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';
import bindDispatch from '../../utils/actions';
import { phoneNumberValidator } from '../../helpers/validator';
import { useForm, Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { RequestCategoryImageMap } from '../../constants/constants';
import { RequestForm } from '../../store/reducers/modal/app.modal';
import { AppInitialState } from '../../store/reducers/app';

const RequestFormComponent = ({
  actions,
  app,
  showHeading,
}: {
  actions: any;
  app: AppInitialState;
  showHeading: boolean;
}) => {
  const [selectedCoordinates, setSelectedCoordinates] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [date, setDate] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    if (Object.values(app.requestForm).length) {
      const { name, info, notes, requestorPhoneNumber } = app.requestForm;
      setValue('name', name);
      setValue('phoneNumber', requestorPhoneNumber);
      setValue('info', info);
      setValue('notes', notes);
    }
  }, []);

  if (showHeading === undefined) {
    showHeading = true;
  }

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const getCategory = (info: string): string => {
    const splitWords = info.split(' ');

    for (let i = 0; i < splitWords.length; i++) {
      var word = splitWords[i];
      if (RequestCategoryImageMap[word.toLowerCase()])
        return word.toLowerCase();
    }

    return 'Misc';
  };

  const onSubmit = async (data: any) => {
    const requestData: RequestForm = {
      name: data.name,
      requestorPhoneNumber: data.phoneNumber,
      info: data.info,
      location: selectedCoordinates,
      deliveryTime: date,
      notes: data.notes,
      status: 'New',
      category: getCategory(data.info),
    };
    actions.createRequestForm(requestData);
    navigation.navigate('GetLocation', {});
  };

  const onDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowTimePicker(false);
  };

  return (
    <View style={RequestFormStyle.container}>
      {showHeading && (
        <Text style={RequestFormStyle.header}>Submit your request</Text>
      )}
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
            placeholder="Phone"
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
      <Button
        style={RequestFormStyle.submitButton}
        mode="outlined"
        disabled={!date}
        onPress={handleSubmit(onSubmit)}
      >
        Submit
      </Button>
    </View>
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
    margin-top: 20px;
    margin-bottom: 20px;
    border: 2px solid rgb(196, 34, 255);
  `,
};

const selector = createSelector(
  (state: any) => state.app,
  (app: AppInitialState) => ({ app }),
);

export default connect(selector, bindDispatch)(RequestFormComponent);
