import React, { Component } from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView
} from 'react-native';
import{Button, TextInputWithIcon, BackButton}from '../components/index';
import * as Animatable from 'react-native-animatable';
import{Thumbnail,Spinner} from 'native-base';
import firebase from 'firebase';
import {registerUser} from '../actions/AuthActions';
import { connect } from 'react-redux';

//Dimensioni schermata
const { width, height } = Dimensions.get("window");


//immagini
const background = require("../images/signup_bg.png");
const backIcon = require("../images/icon_back.png");
const personIcon = require("../images/icon_person.png");
const lockIcon = require("../images/icon_lock.png");
const phoneIcon = require("../images/icon_phone.png");
const emailIcon = require("../images/icon_email.png");
const avatarIcon = require("../images/user_icon.png");



class Register extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            username:"",
            email:"",
            password:"",
            phone:"",
        }
    }

    //Metodo per registrarsi 
    renderRegister() {
        if (this.props.isLoading) {
            /*Alert.alert(
                title = "",
                message = "Sto caricando...",
            )*/
            <Spinner/>
        }
        return (
            <Button buttonText = 'Registrati' onPress={()=> this.props.registerUser({
                email: this.state.email,
                password: this.state.password,
                username: this.state.username,
                phone: this.state.phone,
                navigateTo: (screen) => this.props.navigation.navigate(screen)})}/>
        )
    }

    
    render() {
        const {goBack} = this.props.navigation;
        return(
            <View style = {styles.container}>

                <Image source={background} style={styles.background} resizeMode="cover">
                    <View style={styles.topContainer}>
                        <BackButton onPress = {() =>goBack(null)}/>
                        <View style={styles.titleWrapper}>
                            <Text style={styles.title}> Registrati </Text>
                        </View>
                        <Animatable.View animation="pulse" iterationCount="infinite" easing="linear" style={styles.avatarWrapper}>
                            <TouchableOpacity>
                                <Thumbnail large source={avatarIcon} />
                            </TouchableOpacity>
                        </Animatable.View>
                    </View>
                    {/*Input form*/}
                    <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
                        <TextInputWithIcon 
                            onChangeText = {(username)=>this.setState({username})}
                            placeholderText = "Username"
                            iconImage = {personIcon}
                        />
                        <TextInputWithIcon 
                            onChangeText = {(password)=>this.setState({password})}
                            placeholderText = "Password"
                            iconImage = {lockIcon}
                            isPassword = {true}
                        />
                        <TextInputWithIcon 
                            onChangeText = {(email)=>this.setState({email})}
                            placeholderText = "Email"
                            iconImage = {emailIcon}
                        />
                        <TextInputWithIcon 
                            onChangeText = {(phone)=>this.setState({phone})}
                            placeholderText = "Telefono"
                            iconImage = {phoneIcon}
                            type='numeric'
                        />

                        {this.renderRegister()}
                    </KeyboardAvoidingView>
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
    //freccia per tornare indietro
    headerWrapper: {
        alignItems:'flex-start',
        paddingTop: 20,
        paddingLeft: 10,
    },

    mark: {
        width: null,
        height: null,
        flex: 1,
    },

    titleWrapper:{
        alignItems:'center',
    },

    title: {
        fontSize: 36,
        color:'white',
    },

    wrapper: {
        paddingVertical: 60,
    },

    topContainer:{
        flex:1,
    },

    avatarWrapper:{
        alignItems:'center',
        paddingTop:30,
    },

});

const mapStateToProps = state => ({
  isLoading: state.authRegister.loading,
  error: state.authRegister.error
});

export default connect(mapStateToProps, { registerUser } ) (Register);