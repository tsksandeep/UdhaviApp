import React, { useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { AppInitialState } from '../../store/reducers/app';
import bindDispatch from '../../utils/actions';
import translate from '../../utils/language.util';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { customMapStyle } from './constants/map';

const latDelta = 0.3;
const lngDelta = 0.2;

const markers = [
  {
    title: 'Ram',
    coordinates: {
      latitude: 13.042913472281159,
      longitude: 80.1745111895118,
    },
  },
  {
    title: 'Vijay',
    coordinates: {
      latitude: 14.042913472281159,
      longitude: 80.1745111895118,
    },
  },
];

const mockData = require('../../mock-server/mockData.json');

const MapScreen = () => {
  useEffect(() => {}, []);
  const mapViewRef = useRef(null);

  const [selectedCoordinates, setSelectedCoordinates] = useState({
    latitude: 0,
    longitude: 0,
  });

  const getInitialRegion = () => {
    return {
      latitude: 13.042913472281159,
      longitude: 80.1745111895118,
      latitudeDelta: latDelta,
      longitudeDelta: lngDelta,
    };
  };

  const filterByCategory = (key: string, values: any) =>
    values.filter((value: any) => value.status === key);

  const onSelectCallback = (item: any, type: string) => {};

  const handleDragEnd = (coordinates: any) => {
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

  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ width: '100%', height: '100%' }}
        ref={mapViewRef}
        zoomEnabled={true}
        zoomControlEnabled={true}
        moveOnMarkerPress={false}
        customMapStyle={customMapStyle}
        initialRegion={getInitialRegion()}
      >
        {markers.map((item) => (
          <Marker
            draggable
            coordinate={
              selectedCoordinates.latitude
                ? selectedCoordinates
                : item.coordinates
            }
            title={item.title}
            onDragEnd={handleDragEnd}
          />
        ))}
        {volunteerMarker}
        {requesterMarker}
      </MapView>
    </View>
  );
};

const selector = createSelector(
  (state: any) => state.app,
  (app: AppInitialState) => ({ app }),
);

export default connect(selector, bindDispatch)(MapScreen);
