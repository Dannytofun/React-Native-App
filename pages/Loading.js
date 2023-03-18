import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from '../stylesheets/mainsheet';

export const Loading = () => {
    return (
        <View style={styles.body_container}>
            <ActivityIndicator size="large" color="#2196F3" style={styles.indicator}/>
        </View>
    );
}