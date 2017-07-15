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
import {downloadUserData,feedProfile,downloadUsersList} from '../actions/ProfileActions'
//Dimensioni schermata
const { width, height } = Dimensions.get("window");

const background = require("../images/main2_bg.png");

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            starCount: 1
        };
    }
    componentWillMount() {
        this.props.downloadUserData({idUser: this.props.navigation.state.params.userID});
        this.props.downloadUsersList();
    }

    renderStarButton(){
        return (
        <Button buttonText = 'Vota' onPress={()=>this.props.feedProfile({
            idUser: this.props.navigation.state.params.userID,
            star: this.state.starCount,
            userList: this.props.list,
            feeder: this.props.activeUser.uid,
            listOfFeeder: this.props.listOfFeeder})}/>
        )
    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
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
                    <View style={{alignItems:'center'}}>
                        <Text style={styles.infoTextTitle}> Vota Utente </Text>    
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={this.state.starCount}
                            starColor={'yellow'}
                            starSize={50}
                            selectedStar={(rating) => this.onStarRatingPress(rating)}
                            starStyle={{paddingTop:5}}
                        />
                        
                    </View>
                    {this.renderStarButton()}
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
    username: state.profile.username,
    email: state.profile.email,
    phone: state.profile.phone,
    feedback: state.profile.feedback,
    numberOfFeed: state.profile.nFeed,
    listOfFeeder: state.profile.feeder,
    isLoading: state.profile.isLoading,
    list: state.profile.usersList,
    activeUser: state.authLogin.userData,
});

export default connect(mapStateToProps, {downloadUserData,feedProfile,downloadUsersList}) (Profile);