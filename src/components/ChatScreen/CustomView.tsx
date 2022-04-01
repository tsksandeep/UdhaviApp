import React from 'react';
import { Platform, TouchableOpacity, View, Text } from 'react-native';
import { Image } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import * as Linking from 'expo-linking';
import { css } from '@emotion/native';

import RequestDefaultMarker from '../../assets/marker/Request_default_marker.png';

const LocationCustomView = (props: any) => {
  const openMaps = async () => {
    const url = Platform.select({
      ios: `http://maps.apple.com/?ll=${latitude},${longitude}`,
      android: `http://maps.google.com/?q=${latitude},${longitude}`,
    });

    const supported = await Linking.canOpenURL(url!);
    if (supported) {
      return null;
    }

    return Linking.openURL(url!);
  };

  return (
    <TouchableOpacity
      onPress={openMaps}
      style={CustomViewStyle.mapViewContainer}
    >
      <View style={CustomViewStyle.mapViewWrapper}>
        <MapView
          style={CustomViewStyle.mapView}
          region={{
            latitude: props.latitude,
            longitude: props.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          scrollEnabled={false}
          zoomEnabled={false}
        >
          <Marker
            coordinate={{
              latitude: props.latitude,
              longitude: props.longitude,
            }}
          >
            <Image
              source={RequestDefaultMarker}
              alt="markerImg"
              style={{ height: 30, width: 30 }}
            />
          </Marker>
        </MapView>
      </View>
    </TouchableOpacity>
  );
};

const FileCustomView = (props: any) => {
  return (
    <View style={CustomViewStyle.fileView}>
      <Text style={CustomViewStyle.fileText}>{props.filename}</Text>
    </View>
  );
};

const ContactCustomView = (props: any) => {
  return (
    <View style={CustomViewStyle.contactView}>
      <Text key={0} style={CustomViewStyle.contactText}>
        {props.name}
      </Text>
      {props.phoneNumbers.map((number: string, index: number) => {
        return (
          <Text key={index + 1} style={CustomViewStyle.contactText}>
            {number}
          </Text>
        );
      })}
    </View>
  );
};

const TextCustomView = (props: any) => {
  return (
    <View style={CustomViewStyle.contactView}>
      <Text style={CustomViewStyle.contactText}>{props.text}</Text>
    </View>
  );
};

const ImageCustomView = (props: any) => {
  return (
    <View style={CustomViewStyle.imageViewWrapper}>
      <Image
        source={{ uri: props.src }}
        alt="localImg"
        // @ts-ignore: Style is valid
        style={CustomViewStyle.imageView}
      />
    </View>
  );
};

const CustomView = (props: any) => {
  const { currentMessage } = props;

  if (currentMessage.text) {
    return <TextCustomView text={currentMessage.text} />;
  }

  if (currentMessage.image) {
    return <ImageCustomView src={currentMessage.image} />;
  }

  if (currentMessage.location) {
    return (
      <LocationCustomView
        latitude={currentMessage.location.latitude}
        longitude={currentMessage.location.longitude}
      />
    );
  }

  if (currentMessage.file) {
    let filename: string = currentMessage.file.substring(
      currentMessage.file.lastIndexOf('/') + 1,
    );
    return <FileCustomView filename={filename} />;
  }

  if (currentMessage.sharedContact) {
    let name = currentMessage.sharedContact.firstName;
    if (currentMessage.sharedContact.lastName) {
      name += ' ' + currentMessage.sharedContact.lastName;
    }

    let phoneNumbers: any = [];
    currentMessage.sharedContact.phoneNumbers.forEach((phoneNumber: any) => {
      phoneNumbers.push(phoneNumber.number);
    });

    return <ContactCustomView name={name} phoneNumbers={phoneNumbers} />;
  }

  return null;
};

const CustomViewStyle = {
  mapViewContainer: css`
    width: 150px;
    height: 150px;
    padding: 2px;
  `,
  mapViewWrapper: css`
    overflow: hidden;
    border-radius: 15px 15px 10px 10px;
  `,
  mapView: css`
    width: 100%;
    height: 100%;
  `,
  fileView: css`
    margin: 2px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 15px 15px 10px 10px;
    padding: 10px 8px;
  `,
  fileText: css`
    color: #fff;
    font-weight: 500;
  `,
  imageViewWrapper: css`
    width: 200px;
    height: 200px;
    margin: 2px;
  `,
  imageView: css`
    width: 100%;
    height: 100%;
    border-radius: 15px 15px 10px 10px;
  `,
  contactView: css`
    margin: 2px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 16px 16px 10px 10px;
    padding: 10px 8px;
  `,
  contactText: css`
    color: #fff;
    font-weight: 500;
    margin: 2px 0;
  `,
  tickView: css`
    flex-direction: row;
  `,
  tick: css`
    background-color: transparent;
    color: white;
  `,
};

export default CustomView;
