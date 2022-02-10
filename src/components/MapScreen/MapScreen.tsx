import React, { useRef, useState } from 'react';
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

const latDelta = 0.3;
const lngDelta = 0.2;

const mockData = require('../../mock-server/mockData.json');

const MapScreen = ({ app, actions }) => {
  const mapViewRef = useRef(null);

  const [selectedCoordinates, setSelectedCoordinates] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [isMapReady, setIsMapReady] = useState(false);
  const [requesterMarkerCoordinates, setRequesterMarkerCoordinates] = useState({
    lat: 0,
    lng: 0,
  });

  const getInitialRegion = () => {
    return {
      latitude: app?.requestForm?.location?.latitude || 13.042913472281159,
      longitude: app?.requestForm?.location?.longitude || 80.1745111895118,
      latitudeDelta: app?.requestForm?.location?.latitude ? 0.01 : latDelta,
      longitudeDelta: app?.requestForm?.location?.longitude ? 0.01 : lngDelta,
    };
  };

  const onSelectCallback = (item: any, type: string) => {};

  const handleDragEnd = (event: any) => {
    const coordinates = event.nativeEvent.coordinate;
    setSelectedCoordinates(coordinates);
  };

  const volunteerMarker = () => {
    return (
      <View>
        {Object.values(mockData.Volunteers).map((item: any) => (
          <Marker
            coordinate={{
              latitude: item.Lat,
              longitude: item.Long,
            }}
            key={item.ID.toString()}
            identifier={item.ID.toString()}
            description={item.Status}
            title={item.Name}
            onPress={() => onSelectCallback(item, 'volunteers')}
            icon={require('../../assets/marker/volunteer_default.ios.png')}
          ></Marker>
        ))}
      </View>
    );
  };

  const requesterMarker = () => {
    return (
      <View>
        {Object.values(mockData.Requests).map((item: any) => (
          <Marker
            coordinate={{
              latitude: Number(item.Lat),
              longitude: Number(item.Long),
            }}
            identifier={item.ID.toString()}
            key={item.ID.toString()}
            description={item.Status}
            title={item.Name}
            onPress={() => onSelectCallback(item, 'request')}
            icon={require('../../assets/marker/request_default.ios.png')}
          ></Marker>
        ))}
      </View>
    );
  };

  const onMapLayout = () => {
    setIsMapReady(true);
  };

  const makeRequest = async (requestForm) => {
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
      },
      deliveryTime: requestForm.deliveryTime,
      notes: requestForm.notes,
      date: date,
      assignedVolunteerIds: [],
    };
    await writeRequestData(requestData);
  };

  const updateCoordinates = () => {
    const requestForm = { ...app.requestForm };
    requestForm.location.latitude =
      selectedCoordinates.latitude || app?.requestForm?.location?.latitude;
    requestForm.location.longitude =
      selectedCoordinates.longitude || app?.requestForm?.location?.latitude;
    actions.createRequestForm(requestForm);
    makeRequest(requestForm);
  };

  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{
          flex: 1,
          minHeight: Dimensions.get('window').height - 100,
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
        {isMapReady && app?.requestForm?.location?.latitude > 0 && (
          <Marker
            draggable
            coordinate={{
              latitude: app?.requestForm?.location.latitude,
              longitude: app?.requestForm?.location.longitude,
            }}
            onDragEnd={handleDragEnd}
          />
        )}
      </MapView>
      <Button onPress={updateCoordinates}>Confirm</Button>
    </View>
  );
};

const selector = createSelector(
  (state: any) => state.app,
  (app: AppInitialState) => ({ app }),
);

export default connect(selector, bindDispatch)(MapScreen);
