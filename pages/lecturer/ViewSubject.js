import { isValidTimestamp } from '@firebase/util';
import React, {useState} from 'react';
import { TouchableHighlight, Text, View, FlatList, ScrollView } from 'react-native';
import { queryDoc } from '../../Firebase/FirestoreDB';

import styles from '../../stylesheets/mainsheet';
import { Loading } from '../Loading';


const ViewSubject = ({navigation,route}) => {

    let subjects = queryDoc('Subject','lecturer_Id','==',route.params.userData.idNo) || [];
    const [count,setCount] = useState(0);

    if (count == 0 && subjects.length > 0){
        console.log(subjects);
        setCount(1);
    }
    if(subjects.length == 0){
        return <Loading />
    }
    else
        return (
            <ScrollView style={styles.body_container}>
                <FlatList data={subjects}
                    renderItem={({item}) => 
                        <View style={styles.block}>
                            <View style={{flexDirection:'row'}}>
                                <View style={{flex:3}}>
                                    <Text style={[styles.h1,styles.bold,styles.underline]}>{item.subject_name} ({item.subject_code})</Text>
                                    <Text style={[styles.text]}>Section {item.section} Session {item.session}</Text>
                                </View>
                                
                                <View style={{flex:2}}>
                                    <TouchableHighlight style={[styles.btn,styles.colorsecondary]}
                                        onPress={() => navigation.navigate('ViewAttend',{subject_key:item.subject_code+' '+item.section+' '+item.session})}

                                        >
                                            <Text style={[styles.btntext,styles.white]}>View Attendances</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight style={[styles.btn,styles.colorprimary]}
                                        onPress={() => navigation.navigate('CreateAttend',{subject : item})}>
                                            <Text style={[styles.btntext,styles.white]}>Create Attendance</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>

                            {item.students.length > 0 ? (
                                <View>
                                    <Text style={[styles.h2,styles.bold]}>Subcribing Students :</Text>
                                    {item.students.map((subitem) => <Text style={[styles.text]}>{subitem}</Text>)}
                                </View>
                                ) : (
                                    <Text style={[styles.h2,styles.bold]}>No students subcribed yet.</Text>
                            )}

                        </View>
                    }
                />
            </ScrollView>
        );
    
};


export default ViewSubject;