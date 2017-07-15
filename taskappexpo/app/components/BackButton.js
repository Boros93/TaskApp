import React from 'react';
import {TouchableOpacity, View } from 'react-native';
import {Icon} from 'native-base';
const BackButton = ({ onPress, buttonText }) => {
  const { headerWrapper } = styles;
  return (
    <TouchableOpacity onPress = {onPress}>
        <View style = {headerWrapper}>
            <Icon name='arrow-back' style={{color:'white'}} size={30}/>
        </View>
    </TouchableOpacity>
  );
};

const styles = 
{
    headerWrapper: {
        alignItems:'flex-start',
        paddingTop: 20,
        paddingLeft: 10,
    },
};

export { BackButton };
