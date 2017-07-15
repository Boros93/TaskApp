import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  Dimensions,
  StyleSheet,
  Alert
} from 'react-native';
import{Button, TextInputWithIcon, BackButton}from '../components/index';
import * as Animatable from 'react-native-animatable';
import firebase from 'firebase';
import {resetPassword} from '../actions/AuthActions';
import { connect } from 'react-redux';

//Dimensioni schermata
const { width, height } = Dimensions.get("window");

//immagini
const background = require("../images/signup_bg.png");
const emailIcon = require("../images/icon_email.png");

class ForgotPassword extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            email:""
        }
    }

    //Metodo per recuperare la password
    renderReset(){
        if (this.props.isLoading) {
            Alert.alert(
            title = "",
            message = "Sto caricando...",
            )
        }
        return (
            <Button buttonText = 'Conferma' onPress={()=> this.props.resetPassword({
            email: this.state.email,
            navigateTo: (screen) => this.props.navigation.navigate(screen)})}/>
        )
    }

    render() {
        const {goBack} = this.props.navigation;
        return(
            <View style = {styles.container}>
                <Image source={background} style={styles.background} resizeMode="cover">
                    <BackButton onPress = {() =>goBack(null)}/>

                    <View style={styles.titleWrapper}>
                        <Text style={styles.title}> Password Dimenticata </Text>
                    </View>

                    <Animatable.View animation="fadeIn" easing='linear' style={styles.wrapper}>

                        <TextInputWithIcon 
                            onChangeText = {text => this.setState({ email: text })}
                            placeholderText = "Email"
                            iconImage = {emailIcon}
                        />

                        {this.renderReset()}

                    </Animatable.View>
                </Image>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container : {
        flex:1,
    },

    background: {
        width,
        height,
    },
    
    headerWrapper: {
        alignItems:'flex-start',
        paddingTop: 20,
        paddingLeft: 10,
    },

    titleWrapper:{
        alignItems:'center',
    },

    title: {
        fontSize: 25,
        color:'white',
    },

    wrapper: {
        paddingVertical: 30,
    },

})

const mapStateToProps = state => ({
  isLoading: state.authForgot.loading,
  error: state.authForgot.error
});

export default connect(mapStateToProps, { resetPassword } ) (ForgotPassword);