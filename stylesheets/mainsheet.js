import * as React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    body_container:{margin : 20},

    // TEXT
    text: {
        fontSize : 16,
        marginBottom:5},
    bold: {
        fontWeight: 'bold'
    },
    italic: {
        fontStyle: 'italic'
    },
    underline: {
        textDecorationLine: 'underline'
    },
    strike:{
        textDecorationLine: 'line-through'
    },

    // HEADERS
    title: {
        fontSize : 28,
        marginBottom : 15,
        textAlign: 'center'
    },
    h1: {
        fontSize: 24,
        marginBottom: 10
    },
    h2: {
        fontSize: 20,
        marginBottom: 10
    },

    // BUTTON
    btn: {
        marginBottom: 10,
        width: 'auto',
        alignItems: 'center',
        borderRadius: 5
    },
    btntext: {
        fontSize: 16,
        textAlign: 'center',
        padding: 8
    },
    
    // TEXT INPUT
    textinput: {
        fontSize : 16,
        marginBottom: 10,
        padding : 5,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 5
    },

    // DROPDOWN
    dropdown: {
        fontSize: 16,
        padding: 5,
        marginBottom: 10
    },

    // PERCENTAGE SIZE
    quarter: {
        width: '25%'
    },
    third: {
        width: '33%'
    },
    half: {
        width: '50%'
    },

    // COLOURS
    colorprimary: {
        backgroundColor : '#2196F3'
    },
    colorsecondary: {
        backgroundColor : '#20BF55'
    },
    colorpassive: {
        backgroundColor : '#D3D3D3'
    },
    white: {
        color: 'white'
    },


    // BLOCK
    block: {
        borderRadius: 5,
        padding : 10,
        backgroundColor: '#D3D3D3',
        marginBottom : 10
    },

    // INDICATOR
    indicator: {
        marginTop: 70
    }
});

export default styles;