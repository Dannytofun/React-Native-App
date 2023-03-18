import {React, useState}from 'react';
import { Text, View, TouchableHighlight, TextInput } from 'react-native';
import { readDoc, writeDoc } from '../../Firebase/firestoreDB';

import styles from '../../stylesheets/mainsheet';

const VerifyAttend = ({navigation,route}) => {
  const [code,setCode] = useState('');

  console.log(route.params.subject)

  const verify =() => {
    console.log("HEH")
    if (code === route.params.subject.code){
      let subject_key = route.params.subject.subject_code + " " + route.params.subject.section + " " + route.params.subject.session
      console.log(subject_key)
      readDoc("Subject",subject_key)
      .then( (doc) => {
        let id = doc.data().attendance.findIndex((attend) => attend.code === code)

        let students = doc.data().attendance[id].students || [];
        students.push(route.params.userData.idNo);

        let attendances = doc.data().attendance;
        attendances[id].students = students;

        console.log(attendances)

        writeDoc("Subject",subject_key,{attendance : attendances});

        alert("Check in verified successfully");
        navigation.navigate('CheckInAttend',{userData : route.params.userData})
      })

    }
      
  };
  
  return ( 
    <View style={styles.body_container}>
      <Text style={[styles.text]}>Provide the correct code to verify your attendance.</Text>
      <TextInput 
        placeholder='Insert code here'
        value={code}
        onChangeText={text => setCode(text)} 
        style={styles.textinput}
      />

      <TouchableHighlight style={[styles.btn,styles.colorprimary]}
        onPress={verify}>
        <Text style={[styles.btntext,styles.white]}>Verify Attendance</Text>
      </TouchableHighlight>
    </View>
  )
};


export default VerifyAttend;