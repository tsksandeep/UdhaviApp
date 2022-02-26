import React, { useEffect, useRef, useState } from 'react';
import { View, Dimensions, Text, StyleSheet } from 'react-native';
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
import Logo from '../Logo/Logo';
import { css } from '@emotion/native';

const latDelta = 0.3;
const lngDelta = 0.2;

const GOOGLE_PLACES_API_KEY = Constants.manifest?.extra?.GOOGLE_PLACES_API_KEY;

const MapScreen = ({
  app,
  actions,
  route,
}: {
  actions?: any;
  app?: any;
  route?: any;
}) => {
  const mapViewRef = useRef(null);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    actions.setInitialRequests(app.user.phoneNumber);
  }, [app.requestForm]);

  const [selectedCoordinates, setSelectedCoordinates] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [isInitialRegionSet, setIsInitialRegionSet] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);
  const [requesterLocation, setRequesterLocation] = useState({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    if (
      !app?.requestForm?.location?.latitude &&
      !app?.requestForm?.location?.longitude &&
      !requesterLocation?.latitude &&
      !requesterLocation?.longitude
    ) {
      getLocation();
    }
  }, []);

  const getLocation = async () => {
    Location.setGoogleApiKey(GOOGLE_PLACES_API_KEY);
    let { coords }: any = await Location.getCurrentPositionAsync();
    setRequesterLocation(coords);
    setIsInitialRegionSet(true);
  };

  const getInitialRegion = () => {
    return {
      latitude:
        app?.requestForm?.location?.latitude || requesterLocation?.latitude,
      longitude:
        app?.requestForm?.location?.longitude || requesterLocation?.longitude,
      latitudeDelta: app?.requestForm?.location?.latitude ? 0.01 : latDelta,
      longitudeDelta: app?.requestForm?.location?.longitude ? 0.01 : lngDelta,
    };
  };

  const handleDragEnd = async (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const coordinates = event.nativeEvent.coordinate;
    setSelectedCoordinates(coordinates);
    let regionName = await Location.reverseGeocodeAsync({
      longitude,
      latitude,
    });
    const { city, district, region, country, subregion } = regionName[0];
    actions.updateRequestAddress(
      `${city || ''}, ${district || subregion || ''}, ${region || ''}, ${
        country || ''
      }`,
    );
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
      <View>
        {!route?.params?.showConfirmButton &&
          Object.values(app?.requestsMap)?.map(
            (request: any, index: number) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: request.location.latitude,
                  longitude: request.location.longitude,
                }}
              />
            ),
          )}
      </View>
    );
  };

  const initialMarker = () => {
    const showMarker =
      isMapReady &&
      (!Object.values(app?.requestsMap).length ||
        route?.params?.showConfirmButton) &&
      (app?.requestForm?.location?.latitude > 0 || requesterLocation?.latitude);

    return (
      <View>
        {showMarker && (
          <Marker
            draggable
            coordinate={{
              latitude:
                app?.requestForm?.location.latitude ||
                requesterLocation?.latitude,
              longitude:
                app?.requestForm?.location.longitude ||
                requesterLocation?.longitude,
            }}
            onDragEnd={handleDragEnd}
          />
        )}
      </View>
    );
  };

  return (
    <>
      {isInitialRegionSet ? (
        <View>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={MapScreenStyle.map}
            ref={mapViewRef}
            zoomEnabled={true}
            zoomControlEnabled={true}
            moveOnMarkerPress={false}
            customMapStyle={customMapStyle}
            initialRegion={getInitialRegion()}
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
        </View>
      ) : (
        <View style={MapScreenStyle.logo}>
          <Logo />
        </View>
      )}
    </>
  );
};

const getHeight = () => {
  return Dimensions.get('window').height / 2 + 'px';
};

const getMinWidth = () => {
  return Dimensions.get('window').width + 'px';
};

const MapScreenStyle = {
  map: css`
    height: ${getHeight()};
    min-width: ${getMinWidth()};
  `,
  logo: css`
    height: ${getHeight()};
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  addressText: css`
    color: blue;
    margin-left: 20px;
  `,
};

const selector = createSelector(
  (state: any) => state.app,
  (app: AppInitialState) => ({ app }),
);

export default connect(selector, bindDispatch)(MapScreen);
