import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Homescreen from './screens/Homescreen';
import Login from './screens/Login';
import Feedscreen from './screens/Feedscreen';
import Messagescreen from './screens/Messagescreen';
import Profilescreen from './screens/Profilescreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreatePostScreen from './screens/CreatePostscreen';
import {Image} from 'react-native';
import EditProfileScreen from './screens/EditProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const homeicon = require('./assets/homeicon.png');
const newpost = require('./assets/newpost.png');
const profiel = require('./assets/profiel.png');
const message = require('./assets/message.png')

const TabNav = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feedscreen"
        component={Feedscreen}
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={homeicon}
              style={{
                width: 30,
                height: 30,
                top: 10,
                tintColor: color, // Adjust as needed
              }}
            />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Createpost"
        component={CreatePostScreen}
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={newpost}
              style={{
                width: 50,
                height: 50,
                top: 10,
                tintColor: color, // Adjust as needed
              }}
            />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Messagescreen"
        component={Messagescreen}
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={message}
              style={{
                width: 35,
                height: 35,
                top: 10,
                tintColor: color, // Adjust as needed
              }}
            />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profilescreen}
        options={{ 
          title: "",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={profiel}
              style={{
                width: 40,
                height: 40,
                top: 10,
                tintColor: color, // Adjust as needed
              }}
            />
          ),
          headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Homescreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Login" 
          component={Login}
        />
        <Stack.Screen 
          name="EditProfileScreen" 
          component={EditProfileScreen}
        />
        <Stack.Screen 
          name="Terug" 
          component={TabNav}
          options={{ headerShown: false}} 
        />
        <Stack.Screen
          name="Messages"
          component={Messagescreen}
          options={{ headerShown: false }}
        />
        {/* Add other screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
