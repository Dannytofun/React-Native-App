import {React, useState} from 'react';
import { TouchableHighlight, Text,View } from 'react-native';
import styles from '../stylesheets/mainsheet';
import {Loading} from './Loading';

import { readDoc } from '../Firebase/FirestoreDB';


const HomeScreen = ({navigation, route}) => {
    const [userData,setUserData] = useState('');
    
    if (userData == ''){
        readDoc("Users",route.params.userId).then((data) => {
            setUserData(data.data());
        });

        return <Loading />;
    }
    else if (userData.role == 'student')
        return <View style={styles.body_container}>
            <Text style={[styles.h1]}>Welcome, {userData.fullName}!</Text>

            <Text style={[styles.h1]}>This is student's button.</Text>

            <TouchableHighlight style={[styles.btn,styles.colorprimary]}
                onPress={() => navigation.navigate('SubjectCatalog',{userData : userData})}>
                    <Text style={[styles.btntext,styles.white]}>Browse Subjects</Text>
            </TouchableHighlight>

            <TouchableHighlight style={[styles.btn,styles.colorprimary]}
                onPress={() => navigation.navigate('CheckInAttend',{userData : userData})}>
                    <Text style={[styles.btntext,styles.white]}>Check in Attendance</Text>
            </TouchableHighlight>

            <TouchableHighlight style={[styles.btn,styles.colorprimary]}
                onPress={() => navigation.navigate('AttendLog',{userData : userData})}>
                    <Text style={[styles.btntext,styles.white]}>Attendance History</Text>
            </TouchableHighlight>
        </View>;
    else
        return <View style={styles.body_container}>
            <Text style={[styles.h1]}>Welcome, {userData.fullName}!</Text>

            <Text style={[styles.text,styles.bold]}> This is lecturer's button.</Text>
            <TouchableHighlight style={[styles.btn,styles.colorprimary]}
                onPress={() => navigation.navigate('CreateSubject',{userData : userData})}>
                    <Text style={[styles.btntext,styles.white]}>Create Subject</Text>
            </TouchableHighlight>

            <TouchableHighlight style={[styles.btn,styles.colorprimary]}
                onPress={() => navigation.navigate('ViewSubject',{userData : userData})}>
                    <Text style={[styles.btntext,styles.white]}>View Subject</Text>
            </TouchableHighlight>
        </View>;
  };

export default HomeScreen;