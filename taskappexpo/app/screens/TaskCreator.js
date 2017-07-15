import React, { Component } from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView, 
  TextInput,
  ScrollView,
  Picker
} from 'react-native';
import{Button, TextInputWithIcon, BackButton, MapComponent}from '../components/index';
import { Container, Content, Item, Input } from 'native-base';
import DatePicker from 'react-native-datepicker'
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import firebase from 'firebase';
import {createTask} from '../actions/TaskActions';
import Expo, { MapView, Permissions, Location } from 'expo';



const {width: windowWidth} = Dimensions.get('window');
console.ignoredYellowBox = [
    'Setting a timer'
];
const background = require("../images/header_bg.png");
//const { currentUser } = firebase.auth().uid;

class TaskCreator extends Component{

    constructor(props){
        super(props);
        this.state = {
            title: "",
            idTask: "",
            idUtente:"",
            description:"",
            deadline:"Seleziona una scadenza",
            status:"",
            category:"",
            budget:"",
            region: {
                latitude: 37.525729,
                longitude: 15.072030,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1
            },
            location: {
                coords: {
                    latitude: 37.525729,
                    longitude: 15.072030
                }
            },
        }
    }

    refreshLocation(location) {
        console.log(location);
        this.setState({
            region: {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1
            }
        });
    }
    retrieveUserLocation = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status != 'granted') {
            this.setState({ errorMessage: 'Permesso negato'});
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });
        this.setState({
            region: {
                ...this.state.region,
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            }
        });
    }
     //Metodo per registrarsi 
    renderConfirm() {
        return (
            <Button buttonText = 'Conferma' onPress={()=> this.props.createTask({
                title: this.state.title,
                description: this.state.description,
                budget: this.state.budget,
                category: this.state.category,
                deadline: this.state.deadline,
                region: this.state.region,
                userUid: this.props.user.uid,
                username: this.props.username,
                navigateTo: (screen) => this.props.navigation.navigate(screen)})}/>
        )
    }

    getToday(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd = '0'+dd
        } 

        if(mm<10) {
            mm = '0'+mm
        } 

        today = dd + '-' + mm + '-' + yyyy;
        return today;
    }

    componentWillMount() {
        this.retrieveUserLocation()
    }

    render() {
        const {goBack} = this.props.navigation;
        return(
            <KeyboardAvoidingView behavior='padding' style = {styles.container}>
                <View style = {styles.topContainer}>
                    <Image style = {styles.imageContainer} source ={background}>
                            <Text style={styles.mainTitle}>Crea Task</Text>
                    </Image>
                </View>
                <ScrollView style={styles.bodyContainer}>
                    <Text style={styles.inputText}> Titolo </Text>
                    <View style={styles.inputWrap}>
                        <TextInput style={styles.input}
                            onChangeText = {(title)=>this.setState({title})}
                            selectionColor="#F89406"
                            underlineColorAndroid = "#F89406"
                            style={styles.input}/>
                    </View>
                    <Text style={styles.inputText}> Descrizione </Text>
                    <View style={styles.inputWrap}>
                        <TextInput 
                            selectionColor="#F89406"
                            underlineColorAndroid = "#F89406"
                            style={styles.input}
                            onChangeText = {(description)=>this.setState({description})}
                            multiline={true}/>
                    </View>
                    <Text style={styles.inputText}> Budget </Text>
                    <View style={styles.inputWrap}>
                        <TextInput 
                            selectionColor="#F89406"
                            underlineColorAndroid = "#F89406"
                            style={styles.input}
                            onChangeText = {(budget)=>this.setState({budget})}
                            keyboardType='numeric'/>
                    </View>

                    <Picker
                        style={{color: '#6C7A89'}}
                        selectedValue={this.state.category}
                        onValueChange={(itemValue, itemIndex) => this.setState({category: itemValue})}>
                        <Picker.Item label="Seleziona categoria" value="Categoria" />
                        <Picker.Item label="Lezioni" value="lezioni" />
                        <Picker.Item label="Assistenza" value="assistenza" />
                        <Picker.Item label="Graphic Design" value="graphic design" />
                        <Picker.Item label="Manutenzione" value="manutenzione" />
                        <Picker.Item label="Trasloco" value="trasloco" />
                        <Picker.Item label="Lezioni" value="lezioni" />
                    </Picker>

                    <DatePicker
                        style={{width: 200 , paddingVertical:10}}
                        mode="date"
                        placeholder={this.state.deadline}
                        format="DD-MM-YYYY"
                        confirmBtnText="Conferma"
                        cancelBtnText="Annulla"
                        minDate={this.getToday()}
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36,
                                borderColor: '#F89406'
                            },
                             placeholderText: {
                                color: '#6C7A89'
                            },
                        }}
                        onDateChange={(date) => {this.setState({deadline: date})}}
                    />
                    <MapComponent 
                        width = {windowWidth}
                        height = {200}
                        region = {this.state.region}
                        location = {this.state.location}
                        isDraggable={true}
                        onChangeLocation={(location)=>this.refreshLocation(location.nativeEvent.coordinate)}
                     />
                    {this.renderConfirm()}
                </ScrollView>
            </KeyboardAvoidingView> 
        )
    }

}

const styles = StyleSheet.create({

    container : {
        flex:1,
    },

    topContainer : {
        flex:.4,
    },

    bodyContainer:{
        flex:2,
    },

    imageContainer:{
        width: windowWidth,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },

    mainTitle:{
        fontSize:35,
        color:"white",
        backgroundColor: 'transparent'
    },

    inputWrap: {
        flexDirection: "row",
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: "#CCC",
    },

    input:{
        flex:1,
        paddingHorizontal: 10,
        fontSize : 16,
        color:'#6C7A89',
    },

    inputText:{
        fontSize:15,
        color:'#6C7A89'
    }
 
});

const mapStateToProps = state => ({
  user: state.authLogin.userData,
  username: state.authLogin.username,
  isLoading: state.task.loading,
});

export default connect(mapStateToProps, { createTask }) (TaskCreator);