import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import {Text} from 'react-native';
import{Icon} from 'native-base';

//Screens
import Root from '../screens/Root';
import Register from '../screens/Register';
import ForgotPassword from '../screens/ForgotPassword';
import Home from '../screens/Home';
import TaskCreator from '../screens/TaskCreator';
import Account from '../screens/Account';
import TaskListUser from '../screens/TaskListUser';
import Task from '../screens/Task';
import Profile from '../screens/Profile';
import TaskedListUser from '../screens/TaskedListUser';
import Inbox from '../screens/Inbox';

export const TaskTabs = TabNavigator({
    TaskListUser: {
        screen: TaskListUser, 
        navigationOptions: {
            tabBarLabel: 'Task richiesti',
        }, 
    },
    TaskedListUser: {
        screen: TaskedListUser,
        navigationOptions: {
            tabBarLabel: 'Task da svolgere',
        },
    }},
    {
        tabBarOptions: {
            activeTintColor:'orange',
            inactiveTintColor:'#6C7A89',
		    style: {
                backgroundColor: 'white',
                borderTopWidth: 1,
                borderBottomColor: 'orange'
            },
	    }
    });

    export const MainTabs = TabNavigator({
    Home: {
        screen: Home, 
        navigationOptions: {
            tabBarLabel: 'Tasks',
        }, 
    },
    Account: {
        screen: Account,
        navigationOptions: {
            tabBarLabel: 'Profilo',
        },
    }},
    {
        tabBarOptions: {
            activeTintColor:'orange',
            inactiveTintColor:'#6C7A89',
		    style: {
                backgroundColor: 'white',
                borderTopWidth: 1,
                borderBottomColor: 'orange'
            },
	    }
    });
    

export const MainNavigator = StackNavigator({
    
    Root : { 
        screen: Root,
        navigationOptions: 
        {
            header: null,
             
        }
    },

    MainTabs : {
        screen: MainTabs,
        navigationOptions:{
            header:null,
        }
    },

    TaskTabs : {
        screen: TaskTabs,
        navigationOptions:{
            header:null,
        }
    },

    Register : {
        screen : Register,
        navigationOptions :
        {
            header: null,
        },
    },

    ForgotPassword : {
        screen : ForgotPassword,
        navigationOptions:
        {
            header: null,
        },
    },

    TaskCreator: {
        screen:TaskCreator,
    },
    
    Account:{
        screen:Account,
    },

    TaskListUser:{
        screen:TaskListUser,
        navigationOptions: {
            title:'I tuoi Task'
        }, 
    },

    Task:{
        screen:Task,
    },

    Profile:{
        screen:Profile,
    },

    Inbox:{
        screen:Inbox,
    }
});


const tabRouteConfiguration = {
    
};

const tabBarConfiguration = {
	tabBarOptions: {
		activeTintColor: 'red',
	}
};

