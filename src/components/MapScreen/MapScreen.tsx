import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Text, SafeAreaView, Image } from 'react-native';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { AppInitialState } from '../../store/reducers/app';
import bindDispatch from '../../utils/actions';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { customMapStyle } from './constants/map';
import Button from '../Button/Button';
import { writeRequestData } from '../../firebase/requests';
import { generateHash } from '../../helpers/hash';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import { cloneDeep } from 'lodash';
import { RequestData, LocationType } from '../../firebase/model';
import { RequestForm } from '../../store/reducers/modal/app.modal';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { css } from '@emotion/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import RequestDefaultMarker from '../../assets/marker/Request_default_marker.png';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';

const totalStatusBarHeight = (10 + getStatusBarHeight()).toString();

const latDelta = 0.3;
const lngDelta = 0.2;

const DEFAULT_LAT = 11.127123;
const DEFAULT_LON = 78.656891;

const GOOGLE_PLACES_API_KEY = Constants.manifest?.extra?.GOOGLE_PLACES_API_KEY;

const MapScreen = ({
  app,
  actions,
  route,
  fullscreen,
  requestLocation,
  setRequestLocation,
}: {
  actions?: any;
  app?: any;
  route?: any;
  fullscreen?: boolean;
  requestLocation?: any;
  setRequestLocation?: any;
}) => {
  const mapViewRef = useRef(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [selectedCoordinates, setSelectedCoordinates] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [initialRegion, setInitialRegion] = useState({
    latitude: DEFAULT_LAT,
    longitude: DEFAULT_LON,
    latitudeDelta: 6,
    longitudeDelta: 6,
  });

  const [isMapReady, setIsMapReady] = useState(false);
  const [requesterLocation, setRequesterLocation] = useState({
    latitude: null,
    longitude: null,
  });

  // useEffect(() => {
  //   actions.setInitialRequests(app.user.phoneNumber);
  // }, [app.requestForm]);

  useEffect(() => {
    getInitialRegion();
  }, [requestLocation]);

  const getLocation = async () => {
    Location.setGoogleApiKey(GOOGLE_PLACES_API_KEY);
    let { coords }: any = await Location.getCurrentPositionAsync();
    if (coords.latitude) {
      setRequesterLocation(coords);
    }
  };

  const getInitialRegion = () => {
    if (requestLocation.lat && requestLocation.lng) {
      setInitialRegion({
        latitude: requestLocation.lat,
        longitude: requestLocation.lng,
        latitudeDelta: app?.requestForm?.location?.latitude ? 0.01 : latDelta,
        longitudeDelta: app?.requestForm?.location?.longitude ? 0.01 : lngDelta,
      });
    }
  };

  const handleDragEnd = async (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setRequestLocation({ lat: latitude, lng: longitude });
    // const coordinates = event.nativeEvent.coordinate;
    // setSelectedCoordinates(coordinates);
    // let regionName = await Location.reverseGeocodeAsync({
    //   longitude,
    //   latitude,
    // });
    // const { city, district, region, country, subregion } = regionName[0];
    // actions.updateRequestAddress(
    //   `${city || ''}, ${district || subregion || ''}, ${region || ''}, ${
    //     country || ''
    //   }`,
    // );
  };

  const onMapLayout = () => {
    setIsMapReady(true);
  };

  const makeRequest = async (requestForm: RequestForm) => {
    const date = new Date().getTime();
    const requestData = {
      id: generateHash(
        requestForm.name + requestForm.phoneNumber + date.toString(),
      ),
      name: requestForm.name,
      phoneNumber: requestForm.phoneNumber,
      requestorPhoneNumber: requestForm.requestorPhoneNumber,
      info: requestForm.info,
      location: {
        latitude: requestForm.location.latitude,
        longitude: requestForm.location.longitude,
      } as LocationType,
      deliveryTime: requestForm.deliveryTime,
      notes: requestForm.notes,
      date,
      status: requestForm.status,
      category: requestForm.category,
      assignedVolunteerIds: [''],
    } as RequestData;
    await writeRequestData(requestData);
    actions.createRequestForm({});
  };

  const updateCoordinates = () => {
    const requestForm = cloneDeep(app.requestForm);
    requestForm.phoneNumber = app.user.phoneNumber;
    requestForm.location.latitude =
      selectedCoordinates.latitude || requestForm?.location?.latitude;
    requestForm.location.longitude =
      selectedCoordinates.longitude || requestForm?.location?.longitude;
    actions.createRequestForm(requestForm);
    makeRequest(requestForm);
    navigation.navigate('Home', {});
  };

  const allRequestMarker = () => {
    return (
      <>
        {!route?.params?.showConfirmButton &&
          Object.values(app?.requestsMap)?.map(
            (request: any, index: number) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: request.location.latitude,
                  longitude: request.location.longitude,
                }}
              >
                <Image
                  source={RequestDefaultMarker}
                  style={{ height: 40, width: 40 }}
                />
              </Marker>
            ),
          )}
      </>
    );
  };

  const initialMarker = () => {
    const showMarker =
      isMapReady && requestLocation?.lat > 0 && requestLocation?.lng > 0;

    return (
      <>
        {showMarker && (
          <Marker
            draggable
            coordinate={{
              latitude: requestLocation?.lat,
              longitude: requestLocation?.lng,
            }}
            onDragEnd={handleDragEnd}
          >
            <Image
              source={RequestDefaultMarker}
              style={{ height: 40, width: 40 }}
            />
          </Marker>
        )}
      </>
    );
  };

  const getHeight = () => {
    if (fullscreen) {
      return Dimensions.get('window').height + 'px';
    }
    return Dimensions.get('window').height / 2.3 + 'px';
  };

  const getMinWidth = () => {
    return Dimensions.get('window').width + 'px';
  };

  const MapScreenStyle = {
    map: css`
      height: 300px;
      width: 100%;
    `,
    addressText: css`
      color: blue;
      margin-left: 20px;
    `,
    container: css`
      background: white;
      top: ${totalStatusBarHeight}px;
    `,
  };

  return (
    <SafeAreaView style={MapScreenStyle.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={MapScreenStyle.map}
        ref={mapViewRef}
        zoomEnabled={true}
        zoomControlEnabled={true}
        moveOnMarkerPress={false}
        customMapStyle={customMapStyle}
        initialRegion={initialRegion}
        region={initialRegion}
        onMapReady={onMapLayout}
      >
        {initialMarker()}
        {allRequestMarker()}
      </MapView>
      {route?.params?.showConfirmButton && (
        <Button onPress={updateCoordinates}>Confirm</Button>
      )}
      {route?.params?.showConfirmButton && (
        <Text style={MapScreenStyle.addressText}>{app.requestAddress}</Text>
      )}
    </SafeAreaView>
  );
};

const selector = createSelector(
  (state: any) => state.app,
  (app: AppInitialState) => ({ app }),
);

export default connect(selector, bindDispatch)(MapScreen);
