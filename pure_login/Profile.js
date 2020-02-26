import React, { Component } from 'react'
import { Text, View, TextInput, Image, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from 'react-native'
import Bg from '../images/react-bg.png'
import ProfileBg from '../images/Rectangle.png'
import Profilepic from '../images/react-logo.png'
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux'

// import Permission from 'react-native-permissions'



class Profile extends Component {

    constructor() {
        super()
        this.state = { image: null, loadingImage: false }

        // Permission.askAsync(Permission.CAMERA_ROLL)
    }
    render() {
        return (<View style={styles.mainView}>
            <ImageBackground style={styles.profileBg} source={Bg}>
                {/* <Text style={{ paddingBottom: 25 }}>Profile</Text> */}
                {/* {this.state.image && <Image style={styles.profilepic} source={this.state.loadingImage ? { uri: this.state.image } : require(Profilepic) }></Image>} */}

                <View style={styles.profilepic}>
                    <TouchableOpacity style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={this.fromLibrary}>
                        {/* { uri: this.props.imageUrl } */}
                        <Image style={styles.profilepicIn} source={this.state.image ? { uri: this.state.image } : require('../images/man_default6.png')}></Image>

                    </TouchableOpacity>

                </View>

                <Image style={styles.bgBorder} source={ProfileBg}>
                </Image>
            </ImageBackground>

            <View style={{ height: 350, justifyContent: "center", alignItems: "center" }}>
                {/* <Text>Profile</Text> */}
                <TextInput style={styles.textInput} placeholder='First Name'></TextInput>
                <TextInput style={styles.textInput} placeholder='Last Name'></TextInput>
                <TextInput style={styles.textInput} placeholder='Email Id'></TextInput>
                <TextInput style={styles.textInput} placeholder='First Name'></TextInput>
                <TouchableOpacity style={styles.submitButton} onPress={() => { }}>
                    <Text style={styles.loginText}>Submit</Text>
                </TouchableOpacity>
            </View>


        </View>);
    }

    fromLibrary = () => {
        this.LoadRealImage.bind(this);
        var options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
                // console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                let source = response;
                // console.log(response.uri);
                this.setState({
                    image: response.uri,
                });
            }
        });
    }
    onCamera = () => {
        this.LoadRealImage.bind(this);
        var options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchCameraAsync().then((result) => {
            this.setState({ image: result.uri })
            // console.log(result);
        })
    }
    LoadRealImage() {

        this.setState({ loadingImage: true });

    }
}



const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: 'rgba(247,247,247,1)',
        // alignItems: 'flex-start',
        // justifyContent: 'space-between'
    },
    textInput: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        width: '90%',
        height: '14%',
        borderRadius: 10,
        borderColor: 'gray',
        borderStartWidth: 5,
        shadowOpacity: 0.3,
        shadowOffset: {
            height: 0,
            width: 0,
        }
        // justifyContent: 'flex-start',
        // alignItems: 'flex-start',
    },
    profileBg: {
        height: "100%",
        width: '100%',
        // backgroundColor: 'red',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    bgBorder: {
        height: '22%',
        width: '100%',
    },
    profilepic: {
        height: '40%',
        width: '40%',
        borderRadius: 100,
        borderWidth: 5,
        borderColor: 'rgba(24,140,224,1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
        shadowOpacity: 0.3,
        shadowOffset: {
            height: 5,
            width: 5,
        }
    },
    profilepicIn: {
        height: '100%',
        width: '100%',
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'white'
    },
    submitButton: {
        backgroundColor: '#004470',
        fontSize: 20,
        borderRadius: 10,
        width: '90%',
        height: '14%',
        justifyContent: 'center',
        alignItems: 'center',
        top: 12,
        borderColor: 'lightblue',
        borderStartWidth: 5,
    },
    loginText: {
        fontSize: 20,
        color: '#2F98DC',
        fontWeight: 'bold'

    },
});

const mapStateToProps = (state) => {
    return { imageUrl: state.imageUrl }
}
export default connect(mapStateToProps)(Profile)