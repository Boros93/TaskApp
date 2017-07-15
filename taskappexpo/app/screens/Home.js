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
import {downloadList} from '../actions/TaskListActions';
import { connect } from 'react-redux';


//Dimensioni schermata
const { width, height } = Dimensions.get("window");

const background = require("../images/main_bg.png");


class Home extends Component {
  
    componentWillMount() {
        this.props.downloadList();
    }

    init(){
        if(this.props.isLoading){
            return <Text style={styles.loadingText}> Sto caricando ... </Text>
        }
        else{
            return(
                <TaskList list={this.props.data} isUser={true} isToDo={false} navigator={this.props.navigation}/>
            )
        }
    }


    render(){
        return(
            <Image source={background} style={styles.background} resizeMode="cover">
                <Container style={{flex:10}} >
                        {this.init()} 
                </Container> 
                <Container style={{flex:1}}></Container>
           </Image>
        )
    }
}


const styles = StyleSheet.create({

    background: {
        width,
        height,
    },

    loadingText:{
        fontSize:35,
        color:'white',
        textShadowColor:'black',
        textShadowOffset: {width: 1, height: 1},
        alignSelf:'center'
    }
});

const mapStateToProps = state => ({
  data: state.taskList.data,
  isLoading: state.taskList.isLoading,
});
export default connect(mapStateToProps, { downloadList } ) (Home);