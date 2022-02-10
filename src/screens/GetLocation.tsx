import React from 'react';
import { Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { css } from '@emotion/native';
import PlacesAutoComplete from '../components/PlacesAutoComplete/PlacesAutoComplete';
import {} from 'react-native-gesture-handler';

const GetLocation = () => {
  return (
    <SafeAreaView style={getLocationStyles.container}>
      <Text style={getLocationStyles.header}>Your Location</Text>
      <ScrollView keyboardShouldPersistTaps="always">
        <PlacesAutoComplete styles={styles.locationInput}></PlacesAutoComplete>
      </ScrollView>
    </SafeAreaView>
  );
};

const getLocationStyles = {
  container: css`
    flex: 1;
    background: white;
    padding: 70px 30px 0px 30px;
  `,
  header: css`
    width: 100%;
    text-align: center;
    font-family: 'Pacifico';
    font-size: 40px;
    margin-bottom: 20px;
    padding: 0 10px;
    color: #560cce;
  `,
};

const styles = StyleSheet.create({
  locationInput: {
    width: ' 100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    marginTop: 200,
  },
});

export default GetLocation;
