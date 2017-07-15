import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Text, Body } from 'native-base';
import {Dimensions} from 'react-native';
import{MapComponent} from '../components';
import {TaskCard} from './TaskCard';

const TaskList = ({list, isUser, navigator, isToDo}) => {
    if(list instanceof Object){
        if(list.length<=0)
        {
            return(<Text style={{alignSelf:'center',size:20,color:'white'}}>Nessuna task da visualizzare</Text>)
        }
        var keys = Object.keys(list);
        var output = [];
        for(var i=0; i<keys.length;i++){
            var k = keys[i];
            output.push(<TaskCard key={i} title={list[k].title}
                                    category={list[k].category}
                                    description={list[k].description}
                                    deadline={list[k].deadline}
                                    budget={list[k].budget}
                                    status={list[k].status}
                                    username={list[k].username}
                                    region={list[k].region}
                                    isDraggable = {false}
                                    isUser = {isUser}
                                    navigator={navigator}
                                    taskID={list[k].taskID}
                                    userID = {list[k].userUid}
                                    isToDo = {isToDo}
                                    />);
        }

        return(
            <Content>{output}</Content>
        );
    }else
        return(<Text>Loading ...</Text>)
};

export {TaskList}


