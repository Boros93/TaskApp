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
import {filterToDoList} from '../actions/FilterActions';
import { connect } from 'react-redux';


//Dimensioni schermata
const { width, height } = Dimensions.get("window");

const background = require("../images/main2_bg.png");


class TaskedListUser extends Component {
  
    componentWillMount() {
        this.props.filterToDoList(this.props.data, this.props.user.uid);
    }

    init(){
        console.log('Lista',this.props.toDoList);
        if(!(this.props.toDoList instanceof Object)){
            return <Text style={styles.loadingText}> Sto caricando ... </Text>
        }
        else{
            return(
                <TaskList list={this.props.toDoList} isUser={false} isToDo={false} navigator={this.props.navigation}/>
            )
        }
    }


    render(){
        return(
            <Image source={background} style={styles.background} resizeMode="cover">
                <Container style={{flex:10}}>
                    <Content>
                        {this.init()} 
                    </Content>
                </Container>
                <Container style={{flex:1}}></Container>
           </Image>
        )
    }
}


const styles = StyleSheet.create({
    container : {
        fontSize : 50
    },

    background: {
        width,
        height,
    },

    loadingText:{
        fontSize:35,
        color:'white',
        textShadowColor:'black',
        textShadowOffset: {width: 2, height: 3},
        alignSelf:'center'
    }
});

const mapStateToProps = state => ({
  toDoList: state.filter.toDoList,
  loading: state.filter.isLoadingToDo,
  user: state.authLogin.userData,
  data: state.taskList.data,
});
export default connect(mapStateToProps, { filterToDoList } ) (TaskedListUser);