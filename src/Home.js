import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, AsyncStorage } from 'react-native';

export default class Home extends Component {
    static navigationOptions = ({navigation}) => ({
        title: null,
        header: null
    });

    constructor(props) {
        super(props);
        this.state = {
            user: ''
        };

        this.isLogged = this.isLogged.bind(this);
        this.login = this.login.bind(this);
    }

    componentDidMount(){
        AsyncStorage.getItem("user").then((user) => {
            let userData = JSON.parse(user)
            this.setState({
                user: userData,
            })
        })
    }

    isLogged() {
        let s = this.state;

        if (s.user == null) {
            this.login();
        } else {
            let url = 'http://192.168.1.35:8888/ppramos-ce/mobile/user_info/' + s.user;
    
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    if (data.islogged == 0) {
                        this.login();
                    } else {
                        this.props.navigation.navigate('Dashboard');
                    }
                });
        }
    }

    login() {
        this.props.navigation.navigate('Login');
    }

    render() {
        return(
            <View style={styles.container}>
                <View>
                    <Text style={styles.welcome}>Seja bem vindo ao</Text>
                </View>
                <Image style={styles.logo} source={require('../assets/images/Logo01.png')} />
                <View style={styles.buttonArea}>
                    <TouchableHighlight style={styles.button} onPress={this.isLogged}>
                        <Text style={styles.btnText}>Entrar</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Desenvolvido por </Text>
                    <Text style={{color:'#003663', fontStyle: 'italic'}}> KA</Text>
                    <Text style={{color:'#FF8E00', fontStyle: 'italic'}}>1</Text>
                    <Text style={{color:'#003663', fontStyle: 'italic'}}>T Sistemas </Text>
                    <Text style={styles.footerText}>- versão 1.0</Text>
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
    welcome:{
        color: '#FFF',
        fontSize: 36,
        textAlign: 'center',
        fontStyle: 'italic',
        marginTop: 50
    },
    buttonArea:{
        marginTop: 50
    },
    button:{
        backgroundColor: '#222',
        padding: 10,
        width: 200,
        height: 40,
        justifyContent: 'center'
    },
    btnText:{
        textAlign: 'center',
        color: '#FFF',
        fontSize: 20
    },
    footer:{
        marginTop: 200,
        flex: 1,
        flexDirection: 'row'
    },
    footerText:{
        color: '#FFF',
        textAlign: 'center',
        fontStyle: 'italic'
    }
});