import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from './pages/Login';
import RegisterScreen from './pages/Register';
import HomeScreen from './pages/Home';

import CheckInAttend from './pages/student/Checkin';
import SubjectCatalog from './pages/student/Subjects';
import AttendLog from './pages/student/History';
import VerifyAttend from './pages/student/VerifyAttend';

import CreateSubject from './pages/lecturer/CreateSubject';
import ViewSubject from './pages/lecturer/ViewSubject';
import CreateAttend from './pages/lecturer/CreateAttend';
import ViewAttend from  './pages/lecturer/ViewAttend';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* MAIN PAGES */}
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{title: 'Login'}} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{title: 'Register'}} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{title: 'Home'}} />

        {/* STUDENT PAGES */}
        <Stack.Screen name="CheckInAttend" component={CheckInAttend} options={{title: 'Check In Attendance'}} />
        <Stack.Screen name="SubjectCatalog" component={SubjectCatalog} options={{title: 'Browse Subject'}} />
        <Stack.Screen name="AttendLog" component={AttendLog} options={{title: 'Attendance History'}}/>
        <Stack.Screen name="VerifyAttend" component={VerifyAttend} options={{title: 'Verify Attendance'}} />

        {/* LECTURER PAGES */}
        <Stack.Screen name="CreateSubject" component={CreateSubject} options={{title: 'Create New Subject'}}/>
        <Stack.Screen name="ViewSubject" component={ViewSubject} options={{title: 'View Subjects'}}/>
        <Stack.Screen name="CreateAttend" component={CreateAttend} options={{title: 'Create Attendance'}}/>
        <Stack.Screen name="ViewAttend" component={ViewAttend} options={{title: 'View Attendance'}}/>

      </Stack.Navigator>
    </NavigationContainer>

  );
};





export default App;