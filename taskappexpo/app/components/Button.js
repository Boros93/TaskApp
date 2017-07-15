import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const Button = ({ onPress, buttonText }) => {
  const { buttonStyle, textStyle } = styles;
  return (
    <TouchableOpacity activeOpacity={.5} onPress = {onPress}>

      <View style={buttonStyle}>
        <Text style={textStyle}>{buttonText}</Text>
      </View>

    </TouchableOpacity>
  );
};

const styles = 
{
  buttonStyle: {
    backgroundColor: "orange",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 50,
  },

  textStyle: {
    color: "#FFF",
    fontSize: 18,
  },
};

export { Button };
