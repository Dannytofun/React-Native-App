import React, {useState} from 'react';
import { TouchableHighlight, Text, View, FlatList, ScrollView } from 'react-native';
import { readDoc, writeDoc, queryDoc } from '../../Firebase/FirestoreDB';

import styles from '../../stylesheets/mainsheet';
import { Loading } from '../Loading';

const AttendLog = ({navigation,route}) => {

    let subjects = queryDoc('Subject','students','array-contains',route.params.userData.idNo) || [];
    console.log(subjects);

    let history = [];

    subjects.forEach((subject) => {
      if (subject.attendance){
        subject.attendance.forEach((list => {
          // console.log(list.subject_key, list.startTimestamp)
          if (list.endTimestamp !== "")
            history.push(list)
        }))
      }
    });

    const isOngoing = (student) => {
      return student.includes(route.params.userData.idNo)
  }

    if(history.length == 0){
        return <Loading />
    }
    else{
        return (
            <ScrollView style={styles.body_container}>
                <FlatList data={history}renderItem={({item}) => 
                    <View style={styles.block}>
                        <Text style={[styles.h1,styles.bold,styles.underline]}>{item.subject_name} ({item.subject_code})</Text>
                        <Text style={[styles.text]}>Section {item.section} Session {item.session}</Text>
                        <Text style={[styles.text]}>Start timestamp: {item.startTimestamp && item.startTimestamp.toDate().toLocaleString()}</Text>
                        <Text style={[styles.text]}>End timestamp: {item.endTimestamp && item.endTimestamp.toDate().toLocaleString()}</Text>
                        <Text style={[styles.text]}>{isOngoing(item.students || []) ? "You are present" : "You are absent"}</Text>                 
                    </View>
                
                }
                />
            </ScrollView>
        );
    }
        
};

export default AttendLog;