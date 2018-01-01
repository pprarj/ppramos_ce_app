import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';

export default class Dashboard extends Component {
    static navigationOptions = {
        title: null,
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {};

        this.barcode = this.barcode.bind(this);
        this.reduction = this.reduction.bind(this);
        this.logout = this.logout.bind(this);
    }

    barcode() {
        this.props.navigation.navigate('Barcode');
    }

    reduction() {
        this.props.navigation.navigate('Reduction');
    }

    logout() {
        this.props.navigation.navigate('Logout');
    }

    render() {
        return(
            <View style={styles.container}>
                <Image style={styles.logo} source={require('../assets/images/Logo01.png')} />
                <View style={styles.buttonArea}>
                    <TouchableHighlight style={styles.button} onPress={this.barcode}>
                        <Text style={styles.btnText}>Ler código de barras</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.buttonArea}>
                    <TouchableHighlight style={styles.button} onPress={this.reduction}>
                        <Text style={styles.btnText}>Baixa de produtos</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.buttonArea}>
                    <TouchableHighlight style={styles.button} onPress={this.logout}>
                        <Text style={styles.btnText}>Sair</Text>
                    </TouchableHighlight>
                </View>
            </View>
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
    },
    logo:{
        width: 300,
        height: 300
    },
    buttonArea:{
        marginTop: 50
    },
    button:{
        backgroundColor: '#222',
        padding: 10,
        width: 250,
        height: 40,
        justifyContent: 'center'
    },
    btnText:{
        textAlign: 'center',
        color: '#FFF',
        fontSize: 20
    }
});