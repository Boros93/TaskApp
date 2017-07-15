import React, { Component } from 'react';
import {
  Text,
  Dimensions,
  StyleSheet,
  Image,
  View,
} from 'react-native';
import{Button, BackButton}from '../components/index';
import { Container, Content, Icon} from 'native-base';
import * as Animatable from 'react-native-animatable';
import firebase from 'firebase';
import { connect } from 'react-redux';
import StarRating from 'react-native-star-rating';
//Dimensioni schermata
const { width, height } = Dimensions.get("window");

const background = require("../images/main2_bg.png");

class Account extends Component {

    handleCreateTaskPress = () => {
        this.props.navigation.navigate('TaskCreator');
    }

    handleShowUserTask = () => {
        this.props.navigation.navigate('TaskTabs');
    }
    buttonOrLoading(){
        if(this.props.isLoading)
        {
            return <View><Text style={styles.infoTextTitle}  > Attendi il caricamento! </Text></View>
        }
        else{
            return(
                <View>
                    <Button buttonText='Crea Task' onPress={this.handleCreateTaskPress}/>
                    <Button buttonText= 'Vai ai tuoi Task' onPress={this.handleShowUserTask}/>
                </View>
            )
        }
    }
    render() {
        return(
        <View style={styles.container}>
            <Image source={background} style={styles.background} resizeMode="cover">
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>{this.props.username}</Text>
                </View>
                <View style={styles.bodyWrapper}>
                    <View style={styles.infoWrapper}>
                        <Text style={styles.infoTextTitle}> Email: </Text>
                        <Text style={styles.infoText}> {this.props.email}</Text>
                    </View>
                    <View style={styles.infoWrapper}>
                        <Text style={styles.infoTextTitle}> Numero: </Text>
                        <Text style={styles.infoText}> {this.props.phone}</Text>
                    </View>
                    <View style={styles.infoWrapper}>
                        <Text style={styles.infoTextTitle}> Feedback: </Text>    
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={this.props.feedback}
                            starColor={'yellow'}
                            starSize={20}
                            starStyle={{paddingTop:5}}
                        />
                        <Text style={styles.infoText}> di {this.props.numberOfFeed} voti </Text>
                    </View>
                    {this.buttonOrLoading()}
                </View>
            </Image>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex:1
    },

    background: {
        width,
        height,
    },

    titleWrapper:{
        alignItems:'center',
    },

    title: {
        fontSize: 36,
        color:'white',
        textShadowColor:'black',
        textShadowOffset: {width: 1, height: 1} 
    },

    bodyWrapper:{
        paddingVertical: 20,
    },

    infoWrapper:{
        flexDirection: "row",
        marginVertical: 10,
        height: 40,
        borderBottomWidth: 1.5,
        borderBottomColor: "white"
    },

    infoTextTitle:{
        paddingHorizontal: 5,
        fontSize : 20,
        color:'white',
        textShadowColor:'black',
        textShadowOffset: {width: 1, height: .5} 
    },

    infoText:{
        paddingVertical: 2,
        fontSize: 18,
        color:'white',
        textShadowColor:'black',
        textShadowOffset: {width: .2, height: .2} 
    },

    starWrapper:{
        paddingBottom:10,
    }
});


const mapStateToProps = state => ({
    username: state.authLogin.username,
    email: state.authLogin.email,
    phone: state.authLogin.phone,
    feedback: state.authLogin.feedback,
    isLoading: state.taskList.isLoading,
    numberOfFeed: state.authLogin.nFeed,
});

export default connect(mapStateToProps) (Account);