import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  TextInput,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Container, Content, Icon} from 'native-base';
import {Button, TaskCard, TaskList} from '../components';
import firebase from 'firebase';
import {showOffer} from '../actions/TaskActions';
import { connect } from 'react-redux';

const { width, height } = Dimensions.get("window");

const background = require("../images/main_bg.png");


class Inbox extends Component {

    componentWillMount(){
        this.props.showOffer({idTask: this.props.navigation.state.params.tId,taskList:this.props.data})
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.bodyContainer}>
                    <View style={styles.infoWrapper}>
                        <Text style={styles.infoTextTitle}> Offerta di:</Text>
                        <Text style={styles.infoText}>{this.props.usernameTasker}</Text>
                    </View>
                    <View>
                        <Text style={styles.infoTextTitle}> Messaggio(Clicca per ingrandire): </Text>
                        <Text style={styles.descriptionText} ellipsizeMode='tail' numberOfLines={2} onPress={()=>(alert(this.props.message))}>{this.props.message}</Text>
                    </View>
                    <Button buttonText="Visualizza profilo dell'utente" onPress={()=>(this.props.navigation.navigate('Profile', {userID: this.props.idTasker}))}/>
                </View>
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
        color:'orange',
        textShadowColor:'#6C7A89',
        textShadowOffset: {width: 1, height: .5} 
    },

    infoText:{
        paddingVertical: 2,
        fontSize: 18,
        color:'#6C7A89',
    },

    starWrapper:{
        paddingBottom:10,
    },

    descriptionText:{
        fontSize: 20,
        color:'#6C7A89',
        paddingHorizontal:10
    },
});

const mapStateToProps = state => ({
    usernameTasker: state.task.usernameTasker,
    idTasker: state.task.idTasker,
    message: state.task.message,
    data: state.taskList.data,
});

export default connect(mapStateToProps, {showOffer}) (Inbox);