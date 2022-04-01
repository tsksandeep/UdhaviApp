import React, { useRef } from 'react';
import { HStack } from 'native-base';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import Constants from 'expo-constants';
import { css } from '@emotion/native';
import * as Location from 'expo-location';
import { createSelector } from 'reselect';
import { AppInitialState } from '../../store/reducers/app';
import bindDispatch from '../../utils/actions';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
  app: AppInitialState;
  actions: any;
  setRequestLocation: any;
};

const GOOGLE_PLACES_API_KEY = Constants.manifest?.extra?.GOOGLE_PLACES_API_KEY;
Location.setGoogleApiKey(GOOGLE_PLACES_API_KEY);
Location.requestForegroundPermissionsAsync();

const getAddressText = (
  city: string | null,
  district: string | null,
  region: string | null,
  subregion: string | null,
  country: string | null,
): string => {
  var addressText = '';
  if (city) {
    addressText += city + ', ';
  }
  if (district) {
    addressText += district + ', ';
  } else if (subregion) {
    addressText += subregion + ', ';
  }
  if (region) {
    addressText += region;
  } else if (country) {
    addressText += country;
  }
  return addressText;
};

const MapScreenAutoComplete = (props: Props) => {
  let inputRef = useRef<GooglePlacesAutocompleteRef>(null);

  const getLatLongFromAutoComplete = async (apiData: any) => {
    const placeCode = apiData.place_id;
    const reqUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeCode}&key=${GOOGLE_PLACES_API_KEY}`;
    const response = await fetch(reqUrl);
    const json = await response.json();
    return json.result.geometry.location;
  };

  const setLocation = (latitude: number, longitude: number) => {
    const requestForm = { ...props.app.requestForm };
    requestForm.location.latitude = latitude;
    requestForm.location.longitude = longitude;
    props.setRequestLocation({ lat: latitude, lng: longitude });
    props.actions.createRequestForm(requestForm);
  };

  const setLocationByAutoCompleteResult = async (apiData: any) => {
    const loc = await getLatLongFromAutoComplete(apiData);
    setLocation(loc.lat, loc.lng);
  };

  const fetchCurrentLocation = async (): Promise<any> => {
    let { coords } = await Location.getCurrentPositionAsync();
    if (!coords) {
      return null;
    }

    let { longitude, latitude } = coords;
    let regionName = await Location.reverseGeocodeAsync({
      longitude,
      latitude,
    });
    const { city, district, region, country, subregion } = regionName[0];

    const addressText = getAddressText(
      city,
      district,
      region,
      subregion,
      country,
    );

    return { latitude, longitude, addressText };
  };

  const setLocationCallback = async () => {
    if (!inputRef || !inputRef.current) {
      return;
    }

    inputRef.current.setAddressText('Detecting current location...');

    const currentLocation = await fetchCurrentLocation();
    if (!currentLocation) {
      return;
    }

    inputRef.current.setAddressText(currentLocation.addressText);

    setLocation(currentLocation.latitude, currentLocation.longitude);
  };

  return (
    <>
      <HStack space={1}>
        <View style={MapScreenAutoCompleteStyle.input}>
          <GooglePlacesAutocomplete
            placeholder="Search address"
            onPress={(data) => {
              setLocationByAutoCompleteResult(data);
            }}
            ref={inputRef}
            query={{
              key: GOOGLE_PLACES_API_KEY,
              language: 'en',
              components: 'country:in',
            }}
            enablePoweredByContainer={false}
          />
        </View>
      </HStack>
      <TouchableOpacity onPress={() => setLocationCallback()}>
        <HStack style={MapScreenAutoCompleteStyle.currentAddressContainer}>
          <MaterialIcons
            style={MapScreenAutoCompleteStyle.image}
            name="my-location"
            size={24}
            color="black"
          />
          <Text style={MapScreenAutoCompleteStyle.text}>
            Use Current Location
          </Text>
        </HStack>
      </TouchableOpacity>
    </>
  );
};

const MapScreenAutoCompleteStyle = {
  input: css`
    width: 100%;
    shadow-offset: 2px;
    shadow-color: #171717;
    shadow-opacity: 0.1;
    shadow-radius: 8px;
  `,
  image: css`
    margin-right: 5px;
  `,
  text: css`
    color: #560cce;
    font-size: 15px;
    font-weight: 600;
    text-transform: uppercase;
    position: relative;
    top: 3px;
  `,
  currentAddressContainer: css`
    margin: 20px 0 10px 0;
  `,
};

const selector = createSelector(
  (state: any) => state.app,
  (app: AppInitialState) => ({ app }),
);

export default connect(selector, bindDispatch)(MapScreenAutoComplete);
