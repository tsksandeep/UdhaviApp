import React, { forwardRef } from 'react';
import { searchBarStyles } from '../PlacesAutoComplete/constants/searchBar';
import { HStack } from 'native-base';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Constants from 'expo-constants';
import { css } from '@emotion/native';

const GOOGLE_PLACES_API_KEY = Constants.manifest?.extra?.GOOGLE_PLACES_API_KEY;
const latDelta = 0.3;
const lngDelta = 0.2;

const MapScreenAutoComplete = forwardRef((props: any, ref: any) => {
  async function getLatLongFromAutoComplete(apiData: any) {
    const placeCode = apiData.place_id;
    const reqUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeCode}&key=${GOOGLE_PLACES_API_KEY}`;
    const response = await fetch(reqUrl);
    const json = await response.json();

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
    if (ref) {
      ref.current.animateToRegion(newRegion, 500);
    }
  }

  return (
    <HStack space={1} style={MapSearchStyle.search}>
      <GooglePlacesAutocomplete
        suppressDefaultStyles={true}
        styles={searchBarStyles}
        placeholder="Search address or pincode or anything"
        onPress={(data, details = null) => {
          setLocationByAutoCompleteResult(data);
        }}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: 'en',
          components: 'country:in',
        }}
      />
    </HStack>
  );
});

const MapSearchStyle = {
  search: css`
    position: absolute;
    align-items: center;
    width: 100%;
    background-color: white;
    min-height: 40px;
    border: 1.5px solid black;
    padding: 0 10px;
  `,
};

export default MapScreenAutoComplete;
