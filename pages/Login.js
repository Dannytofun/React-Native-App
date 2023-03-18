import React, {useState} from 'react';
import { TouchableHighlight, Text, View, TextInput } from 'react-native';
import {auth} from '../Firebase/firebase-config.js';
import {signInWithEmailAndPassword} from 'firebase/auth';

import styles from '../stylesheets/mainsheet';

const LoginScreen = ({navigation}) => {
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    const LoginUser = () => {
        signInWithEmailAndPassword(auth, loginEmail,loginPassword)
        .then(userCredentials =>{
            const user = userCredentials.user;
            // console.log(user.uid);
            navigation.navigate('HomeScreen', {userId : user.uid});
        })
        .catch(error => alert(error.message));
    }

    return <View style={styles.body_container}>
        <TextInput
            placeholder="Email"
            value={loginEmail}
            onChangeText={text =>setLoginEmail(text)}
            style={styles.textinput}
        />

        <TextInput
            placeholder="Password"
            value={loginPassword}
            secureTextEntry={true}
            onChangeText={text =>setLoginPassword(text)}
            style={styles.textinput}
        />

        <TouchableHighlight style={[styles.btn,styles.colorprimary]}
            onPress={LoginUser}>
                <Text style={[styles.btntext,styles.white]}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight style={[styles.btn,styles.colorpassive]}
            onPress={() => navigation.navigate('RegisterScreen')}>
                <Text style={[styles.btntext]}>New User?</Text>
        </TouchableHighlight>

    </View>;
  };

export default LoginScreen;