import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const TouchableText = ({ onPress, text, align }) => {
  const {textStyle } = styles;
  return (
    <TouchableOpacity activeOpacity={.5}>
        <View>
            <Text style={textStyle} textAlign={align} onPress={onPress}>{text}</Text>
        </View>
    </TouchableOpacity>
  );
};

const styles = 
{
  textStyle: {
    color: "#FFF",
    marginLeft: 5,
  },
};

export { TouchableText };