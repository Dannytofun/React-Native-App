import React, {useState} from 'react';
import { TouchableHighlight, Text, View, FlatList, ScrollView } from 'react-native';
import { readDoc, writeDoc } from '../../Firebase/FirestoreDB';

import styles from '../../stylesheets/mainsheet';
import { Loading } from '../Loading';
import Clipboard from '@react-native-clipboard/clipboard';


const ViewAttend = ({navigation,route}) => {

    const [attend,setAttend]= useState()
    
    const reopenAttendance=(id)=>{
        console.log(id)
       
        readDoc('Subject',route.params.subject_key)  
        .then((doc)=>{
            let attendance = doc.data().attendance || [];
            attendance[id].endTimestamp = ''
            writeDoc('Subject',route.params.subject_key,{attendance:attendance})
            alert('Attendance Re-opened Succesfully')
        })
    }

    const closeAttendance=(id)=>{
        console.log(id)
        let endTimestamp = new Date()
        readDoc('Subject',route.params.subject_key)  
        .then((doc)=>{
            let attendance = doc.data().attendance || [];
            attendance[id].endTimestamp = endTimestamp
            writeDoc('Subject',route.params.subject_key,{attendance:attendance})
            alert('Attendance Closed Succesfully')
        })
    }

    const copyToClipboard = () => {
        Clipboard.setString(randomCode);
        alert("Copy successful!");
      }

    readDoc('Subject',route.params.subject_key)  
    .then((doc)=>{
        
        setAttend(doc.data().attendance)
        
        
    } );

    return (
        <ScrollView style={styles.body_container}>
           
            <FlatList data={attend}
                renderItem={({item,index}) => 
                    <View style={styles.block}>
                        <View style={{flexDirection:'row'}}>

                            <View style={{flex:3}}>

                                <Text style={[styles.h1,styles.bold,styles.underline]}>{item.subject_code} ({item.startTimeStamp})</Text>
                                <Text style={[styles.text]}>Section {item.section} Session {item.session}</Text>
                            </View>
                            <View style={{flex:2}}>
                                {item.endTimestamp===''? 
                                <TouchableHighlight style={[styles.btn,styles.colorsecondary]}
                                onPress={() => {closeAttendance(index)}}
                                >
                                    <Text style={[styles.btntext,styles.white]}>Close Attendance</Text>
                                </TouchableHighlight>:
                                <TouchableHighlight style={[styles.btn,styles.colorsecondary]}
                                onPress={() => {reopenAttendance(index)}}
                                >
                                    <Text style={[styles.btntext,styles.white]}>Re-open Attendance</Text>
                                </TouchableHighlight>
                                }
                                

                                <TouchableHighlight style={[styles.btn,styles.colorprimary]}
                                    onPress={() => {copyToClipboard}}>
                                        <Text style={[styles.btntext,styles.white]}>Share Code</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                        {item.students.length > 0 ? (
                                <View>
                                    <Text style={[styles.h2,styles.bold]}>Attending Students :</Text>
                                    {item.students.map((subitem) => <Text style={[styles.text]}>{subitem}</Text>)}
                                </View>
                                ) : (
                                    <Text style={[styles.h2,styles.bold]}>No students attending yet.</Text>
                            )}

                    </View>
                }

            />
        
        </ScrollView>
    );


 
  
    
};


export default ViewAttend;