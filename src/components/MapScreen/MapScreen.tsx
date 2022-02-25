import React, { useEffect, useRef, useState } from 'react';
import { View, Dimensions } from 'react-native';
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

const latDelta = 0.3;
const lngDelta = 0.2;

const mockData = require('../../mock-server/mockData.json');
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

  const [selectedCoordinates, setSelectedCoordinates] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [isMapReady, setIsMapReady] = useState(false);
  const [requesterLocation, setRequesterLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const getLocation = async () => {
    Location.setGoogleApiKey(GOOGLE_PLACES_API_KEY);
    let { coords }: any = await Location.getCurrentPositionAsync();
    setRequesterLocation(coords);
  };

  const getInitialRegion = () => {
    if (
      !app?.requestForm?.location?.latitude &&
      !app?.requestForm?.location?.longitude &&
      !requesterLocation?.latitude &&
      !requesterLocation?.longitude
    ) {
      getLocation();
    }
    return {
      latitude:
        app?.requestForm?.location?.latitude || requesterLocation?.latitude,
      longitude:
        app?.requestForm?.location?.longitude || requesterLocation?.longitude,
      latitudeDelta: app?.requestForm?.location?.latitude ? 0.01 : latDelta,
      longitudeDelta: app?.requestForm?.location?.longitude ? 0.01 : lngDelta,
    };
  };

  const handleDragEnd = (event: any) => {
    const coordinates = event.nativeEvent.coordinate;
    setSelectedCoordinates(coordinates);
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
  };

  const updateCoordinates = () => {
    const requestForm = cloneDeep(app.requestForm);
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
        {app.requestList.map((request: RequestForm, index: number) => (
          <Marker
            key={index}
            coordinate={{
              latitude: request.location.latitude,
              longitude: request.location.longitude,
            }}
          ></Marker>
        ))}
      </View>
    );
  };

  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{
          height: Dimensions.get('window').height - 200,
          minWidth: Dimensions.get('window').width,
        }}
        ref={mapViewRef}
        zoomEnabled={true}
        zoomControlEnabled={true}
        moveOnMarkerPress={false}
        customMapStyle={customMapStyle}
        initialRegion={getInitialRegion()}
        onMapReady={onMapLayout}
      >
        {isMapReady &&
          (app?.requestForm?.location?.latitude > 0 ||
            requesterLocation?.latitude) && (
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
        {allRequestMarker()}
      </MapView>
      {route?.params?.showConfirmButton && (
        <Button onPress={updateCoordinates}>Confirm</Button>
      )}
    </View>
  );
};

const selector = createSelector(
  (state: any) => state.app,
  (app: AppInitialState) => ({ app }),
);

export default connect(selector, bindDispatch)(MapScreen);
