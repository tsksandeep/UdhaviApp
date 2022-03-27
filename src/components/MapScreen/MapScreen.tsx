import React, { useRef, useState } from 'react';
import { SafeAreaView, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { css } from '@emotion/native';

import RequestDefaultMarker from '../../assets/marker/Request_default_marker.png';

const DEFAULT_LAT = 11.127123;
const DEFAULT_LON = 78.656891;

const MapScreen = ({ requestLocation }: { requestLocation: any }) => {
  const mapViewRef = useRef(null);
  const [isMapReady, setIsMapReady] = useState(false);

  const onMapLayout = () => {
    setIsMapReady(true);
  };

  const marker = () => {
    const showMarker =
      isMapReady && requestLocation?.lat > 0 && requestLocation?.lng > 0;
    if (!showMarker) {
      return <></>;
    }

    return (
      <Marker
        coordinate={{
          latitude: requestLocation?.lat,
          longitude: requestLocation?.lng,
        }}
      >
        <Image
          source={RequestDefaultMarker}
          style={{ height: 40, width: 40 }}
        />
      </Marker>
    );
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
        region={{
          latitude: requestLocation?.lat ? requestLocation?.lat : DEFAULT_LAT,
          longitude: requestLocation?.lng ? requestLocation?.lng : DEFAULT_LON,
          latitudeDelta: requestLocation?.lat ? 0.015 : 6,
          longitudeDelta: requestLocation?.lng ? 0.015 : 6,
        }}
        onMapReady={onMapLayout}
      >
        {marker()}
      </MapView>
    </SafeAreaView>
  );
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
  `,
};

export default MapScreen;
