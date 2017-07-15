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
import {filterUserList} from '../actions/TaskListActions';
import { connect } from 'react-redux';


//Dimensioni schermata
const { width, height } = Dimensions.get("window");

const background = require("../images/main_bg.png");


class TaskListUser extends Component {
  
    componentWillMount() {
        this.props.filterUserList(this.props.data, this.props.user.uid);
    }

    init(){
        if(this.props.isLoading){
            return <Text style={styles.loadingText}> Sto caricando ... </Text>
        }
        else{
            return(
                <TaskList list={this.props.userList} isUser={false} isToDo={true} navigator={this.props.navigation}/>
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
  userList: state.filter.userList,
  isLoading: state.filter.isLoading,
  user: state.authLogin.userData,
  data: state.taskList.data,
});
export default connect(mapStateToProps, { filterUserList } ) (TaskListUser);