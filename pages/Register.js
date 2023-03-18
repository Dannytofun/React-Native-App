import React, {useState} from 'react';
import { Picker, Text, TextInput, TouchableHighlight, View } from 'react-native';
import styles from '../stylesheets/mainsheet';

import {auth} from '../Firebase/firebase-config.js'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {writeDoc} from '../Firebase/FirestoreDB';

const RegisterScreen = ({navigation}) => {

  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [registerRole, setRegisterRole] = useState("")
  const [fullName, setFullName] = useState("")
  const [idNo, setIdNo] = useState("")

  const RegisterUser = () => {

    const data = {
      email : registerEmail,
      role : registerRole,
      fullName : fullName,
      idNo : idNo 
    }
    console.log(data)

    if (!CheckComplete())
      alert("Please fill up all the details to register.")
    else
      if (registerPassword != confirmPassword)
        alert("The passwords are not same.")
      else
        createUserWithEmailAndPassword(auth, registerEmail,registerPassword)
        .then(userCredentials =>{
          const user = userCredentials.user;
          writeDoc('Users',user.uid,data)

          alert("Successful Registration. Returning to Login Page");
          navigation.navigate('LoginScreen');
        })
        .catch(error => alert(error.message));
  }


  const CheckComplete = () => {
    return (
      registerEmail != "" && 
      registerPassword != "" && 
      confirmPassword != "" && 
      registerRole != "" && 
      fullName != "" && 
      idNo != ""
      );
  }

  return (
    <View style={styles.body_container}>
      <TextInput
        placeholder="Email"
        value={registerEmail}
        onChangeText={text =>setRegisterEmail(text)}
        style={styles.textinput}
      />

      <TextInput
        placeholder="Password"
        value={registerPassword}
        secureTextEntry={true}
        onChangeText={text =>setRegisterPassword(text)}
        style={styles.textinput}
      />

      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        secureTextEntry={true}
        onChangeText={text =>setConfirmPassword(text)}
        style={styles.textinput}
      />

      <TextInput
        placeholder="Full Name"
        value={fullName}
        onChangeText={text =>setFullName(text)}
        style={styles.textinput}
      />

      <TextInput
        placeholder="Matric/Staff No"
        value={idNo}
        onChangeText={text =>setIdNo(text)}
        style={styles.textinput}
      />
      
      <Picker
        selectedValue={registerRole}
        onValueChange={(value, index) => setRegisterRole(value)}
        style={styles.dropdown}>
          <Picker.Item label="Role" value="" />
          <Picker.Item label="Student" value="student" />
          <Picker.Item label="Lecturer" value="lecturer" />
      </Picker>

      <TouchableHighlight style={[styles.btn,styles.colorprimary]}
        onPress={RegisterUser}>
          <Text style={[styles.btntext,styles.white]}>Register</Text>
      </TouchableHighlight>

    </View>
    
  )


    
};


export default RegisterScreen;
