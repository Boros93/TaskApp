
import Expo, { MapView, Permissions, Location } from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const MapComponent = ({width, height, region, onChangeLocation, isDraggable}) =>
{
  return(
    <MapView
      style={{ width, height }}
      initialRegion={region}
      region={region}
    >
      <MapView.Marker
        draggable = {isDraggable}
        title="La tua posizione"
        coordinate={{
          latitude: region.latitude,
          longitude: region.longitude
        }}
        onDragEnd={onChangeLocation}
        pinColor="#F89406"
        />
    </MapView>
  );
}

export {MapComponent};