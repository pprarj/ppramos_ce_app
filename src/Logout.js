import React, { Component } from 'react';
import { View, Text, Button, AsyncStorage, StyleSheet } from 'react-native';

export default class Logout extends Component {
    static navigationOptions = ({navigation}) => ({
        title: "Sair"
    });

    constructor(props) {
        super(props);
        this.state = {
            user: ''
        }

        this.logout = this.logout.bind(this);
    }

    componentDidMount(){
        AsyncStorage.getItem("user").then((user) => {
            let userData = JSON.parse(user)
            this.setState({
                user: userData,
            })
        })
    }

    logout() {
        let s = this.state;
        let url = 'http://192.168.1.35:8888/ppramos-ce/mobile/user_info/' + s.user;

        fetch(url, {
            method: 'LOGOUT',
            headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            },
            body: JSON.stringify({}),
        });

        AsyncStorage.removeItem("user");

        this.props.navigation.navigate('Home');
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Deseja realmente sair?</Text>
                <Button style={styles.button} title="Sair" onPress={this.logout} />
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
    title:{
        color: '#FFF',
        marginTop: 50
    },
    button:{
        marginTop: 30
    }
});