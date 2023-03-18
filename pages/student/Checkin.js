import React, {useState} from 'react';
import {Text, View, ScrollView, FlatList,TouchableHighlight } from 'react-native';
import { queryDoc } from '../../Firebase/FirestoreDB';
import { Loading } from '../Loading';

import styles from "../../stylesheets/mainsheet";

const CheckInAttend = ({navigation,route}) => {
  let subjects = queryDoc('Subject','students','array-contains',route.params.userData.idNo) || [];
  let attendances = [];
  subjects.forEach((subject) => {
    if (subject.attendance){
      subject.attendance.forEach((list => {
        // console.log(list.subject_key, list.startTimestamp)
        if (list.endTimestamp !== "")
          attendances.push(list)
      }))
    }
  });
  attendances.sort((timeA,timeB) => {
    timeA.startTimestamp - timeB.startTimestamp
  })

  // console.log(attendances)

  const getDate = (timestamp) => {
    // console.log(timestamp)
    // timestamp.toDate()
    return timestamp.toDate().toLocaleDateString()
  }

  const getTime = (timestamp) => {
    // console.log(timestamp)
    // timestamp.toDate()
    return timestamp.toDate().toLocaleTimeString()
  }

  const checkAttended = (studentlist) => {
    return studentlist.includes(route.params.userData.idNo)
}


  if(attendances.length == 0){
    return <Loading />
  }
  else{
    // attendances.sort((timeA,timeB) => {
    //   console.log(timeA.startTimestamp.toDate() - timeB.startTimestamp.toDate())
    //   timeA.startTimestamp.toDate() - timeB.startTimestamp.toDate()
    // })
    return (
      <View style={styles.body_container}>
        <ScrollView style={styles.body_container}>
          <FlatList data={attendances}
            renderItem={({item}) => 
              <View style={styles.block}>
                <Text style={[styles.h1,styles.bold,styles.underline]}>{item.subject_name} ({item.subject_code})</Text>
                <Text style={[styles.text]}>Section {item.section} Session {item.session}</Text>
                <Text style={[styles.text]}>Attendance Opened : {getDate(item.startTimestamp)} at {getTime(item.startTimestamp)}</Text>
                
                {
                  !checkAttended(item.students || []) ? 
                  (<TouchableHighlight style={[styles.btn,styles.colorprimary]}
                      onPress={() => navigation.navigate('VerifyAttend',{userData : route.params.userData, subject: item})}>
                          <Text style={[styles.btntext,styles.white]}>Check In Attendance</Text>
                  </TouchableHighlight>) :
                  (<TouchableHighlight style={[styles.btn,styles.colorsecondary]}
                      disabled={true}
                      >
                          <Text style={[styles.btntext,styles.white]}>Successfully Attended</Text>
                  </TouchableHighlight>)
                }
              </View>
            }/>
        </ScrollView>
      </View>
   );
  }
    
};

export default CheckInAttend;
