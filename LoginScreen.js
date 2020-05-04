import React,{Component}from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView} from 'react-native';

import SantaAnimation from '../components/santaClaus.js';
import db from '../config';
import firebase from 'firebase';


export default class LoginScreen extends Component{

  constructor(){
    super();
    this.state={
      emailId:'',
      userName:'',
      password:'',
      firstName:'',
      lastName:'',
      address:'',
      contact:'',
      confirmPassword:'',
      isModalVisible:'false'
    }
  }
  userSignUp = (emailId, password,confirmPassword) =>{
    if(password !== confirmPassword){
        return Alert.alert("password doesn't match\nCheck your password.")
    }else{
      firebase.auth().createUserWithEmailAndPassword(emailId, password)
      .then(()=>{
        db.collection('users').add({
          first_name:this.state.firstName,
          last_name:this.state.lastName,
          contact:this.state.contact,
          email_id:this.state.emailId,
          address:this.state.address
        })
        return  Alert.alert(
             'User Added Successfully',
             '',
             [
               {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
             ]
         );
      })
      .catch((error)=> {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage)
      });
    }
  }
  userLogin = (emailId, password)=>{
    firebase.auth().signInWithEmailAndPassword(emailId, password)
    .then(()=>{
      return Alert.alert("Successfully Login")
    })
    .catch((error)=> {
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    })
  }
 
 showModal = ()=>{
   return(
   <Modal
     animationType="fade"
     transparent={true}
     visible={this.state.isModalVisible}
     >
     <View style={styles.modalContainer}>
       <ScrollView style={{width:'100%'}}>
         <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
         <Text
           style={styles.modalTitle}
           >Registration</Text>
         <TextInput
           style={styles.formTextInput}
           placeholder ={"First Name"}
           maxLength ={8}
           onChangeText={(text)=>{
             this.setState({
               firstName: text
             })
           }}
         />
         <TextInput
           style={styles.formTextInput}
           placeholder ={"Last Name"}
           maxLength ={8}
           onChangeText={(text)=>{
             this.setState({
               lastName: text
             })
           }}
         />
         <TextInput
           style={styles.formTextInput}
           placeholder ={"Contact"}
           maxLength ={10}
           keyboardType={'numeric'}
           onChangeText={(text)=>{
             this.setState({
               contact: text
             })
           }}
         />
         <TextInput
           style={styles.formTextInput}
           placeholder ={"Address"}
           multiline = {true}
           onChangeText={(text)=>{
             this.setState({
               address: text
             })
           }}
         />
         <TextInput
           style={styles.formTextInput}
           placeholder ={"Email"}
           keyboardType ={'email-address'}
           onChangeText={(text)=>{
             this.setState({
               emailId: text
             })
           }}
         /><TextInput
           style={styles.formTextInput}
           placeholder ={"Password"}
           secureTextEntry = {true}
           onChangeText={(text)=>{
             this.setState({
               password: text
             })
           }}
         /><TextInput
           style={styles.formTextInput}
           placeholder ={"Confrim Password"}
           secureTextEntry = {true}
           onChangeText={(text)=>{
             this.setState({
               confirmPassword: text
             })
           }}
         />
         <View style={styles.container}>
           <TouchableOpacity
             style={styles.registerButton}
             onPress={()=>
               this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
             }
           >
           <Text style={styles.registerButtonText}>Register</Text>
           </TouchableOpacity>
         </View>
         <View style={styles.modalBackButton}>
           <TouchableOpacity
             style={styles.cancelButton}
             onPress={()=>this.setState({"isModalVisible":false})}
           >
           <Text style={{color:'#ff5722'}}>Cancel</Text>
           </TouchableOpacity>
         </View>
         </KeyboardAvoidingView>
       </ScrollView>
     </View>
   </Modal>
 )
 }
  
render(){
  return(
      <View style = {styles.container}>
        <View style = {styles.container}> {
            this.showModal()
          }
          </View>
        <ScrollView style={{width:'100%'}}>
          <View style = {styles.container}>
          <Text style = {styles.header}>BedTime Stories</Text>
          </View>
          <View style = {styles.container}> 
        <Image
      source={require("../assets/owl.png")}
      style={{
        width:800,
        height: 400,
        borderWidth : 4,
        borderColor : 'white',
        padding : 8,
        margin : 10,
       }}/>
      </View>

       <Text style = {styles.text}>Login or Signup</Text>
       <View style = {styles.container}>
         <TextInput
         style = {styles.formTextInput}
         placeholder = "Username..."
         onChangeText={(text)=>{
          this.setState({
            iserName: text
          })
        }}
         />
       <TextInput
       style = {styles.formTextInput}
       placeholder = "Type your email address here..."
       keyboardType ='email-address'
            onChangeText={(text)=>{
              this.setState({
                emailId: text
              })
            }}
       />
       <TextInput
       style= {styles.formTextInput}
       placeholder = "Enter your password here..."
       secureTextEntry = {true}
            onChangeText={(text)=>{
              this.setState({
                password: text
              })
            }}
       />
       <TextInput/>
       <TouchableOpacity
           style={[styles.button,{marginBottom:20, marginTop:20}]}
           onPress = {()=>{
             this.userLogin(this.state.emailId, this.state.password)
           }}
           >
           <Text style={styles.buttonText}>Login</Text>
         </TouchableOpacity>

         <TouchableOpacity
           style={styles.button}
           onPress={()=>this.setState({ isModalVisible:true})}
           >
           <Text style={styles.buttonText}>SignUp</Text>
         </TouchableOpacity>
       </View>
       
       </ScrollView>
      </View>
  )
}
}


var styles = StyleSheet.create({
  container :{
    flex : 1,
    justifContent : 'center',
    alignItem : 'center',
    backgroundColor : '#214358',
  },
  header :{
    fontSize :30,
    textAlign : 'center',
    fontWeight : 'bold',
    fontColor : '#F2EEF7',
  },
  formTextInput :{
   width:"75%",
   height:40,
   alignSelf:'center',
   borderColor:'#F2EEF7',
   borderRadius:12,
   borderWidth:2,
   marginTop:20,
   padding:10
  },
  text : {
    fontSize : 20,
    color : '#F2EEF7',
    textAlign : 'center',
    margin : 5,
  },
  buttonText : {
    color : '#214358',
    fontWeight : 'bold',
    fontSize:20
  },
  button : {
    backgroundColor : "#EAEAE0",
    width : 300,
    height : 60,
    justifyContent:'center',
    alignItems:'center',
    padding : 8,
    margin : 10,
    borderRadius : 5,
  },
  KeyboardAvoidingView:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  registerButton:{
    width:200,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderRadius:10,
    marginTop:30,
    backgroundColor : '#EAEAE0'
  },
  registerButtonText:{
    color:'#214358',
    fontSize:15,
    fontWeight:'bold'
  },
})