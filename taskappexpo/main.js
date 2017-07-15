import Expo from 'expo';
import React from 'react';
import App from './app/index';


console.ignoredYellowBox = [
    'Setting a timer'
];
Expo.registerRootComponent(App);
