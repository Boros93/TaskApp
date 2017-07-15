import React from 'react';
import { TextInput, Image, View, KeyboardAvoidingView} from 'react-native';


const TextInputWithIcon = ({onChangeText, placeholderText, iconImage, isPassword, type}) => {
    const { iconWrap, icon, input, inputWrap } = styles;
    return(
        
        <KeyboardAvoidingView behavior='padding' style={inputWrap}>
            <View style={iconWrap}>
                <Image source={iconImage} style={icon} resizeMode="contain" />
            </View>
            <TextInput 
                onChangeText = {onChangeText}
                placeholderTextColor="white"
                placeholder={placeholderText}
                selectionColor="#F89406"
                underlineColorAndroid = "#F89406"
                style={input} 
                secureTextEntry  = {isPassword}
                keyboardType = {type}
            />
        </KeyboardAvoidingView>
    );
};

const styles = 
{
    iconWrap: {
        paddingHorizontal: 7,
        alignItems: "center",
        justifyContent: "center",
    },

    icon: {
        height: 20,
        width: 20,
    },

    input: {
        flex: 1,
        paddingHorizontal: 10,
        fontSize : 16,
        color:'white',
    },

    inputWrap: {
        flexDirection: "row",
        marginVertical: 10,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: "#CCC"
    },
};

export { TextInputWithIcon };
