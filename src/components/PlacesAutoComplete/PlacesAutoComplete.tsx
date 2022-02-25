import React, { useState, useRef } from 'react';
import { searchBarStyles, searchBarErrorStyles } from './constants/searchBar';
import { HStack } from 'native-base';
import {
  Dimensions,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Constants from 'expo-constants';
import { ReactNativeStyle } from '@emotion/native';
import * as Location from 'expo-location';
import { createSelector } from 'reselect';
import { AppInitialState } from '../../store/reducers/app';
import bindDispatch from '../../utils/actions';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
  onSelectCoordinates?: any;
  styles?: ReactNativeStyle;
  error?: boolean;
  errorText?: string;
  onChangeText?: any;
  app: AppInitialState;
  actions: any;
};

const screenWidth = Dimensions.get('window').width;
const GOOGLE_PLACES_API_KEY = Constants.manifest?.extra?.GOOGLE_PLACES_API_KEY;
const latDelta = 0.3;
const lngDelta = 0.2;

const PlacesAutoComplete = React.forwardRef((props: Props, ref: any) => {
  const inputRef = useRef(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [location, setLocation] = useState();
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

  async function setLocationByAutoCompleteResult(apiData: any) {
    const loc = await getLatLongFromAutoComplete(apiData);
    const newRegion = {
      latitude: loc.lat,
      longitude: loc.lng,
      latitudeDelta: latDelta,
      longitudeDelta: lngDelta,
    };
    const requestForm = { ...props.app.requestForm };
    requestForm.location.latitude = loc.lat;
    requestForm.location.longitude = loc.lng;
    props.actions.updateRequestAddress(apiData.description);
    props.actions.createRequestForm(requestForm);
    navigation.navigate('Map', { showConfirmButton: true });
    if (ref) {
      ref.current.animateToRegion(newRegion, 500);
    }
  }

  const getLocation = () => {
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
        props.actions.updateRequestAddress(
          `${city || ''}, ${district || subregion || ''}, ${region || ''}, ${
            country || ''
          }`,
        );
      }
      const requestForm = { ...props.app.requestForm };
      requestForm.location.latitude = coords.latitude;
      requestForm.location.longitude = coords.longitude;
      props.actions.createRequestForm(requestForm);
      navigation.navigate('Map', { showConfirmButton: true });
    })();
  };

  return (
    <HStack space={1} style={props.styles || styles.search}>
      <GooglePlacesAutocomplete
        styles={
          props.error ? searchBarErrorStyles : searchBarStyles(!!props.styles)
        }
        placeholder="Search with address/pincode/anything"
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
        ref={inputRef}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: 'en',
          components: 'country:in',
        }}
      />
      <TouchableOpacity style={styles.image} onPress={() => getLocation()}>
        <Image source={require('../../assets/images/gps.png')} />
      </TouchableOpacity>
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
    position: 'absolute',
    left: 295,
    top: 15,
  },
});

const selector = createSelector(
  (state: any) => state.app,
  (app: AppInitialState) => ({ app }),
);

export default connect(selector, bindDispatch)(PlacesAutoComplete);
