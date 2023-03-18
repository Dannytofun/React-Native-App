import {React, useState}from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { readDoc, writeDoc } from '../../Firebase/firestoreDB';
import Clipboard from '@react-native-clipboard/clipboard';

import styles from '../../stylesheets/mainsheet';

const CreateAttend = ({navigation,route}) => {
  const [randomCode,setRandomCode] = useState('');
  const [startTime,setStartTime] = useState('');
  const [startDate,setStartDate] = useState('');

  const handleSubmit =() => {
    let randomCode = Math.random().toString(36).substring(2).substring(0,7);
    let startTimestamp = new Date();
    let subject_key = route.params.subject.subject_code + " " + route.params.subject.section + " " + route.params.subject.session

    // console.log(randomCode,startTimestamp);
    const data = {
      code : randomCode,
      startTimestamp : startTimestamp,
      endTimestamp : '',
      subject_code : route.params.subject.subject_code,
      section : route.params.subject.section,
      session : route.params.subject.session,
      subject_name : route.params.subject.subject_name,
      students : []
    }
    readDoc("Subject",subject_key)
    .then( (doc) => {
      let attendance = doc.data().attendance || [];

      console.log(attendance)

      attendance.push(data);
      writeDoc("Subject",subject_key,{attendance : attendance});

      setRandomCode(randomCode);
      setStartTime(startTimestamp.toLocaleTimeString());
      setStartDate(startTimestamp.toLocaleDateString());
      alert("Attendance created successfully");
    })
  };

  const copyToClipboard = () => {
    Clipboard.setString(randomCode);
    alert("Copy successful!");
  }
  
  if (randomCode == '')
    return ( 
      <View style={styles.body_container}>
        <Text style={[styles.text]}>Would you like to create attendance for the following course?</Text>
        <Text style={[styles.text, styles.bold]}>{route.params.subject.subject_name} ({route.params.subject.subject_code})</Text>

        <TouchableHighlight style={[styles.btn,styles.colorprimary]}
          onPress={handleSubmit}>
          <Text style={[styles.btntext,styles.white]}>Confirm Create Attendance</Text>
        </TouchableHighlight>
      </View>
    )
  else
    return ( 
      <View style={styles.body_container}>
        <Text style={[styles.text]}>
          The attendance for &nbsp;
          <Text style={[styles.bold]}>{route.params.subject.subject_name} ({route.params.subject.subject_code})</Text> &nbsp;
          has been created at &nbsp;
          <Text style={[styles.bold]}>{startTime}</Text>&nbsp;
          on <Text style={[styles.bold]}>{startDate}</Text>.
          
        </Text>
        <Text style={[styles.text]}>You may share the code below for the students to check in.</Text>
        <Text style={[styles.text, styles.h1, styles.bold,{textAlign:'center'}]}>{randomCode}</Text>

        <TouchableHighlight style={[styles.btn,styles.colorprimary]}
          onPress={copyToClipboard}
          >
          <Text style={[styles.btntext,styles.white]}>Share Code</Text>
        </TouchableHighlight>
      </View>
    );
};


export default CreateAttend;