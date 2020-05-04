import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation/bottom-tabs';

import ReadScreen from './screens/ReadScreen';
import WriteScreen from './screens/WriteScreen';
import LoginScreen from './screens/LoginScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <AppContainer/>
      <LoginScreen/>
      <Image
       source={require("../assets/writing.jpg")}
       style={{width:400, height: 400}}/>
      />
      <TouchableOpacity style = {styles.write}
      >WriteScreen</TouchableOpacity>
     <Image
      source={require("../assets/reading.jpg")}
      style={{width:400, height: 400}}/>
      <TouchableOpacity style = {styles.read}>ReadScreen</TouchableOpacity>
      <Image
      source={require("../assets/login.jpg")}
      style={{width:400, height: 400}}/>
      <TouchableOpacity style = {styles.login}>ReadScreen</TouchableOpacity>
      <Tab.Navigator>
        <Tab.Screen name="Write" component={WriteScreen} />
        <Tab.Screen name="Read" component={ReadScreen} />
        <Tab.Screen name="Login" component={LoginScreen} />
      </Tab.Navigator>
    </View>
  );
}
const TabNavigator = createBottomTabNavigator({
  ReadScreen: ReadScreen,
  WriteScreen: WriteScreen,
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  write : {
    backgroundColor : "#FABEC0",
    color : "#710019",
    fontSize : 10,
    fontWeight : "bold"
  },
  read : {
    backgroundColor : "#003B73",
    color : "#43B0F1",
    fontSize : 10,
    fontWeight : "bold"
  },
  login : {
    backgroundColor : "#0067B3",
    color : "#FFD53D",
    fontSize : 10,
    fontWeight : "bold"
  }
});

const TabNavigator = createMaterialTopTabNavigator(
  {
    Read: {screens : ReadScreen},
    Write : {screens: WriteScreen},
    Login : {screens : LoginScreen}
  })

   
     
   
  