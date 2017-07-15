import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Text, Body, Icon} from 'native-base';
import {Dimensions,Button} from 'react-native';
import{MapComponent} from '../components';

const {width: windowWidth} = Dimensions.get('window');

const TaskCard = ({title, category, description, deadline, budget, status, region, username, isUser, navigator, taskID,userID,isToDo}) => {

    renderReplyButton = () => {
        if(isUser)
        {
            return(
                <CardItem>
                    <Body style={{alignItems:"center"}}>
                        <Button title='Rispondi' onPress={()=>(navigator.navigate('Task',{tId:taskID, uId: userID}))}/>
                    </Body>
                </CardItem>
            )
        }
        else{
            return null;
        }
    };

    renderMessageButton = () => {
        if(isToDo && !status)
        {
            return(
                <CardItem>
                    <Body style={{alignItems:"center"}}>
                        <Button title='Visualizza offerta'  onPress={()=>(navigator.navigate('Inbox',{tId:taskID}))}/>
                    </Body>
                </CardItem>
            )
        }
    }

    const {titleText, cardStyle } = styles;
    return(
        <Card style={cardStyle}>
            <CardItem header style={cardStyle}>
                {status ? <Icon name='disc' style={{color:'#26A65B'}}/> : <Icon name='disc' style={{color:'#D91E18'}}/>}
                <Text style={titleText}>
                    Titolo: {title}
                </Text>  
            </CardItem>

            <CardItem>
                <Body>
                
                    <Text style={styles.elementText}>
                        <Icon name='bulb' style={{color:'#F5D76E'}} /> Categoria: {category}
                    </Text>
                
                    <Text style={styles.elementText}>
                        <Icon name='paper' style={{color:'#6C7A89'}} /> Descrizione: {description}
                    </Text>
    
                    <Text style={styles.elementText}>
                        <Icon name='calendar' style={{color:'#D91E18'}} /> Scadenza: {deadline}
                    </Text>

                    <Text style={styles.elementText}>
                        <Icon name='briefcase'  style={{color:'#A77A53'}} /> Budget: {budget}
                    </Text>

                    <Text>
                        <Icon name='person' style={{color:'#59ABE3'}} /> Task di {username}
                    </Text>
                </Body>
            </CardItem>

            <CardItem>
                <Body style={{alignItems:"center"}}>
                    <MapComponent 
                        width = {300}
                        height = {200}
                        region = {region}
                    />
                </Body>
            </CardItem>

            {this.renderReplyButton()}
            {this.renderMessageButton()}

            
        </Card>
    );
};

const styles = 
{
    titleText:{
        fontSize: 20,
        color:'white',
        fontWeight: 'bold',
        paddingHorizontal:10
    },

    cardStyle:{
        backgroundColor:'orange',
    },

    elementText:{
        paddingTop:10
    }
};

export {TaskCard};