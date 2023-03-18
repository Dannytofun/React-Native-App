import React, { useState } from 'react';
import { View, Text, TextInput, TouchableHighlight} from 'react-native';
import { writeDoc } from '../../Firebase/firestoreDB';
import styles from '../../stylesheets/mainsheet';


const CreateSubject = ({navigation,route}) => {
    const [subject_name, setSubject_name] = useState('');
    const [subject_code, setSubject_code] = useState('');
    const [section, setSection] = useState('');
    const [session, setSession] = useState('');


    const handleSubmit = () => {
        const data = {
            subject_name : subject_name,
            subject_code : subject_code,
            section : section,
            session : session,
            lecturer_name : route.params.userData.fullName,
            lecturer_Id : route.params.userData.idNo,
            isOpen : true,
            students : []
        }
        let docName = subject_code + " " + section + " " + session;
        console.log (docName)
        writeDoc("Subject", docName, data);
        alert("Subject created successfully");
        navigation.navigate('HomeScreen');
    };

    return (
        <View style={styles.body_container}>
            <TextInput 
                placeholder='Subject Name'
                value={subject_name}
                onChangeText={text => setSubject_name(text)} 
                style={styles.textinput}
            />
            
            <TextInput
                placeholder='Subject Code'
                value={subject_code} 
                onChangeText={text => setSubject_code(text)} 
                style={styles.textinput}
            />
            
            <TextInput 
                placeholder='Section'
                value={section} 
                onChangeText={text => setSection(text)} 
                style={styles.textinput}
            />

            <TextInput 
                placeholder='Session'
                value={session} 
                onChangeText={text => setSession(text)} 
                style={styles.textinput}
            />

            <TouchableHighlight style={[styles.btn,styles.colorprimary]}
                onPress={handleSubmit}>
                <Text style={[styles.btntext,styles.white]}>Add Subject</Text>
            </TouchableHighlight>
        </View>
    );
};

export default CreateSubject;