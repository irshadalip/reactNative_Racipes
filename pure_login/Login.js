import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image, ImageBackground } from 'react-native'
import Logo from '../images/react-logo.png'
import Bg from '../images/react-bg.png'
import LoadingComponent from './LoadingComponent'
import {connect} from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import * as constant from './constant';


 class Login extends Component {
    constructor() {
        super()
        this.state = { token: '',isLoading: false, email: 'jm1@example.com', password: 'jay@123' }

    }

    render() {
        return (
            <ImageBackground source={Bg} style={styles.imageBg}>
                <LoadingComponent isLoading={this.state.isLoading}></LoadingComponent>
                <View style={styles.mainView}>

                    <View style={styles.view2}>
                        <Image source={Logo} style={styles.imageHieght}></Image>
                        <Text style={styles.loginTitle}>React Native</Text>
                        <Text style={styles.loginTitle}>Login</Text>

                    </View>

                    <View style={styles.view1}>

                        <TextInput
                            placeholder='Email'
                            keyboardType='email-address'
                            style={[styles.inputs, styles.emailInput]}
                            value={this.state.email}
                            onChangeText={(email) => this.setState({ email })}
                        ></TextInput>
                        <TextInput placeholder='Password'
                            style={styles.inputs}
                            secureTextEntry={true}
                            value={this.state.password}
                            onChangeText={(password) => this.setState({ password })}

                        ></TextInput>
                        <TouchableOpacity style={styles.loginButton} onPress={this.onLogin}>
                            <Text style={styles.loginText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View >
            </ImageBackground>
        );
    }
    onLogin = () => {
        this.setState({ isLoading: true })
        fetch('http://35.160.197.175:3006/api/v1/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                'email': this.state.email,
                'password': this.state.password
            })
        }).then((response) => {

            if (this.state.email == '') {
                Alert.alert('Failed!', 'Please Enter The Email.', [{ text: 'Okay', style: 'destructive' }])
                return response.json()
            }
            else if (this.state.password == '') {
                Alert.alert('Failed!', 'Please Enter The Password.', [{ text: 'Okay', style: 'destructive' }])
                return response.json()
            }
            else if (response.status == 200) {
                return response.json()
            }
            else {
                Alert.alert('Failed!', 'Please Enter Valid Email Or Password', [{ text: 'Try Again', style: 'destructive' }, { text: 'Cancel' }])
                return response.json()
            }
            this.setState({ isLoading: false })
        }).then((responseJSON) => {
            console.log('+++++++++++++++++++++++++++++++++++++++++++++++')
            console.log(responseJSON)
            console.log('+++++++++++++++++++++++++++++++++++++++++++++++')
            this.props.token(responseJSON.token)
            if (responseJSON.email == 'jm1@example.com') {
                this.storeData(responseJSON);

                Alert.alert('Success!', 'You Are Successful LogIn', [{
                    text: 'Done',
                    onPress: () => {
                        this.props.navigation.navigate('List', { token: responseJSON.token });
                    }
                }])
            }
            this.setState({ isLoading: false })

        }).catch((error) => {
            console.log(error);
            this.setState({ isLoading: false })
        })
    }



  storeData = async responseJSON => {
    try {
      let userEmail = '';
      let userFN = '';
      let userLN = '';
      userEmail = responseJSON.email;
      userFN = responseJSON.firstName
      userLN = responseJSON.lastName;
      await AsyncStorage.setItem(constant.FirstName, userFN);
      await AsyncStorage.setItem(constant.LastName, userLN);
      await AsyncStorage.setItem(constant.EmailId, userEmail);
    } catch (e) {
      console.log('Error to store data' + e);
    }
  }
}
///////////////////////////////////////////////

function mapDispatchToProps(dispatch) {
    return {
        token: (value) => dispatch({
            type: 'Token',
            token: value
        })
    }
  }
  
  const mapStatetoProps = (state) =>{
    return  {
        token : state.token
    }
  }
  
  export default connect(mapStatetoProps,mapDispatchToProps)(Login)

///////////////////////////////////////
const styles = StyleSheet.create({
    mainView: {
        flex: 0.7,
        justifyContent: 'center'
    },
    view1: {
        flex: 0.30,
        alignItems: 'center',
        justifyContent: 'center',

    },
    view2: {
        flex: 0.25,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 70
    },
    inputs: {
        padding: 10,
        backgroundColor: 'white',
        width: '90%',
        height: '25%',
        borderRadius: 10,
        borderColor: 'gray',
        shadowOpacity: 0.2,
        shadowOffset: {
            height: 10,
            width: 10,
        }


    }, emailInput: {
        bottom: 12
    },
    loginButton: {
        backgroundColor: '#004470',
        fontSize: 20,
        borderRadius: 10,
        width: '90%',
        height: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        top: 12,
        shadowOpacity: 0.2,
        shadowOffset: {
            height: 10,
            width: 10,
        }
    },
    loginText: {
        fontSize: 20,
        color: '#2F98DC',
        fontWeight: 'bold'

    },
    loginTitle: {
        top: 20,
        fontSize: 30,
        color: '#004470',
        fontWeight: 'bold'

    },
    imageHieght: {
        height: '110%',
        width: '40%',
        marginTop: 100
    },
    imageBg: {
        height: '100%',
        width: '100%'
    }
})