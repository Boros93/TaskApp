import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import{Button, TextInputWithIcon, TouchableText}from '../components/index';
import * as Animatable from 'react-native-animatable';
import firebase from 'firebase';
import {loginUser} from '../actions/AuthActions';
import { connect } from 'react-redux';


const { width, height } = Dimensions.get("window");

const background = require("../images/login_bg.png");
const mark = require("../images/icon_mark.png");
const lockIcon = require("../images/icon_lock.png");
const personIcon = require("../images/icon_person.png");




class Root extends Component {

  state = { email : ' ', password : ' ', animationType:'pulse' };

  //Funzioni per gestire i pulsanti
  handleRegisterPress = () => {
        this.props.navigation.navigate('Register');
  };

  handleForgotPress = () => {
        this.props.navigation.navigate('ForgotPassword');
  };
  

  renderLogin() {
    if (this.props.isLoading) {
      Alert.alert(
        title = "",
        message = "Sto caricando...",
      )
      //if(this.state.animationType!='rotate')
        //this.setState({animationType:'rotate'});
    }
    return (
      <Button buttonText = 'Accedi' onPress={()=> this.props.loginUser({
        email: this.state.email,
        password: this.state.password,
        navigateTo: (screen) => this.props.navigation.navigate(screen)})}/>
    )
  }
  

  render() {
    return (
      <View style={styles.container}>
        <Image source={background} style={styles.background} resizeMode="cover">
          <View style={styles.markWrap}>
            <Animatable.Image animation='pulse' iterationCount="infinite" easing="linear" source={mark} style={styles.mark} resizeMode="contain" />
          </View>
          <Animatable.View animation="fadeIn" style={styles.wrapper}>

            <TextInputWithIcon 
                onChangeText = {text => this.setState({ email: text })}
                placeholderText = "Email"
                iconImage = {personIcon}
            />

            <TextInputWithIcon 
                onChangeText = {text => this.setState({ password: text })}
                placeholderText = "Password"
                iconImage = {lockIcon}
                isPassword = {true}
            />

            <TouchableText
                  onPress={this.handleForgotPress}
                  text='Hai dimenticato la password?'
            />

            {/*Pulsante per loggarsi*/}
            {this.renderLogin()}

          </Animatable.View>
            <View style={styles.container}>
              <View style={styles.signupWrap}>
                <Text style={{color: '#D8D8D8'}}>Non hai un account?</Text>
                <TouchableText
                  onPress={this.handleRegisterPress}
                  text='Registrati'
                />
              </View>
          </View>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  markWrap: {
    flex: 1,
    paddingVertical: 30,
  },

  mark: {
    width: null,
    height: null,
    flex: 1,
  },

  background: {
    width,
    height,
  },

  wrapper: {
    paddingVertical: 30,
  },

  signupWrap: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

});

const mapStateToProps = state => ({
  isLoading: state.authLogin.loading,
  error: state.authLogin.error
});

export default connect(mapStateToProps, { loginUser } ) (Root);
