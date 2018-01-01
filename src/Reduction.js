import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Reduction extends Component {
    static navigationOptions = {
        title: "Baixa de produtos"
    }

    render() {
        return(
            <View></View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#000'
    }
});