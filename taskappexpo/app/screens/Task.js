import React, { Component } from 'react';
import {
  Text,
  Dimensions,
  StyleSheet,
  Image,
  View,
  ScrollView,
  TextInput
} from 'react-native';
import{Button, MapComponent, TextInputWithIcon}from '../components/index';
import { connect } from 'react-redux';
import StarRating from 'react-native-star-rating';
import {downloadTask,selectTask} from '../actions/TaskActions';
//Dimensioni schermata
const { width, height } = Dimensions.get("window");

const background = require("../images/header_task_bg.png");
const {width: windowWidth} = Dimensions.get('window');



class Task extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            message:""
        }
    }
    componentWillMount() {
        this.props.downloadTask({idTask: this.props.navigation.state.params.tId,
                                 list: this.props.taskList});
    }

    renderMap(){
        if(!(this.props.data.region instanceof Object))
        {
            return(<Text> Caricamento in corso ... </Text>)
        }
        else
        {
            return(<View style={{alignSelf:'center'}}>
                <MapComponent 
                    width = {300}
                    height = {200}
                    region = {this.props.data.region}
                />
            </View>)
        }
    }

    rispondi(){
        if(this.state.message!="")
         this.props.selectTask({idTasker:this.props.activeUser.uid,
                                usernameTasker:this.props.usernameTasker,
                                taskList:this.props.taskList,
                                idTask: this.props.navigation.state.params.tId,
                                message:this.state.message })
        else{
            alert("Hai dimenticato di inserire un messaggio");
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style = {styles.topContainer}>
                    <Image style = {styles.imageContainer} source ={background}>
                            <Text style={styles.mainTitle}>{this.props.data.title}</Text>
                    </Image>
                </View>
                <View style={styles.bodyContainer}>
                    <View style={styles.infoWrapper}>
                        <Text style={styles.infoTextTitle}> Task di:</Text>
                        <Text style={styles.infoText}>{this.props.data.username}</Text>
                    </View>
                    <View style={styles.infoWrapper}>
                        <Text style={styles.infoTextTitle}> Categoria:</Text>
                        <Text style={styles.infoText}>{this.props.data.category}</Text>
                    </View>
                    <View>
                        <Text style={styles.infoTextTitle}> Descrizione(Clicca per ingrandire):</Text>
                        <Text style={styles.descriptionText} ellipsizeMode='tail' numberOfLines={2} onPress={()=>(alert(this.props.data.description))}>{this.props.data.description}</Text>
                    </View>
                    <View style={styles.infoWrapper}>
                        <Text style={styles.infoTextTitle}> Scadenza:</Text>
                        <Text style={styles.infoText}>{this.props.data.deadline}</Text>
                    </View>
                    <View style={styles.infoWrapper}>
                        <Text style={styles.infoTextTitle}> Budget:</Text>
                        <Text style={styles.infoText}>{this.props.data.budget}</Text>
                    </View>

                    {this.renderMap()}
                    <Text style={styles.infoText}>Vuoi inviare un messaggio?</Text>
                    <View style={styles.inputWrap}>
                        <TextInput 
                                selectionColor="#F89406"
                                underlineColorAndroid = "#F89406"
                                style={styles.input}
                                placeholder="Inserisci il messagio qui"
                                onChangeText = {(message)=>this.setState({message})}
                                multiline={true}/>
                    </View>
                    <Button buttonText="Rispondi" onPress={()=>(this.rispondi())}/>
                    <Button buttonText="Visualizza profilo dell'utente" onPress={()=>(this.props.navigation.navigate('Profile', {userID:this.props.navigation.state.params.uId}))}/>
                </View>
            </ScrollView>
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
        paddingTop:10,
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

    infoTextTitle:{
        paddingHorizontal: 2,
        fontSize : 20,
        fontWeight: 'bold',
        color:'#6C7A89',
    },

    infoText:{
        fontSize: 20,
        color:'#6C7A89'
    },

    infoWrapper:{
        flexDirection: "row",
        marginVertical: 10,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: "orange"
    },

    descriptionText:{
        fontSize: 20,
        color:'#6C7A89',
        paddingHorizontal:10
    },
    
    input:{
        flex:1,
        paddingHorizontal: 10,
        fontSize : 16,
        color:'#6C7A89',
    },

    inputWrap: {
        flexDirection: "row",
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: "#CCC",
    },
});

const mapStateToProps = state => ({
  data: state.task.activeTaskData,
  taskList: state.taskList.data,
  isLoading: state.task.loading,
  activeUser: state.authLogin.userData,
  usernameTasker: state.authLogin.username,
});
export default connect(mapStateToProps, {downloadTask,selectTask} ) (Task);

