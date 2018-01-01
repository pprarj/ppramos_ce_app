import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button, AsyncStorage } from 'react-native';

export default class Login extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Tela de Login'
    });

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pass: ''
        };

        this.setUser = this.setUser.bind(this);
        this.setPass = this.setPass.bind(this);
        this.verifyLogin = this.verifyLogin.bind(this);
    }

    setUser(user) {
        let s = this.state;
        s.user = user;
        this.setState(s);
    }

    setPass(pass) {
        let s = this.state;
        s.pass = pass;
        this.setState(s);
    }

    verifyLogin() {
        let s = this.state;

        let url = 'http://192.168.1.35:8888/ppramos-ce/mobile/user_info';

        fetch(url, {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            },
            body: JSON.stringify({
            user: s.user,
            pass: s.pass,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.login) {
                    AsyncStorage.setItem("user", data.user_id);

                    this.props.navigation.navigate('Dashboard');
                } else {
                    alert(data.message);
                }
            })
            .catch((error) => {
                alert(error);
            });
    }

    render() {
        if (this.state.isLogged) {
            this.props.navigation.navigate('Dashboard');
        } else {
            return(
                <View style={styles.container}>
                    <View style={styles.loginArea}>
                        <Text style={styles.loginTitle}>Para continuar, por favor, entre com usuário e senha:</Text>
                        <TextInput style={styles.inputUser} placeholder="Usuário" value={this.state.user.toLowerCase()} onChangeText={(text)=>this.setUser(text)} />
                        <TextInput style={styles.inputPass} placeholder="Senha" value={this.state.pass} onChangeText={(text)=>this.setPass(text)} secureTextEntry={true} />
                        <Button title="Entrar" onPress={this.verifyLogin} />
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    loginArea: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 50
    },
    loginTitle: {
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 10
    },
    inputUser: {
        width: 200,
        padding: 10,
        backgroundColor: '#FFF',
        color: '#000'
    },
    inputPass: {
        width: 200,
        padding: 10,
        backgroundColor: '#FFF',
        color: '#000',
        marginTop: 10,
        marginBottom: 10
    }
});