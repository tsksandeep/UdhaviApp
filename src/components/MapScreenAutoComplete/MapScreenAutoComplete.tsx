import React, { useState, useRef, useEffect } from 'react';
import { HStack } from 'native-base';
import { Dimensions, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import Constants from 'expo-constants';
import { ReactNativeStyle } from '@emotion/native';
import * as Location from 'expo-location';
import { createSelector } from 'reselect';
import { AppInitialState } from '../../store/reducers/app';
import bindDispatch from '../../utils/actions';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  searchBarErrorStyles,
  searchBarStyles,
} from '../PlacesAutoComplete/constants/searchBar';
import MapScreen from '../MapScreen/MapScreen';

type Props = {
  onSelectCoordinates?: any;
  styles?: ReactNativeStyle;
  error?: boolean;
  errorText?: string;
  onChangeText?: any;
  app: AppInitialState;
  actions: any;
  getUserLocation?: boolean;
  requestLocation: any;
  setRequestLocation: any;
};

const screenWidth = Dimensions.get('window').width;
const GOOGLE_PLACES_API_KEY = Constants.manifest?.extra?.GOOGLE_PLACES_API_KEY;
const latDelta = 0.3;
const lngDelta = 0.2;

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

const MapScreenAutoComplete = React.forwardRef((props: Props, ref: any) => {
  let inputRef = useRef<GooglePlacesAutocompleteRef>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [location, setLocation] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [address, setAddress] = useState();

  async function getLatLongFromAutoComplete(apiData: any) {
    const placeCode = apiData.place_id;
    const reqUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeCode}&key=${GOOGLE_PLACES_API_KEY}`;
    const response = await fetch(reqUrl);
    const json = await response.json();
    // props.onSelectCoordinates(json.result.geometry.location);
    return json.result.geometry.location;
  }

  useEffect(() => {
    if (props.getUserLocation && inputRef) {
      getLocation(true, inputRef);
    }
  }, [inputRef.current]);

  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  useEffect(() => {
    getRequestLocationFromCoords();
  }, [props.requestLocation]);

  const getRequestLocationFromCoords = async () => {
    let regionName = await Location.reverseGeocodeAsync({
      latitude: props.requestLocation.lat,
      longitude: props.requestLocation.lng,
    });

    const { city, district, region, country, subregion } = regionName[0];
    const addressText = getAddressText(
      city,
      district,
      region,
      subregion,
      country,
    );
    if (inputRef.current) {
      inputRef.current.setAddressText(addressText);
    }
    const requestForm = { ...props.app.requestForm };
    requestForm.location.latitude = props.requestLocation.lat;
    requestForm.location.longitude = props.requestLocation.lng;
    props.actions.createRequestForm(requestForm);
  };

  async function setLocationByAutoCompleteResult(apiData: any) {
    const loc = await getLatLongFromAutoComplete(apiData);
    const requestForm = { ...props.app.requestForm };
    requestForm.location.latitude = loc.lat;
    requestForm.location.longitude = loc.lng;
    props.setRequestLocation({ lat: loc.lat, lng: loc.lng });
    requestForm.location.latitude = loc.lat;
    requestForm.location.longitude = loc.lng;
    props.actions.createRequestForm(requestForm);
  }

  const fetchCurrentLocation = async (): Promise<void> => {
    Location.setGoogleApiKey(GOOGLE_PLACES_API_KEY);
    let { coords } = await Location.getCurrentPositionAsync();
    if (coords) {
      let { longitude, latitude } = coords;
      let regionName = await Location.reverseGeocodeAsync({
        longitude,
        latitude,
      });
      const { city, district, region, country, subregion } = regionName[0];
      setLocation(getAddressText(city, district, region, subregion, country));
    }
  };

  const getLocation = (
    setUserRequest?: boolean,
    autoCompleteRef?: any,
    returnAddress?: boolean,
  ) => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
      Location.setGoogleApiKey(GOOGLE_PLACES_API_KEY);
      let { coords } = await Location.getCurrentPositionAsync();
      if (coords) {
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

        if (returnAddress) {
          return addressText;
        }
        props.actions.updateRequestAddress(addressText);
        if (setUserRequest) {
          autoCompleteRef?.setAddressText(addressText);
        }
      }
      if (!setUserRequest) {
        const requestForm = { ...props.app.requestForm };
        requestForm.location.latitude = coords.latitude;
        requestForm.location.longitude = coords.longitude;
        props.actions.createRequestForm(requestForm);
        navigation.navigate('Map', { showConfirmButton: true });
      }
    })();
  };

  return (
    <HStack space={1} style={props.styles || styles.search}>
      <GooglePlacesAutocomplete
        styles={
          props.error ? searchBarErrorStyles : searchBarStyles(!!props.styles)
        }
        placeholder="Search address"
        textInputProps={
          props?.error
            ? {
                placeholderTextColor: '#FF0000',
              }
            : {}
        }
        onPress={(data) => {
          setLocationByAutoCompleteResult(data);
        }}
        ref={(autoCompleteRef) => {
          if (autoCompleteRef) {
            inputRef.current = autoCompleteRef;
          }
        }}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: 'en',
          components: 'country:in',
        }}
        enablePoweredByContainer={false}
      />
      {props.error && <Text style={{ color: 'red' }}>{props.errorText}</Text>}
    </HStack>
  );
});

const styles = StyleSheet.create({
  search: {
    position: 'absolute',
    alignItems: 'center',
    top: 3,
    left: 2,
    width: screenWidth - 3,
    backgroundColor: 'white',
  },
  RegisterFormField: {
    height: '56px',
  },
  image: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    paddingLeft: 10,
    color: '#560cce',
  },
  currentAddressContainer: {
    marginTop: 30,
    position: 'absolute',
    top: 50,
    zIndex: 999,
  },
  currentAddressText: {
    marginLeft: 33,
  },
});

const selector = createSelector(
  (state: any) => state.app,
  (app: AppInitialState) => ({ app }),
);

export default connect(selector, bindDispatch)(MapScreenAutoComplete);
