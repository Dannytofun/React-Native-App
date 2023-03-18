import React, {useState} from 'react';
import { TouchableHighlight, Text, View, FlatList, ScrollView } from 'react-native';
import { writeDoc, queryDoc } from '../../Firebase/FirestoreDB';

import styles from '../../stylesheets/mainsheet';
import { Loading } from '../Loading';

const SubjectCatalog = ({navigation,route}) => {
    let subjects = queryDoc('Subject','isOpen','==',true) || [];

    const handleSubscribe = (subject) => {
        // console.log(subject)
        let students = subject.students || [];
        let subject_key = subject.subject_code + " " + subject.section + " " + subject.session

        students.push(route.params.userData.idNo);
        subject.students = students;
        writeDoc("Subject",subject_key,subject);
        alert("Successfully subscribed to the subject");
    };

    const checkSubscribed = (studentlist) => {
        return studentlist.includes(route.params.userData.idNo)
    }


    if(subjects.length == 0){
        return <Loading />
    }
    else{
        return (
            <ScrollView style={styles.body_container}>
                <FlatList data={subjects}renderItem={({item}) => 
                    <View style={styles.block}>
                        <Text style={[styles.h1,styles.bold,styles.underline]}>{item.subject_name} ({item.subject_code})</Text>
                        <Text style={[styles.text]}>Section {item.section} Session {item.session}</Text>
                        <Text style={[styles.text,styles.bold]}>Lecturer</Text>
                        <Text style={[styles.text]}>{item.lecturer_name} ({item.lecturer_Id})</Text>

                        {
                            !checkSubscribed(item.students || []) ? 
                            (<TouchableHighlight style={[styles.btn,styles.colorprimary]}
                                onPress={() => handleSubscribe(item)}>
                                    <Text style={[styles.btntext,styles.white]}>Subscribe</Text>
                            </TouchableHighlight>) :
                            (<TouchableHighlight style={[styles.btn,styles.colorsecondary]}
                                disabled={true}
                                >
                                    <Text style={[styles.btntext,styles.white]}>Already Subcribed</Text>
                            </TouchableHighlight>)
                        }
                        
                    </View>
                
                }
                />
            </ScrollView>
        );
    }
        
};

export default SubjectCatalog;