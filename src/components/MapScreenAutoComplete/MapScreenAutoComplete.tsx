import React from 'react';
import { searchBarStyles } from '../PlacesAutoComplete/constants/searchBar';
import { HStack } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Constants from 'expo-constants';

type Props = {
  onSelectCoordinates: any;
};

const screenWidth = Dimensions.get('window').width;
const GOOGLE_PLACES_API_KEY = Constants.manifest?.extra?.GOOGLE_PLACES_API_KEY;
const latDelta = 0.3;
const lngDelta = 0.2;

const MapScreenAutoComplete = React.forwardRef((props: Props, ref: any) => {
  async function getLatLongFromAutoComplete(apiData: any) {
    const placeCode = apiData.place_id;
    const reqUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeCode}&key=${GOOGLE_PLACES_API_KEY}`;
    const response = await fetch(reqUrl);
    const json = await response.json();
    props.onSelectCoordinates(json.result.geometry.location);
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
    <HStack space={1} style={styles.search}>
      <GooglePlacesAutocomplete
        suppressDefaultStyles={true}
        styles={searchBarStyles}
        placeholder="Search with address/pincode/anything"
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

const styles = StyleSheet.create({
  search: {
    position: 'absolute',
    alignItems: 'center',
    top: 3,
    left: 2,
    width: screenWidth - 3,
    backgroundColor: 'white',
  },
});

export default MapScreenAutoComplete;
