import React, { Component } from 'react'
import { View, Text, ImageBackground, ScrollView, SafeAreaView, TextInput, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native'

import Bg from '../images/react-bg.png'
import ProfileBg from '../images/Rectangle.png'
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux'

class AddRecipe extends Component {

    constructor() {
        super()
        this.state = { imageUrl: '', recipeImage: null, recipeName: '', serves: '', preparationTime: '', complexity: '', firstName: '', lastName: '' }
    }
    componentDidMount() {
        // console.log("Add Recipe token"+this.props.navigation.state['params']['token'])
    }
    render() {
        return (<ImageBackground style={styles.mainView} source={Bg}>
            <ImageBackground style={styles.profileBg} source={Bg}>

                <View style={styles.profilepic}>
                    <TouchableOpacity style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={this.fromLibrary}>
                        {/* { uri: this.props.imageUrl } */}
                        <Image style={styles.recipepic} source={this.state.recipeImage ? { uri: this.state.recipeImage } : require('../images/recipeNotFound.png')}></Image>

                    </TouchableOpacity>

                </View>
            </ImageBackground>

            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                {/* <Text>Profile</Text> */}

                {/* <TextInput style={styles.textInput} placeholder='Chef First Name' value={this.state.firstName}
                    onChangeText={(firstName) => this.setState({ firstName })}></TextInput>
                <TextInput style={styles.textInput} placeholder='Chef Last Name' value={this.state.lastName}
                    onChangeText={(lastName) => this.setState({ lastName })}></TextInput> */}
                <TextInput style={styles.textInput} placeholder='recipeName' value={this.state.recipeName}
                    onChangeText={(recipeName) => this.setState({ recipeName })}></TextInput>
                <TextInput style={styles.textInput} placeholder='serves' value={this.state.serves}
                    onChangeText={(serves) => this.setState({ serves })}></TextInput>
                <TextInput style={styles.textInput} placeholder='preparationTime' value={this.state.preparationTime}
                    onChangeText={(preparationTime) => this.setState({ preparationTime })}></TextInput>
        

                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={[styles.comp, { backgroundColor: this.state.complexity == 'Easy' ? 'rgba(35,90,144,1)' : 'rgba(0,0,0,0.5)' }]} onPress={() => { this.setState({ complexity: 'Easy' }) }}>
                        <Text style={styles.compText}>Easy</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.comp, { backgroundColor: this.state.complexity == 'Medium' ? 'rgba(35,90,144,1)' : 'rgba(0,0,0,0.5)' }]} onPress={() => { this.setState({ complexity: 'Medium' }) }}>
                        <Text style={styles.compText}>Medium</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.comp, { backgroundColor: this.state.complexity == 'Hard' ? 'rgba(35,90,144,1)' : 'rgba(0,0,0,0.5)' }]} onPress={() => { this.setState({ complexity: 'Hard' }) }}>
                        <Text style={styles.compText}>Hard</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.AddButton} onPress={() => this.addRecipeApi()}>
                    <Text style={styles.loginText}>ADD</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>);
    }

    fromLibrary = () => {
        // this.LoadRealImage.bind(this);
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
                    recipeImage: response.uri,
                });
            }
        });
    }
    addRecipeApi() {
        // this.setState({isLoading:true})
        console.log("0000000000000000000000000000")
        console.log(this.state.complexity)
        console.log(this.state.recipeName)
        console.log(this.state.lastName)

        console.log("0000000000000000000000000000")
        // return
        fetch('http://35.160.197.175:3006/api/v1/recipe/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.props.token
            },
            body: JSON.stringify({
                name: this.state.recipeName,
                preparationTime: this.state.preparationTime,
                serves: this.state.serves,
                complexity: this.state.complexity,
                firstName: this.state.firstName,
                lastName: this.state.lastName
            })
        }).then((response) => {
            if (response.status == 200) {

                return response.json()
            } else {
                console.log('Error')
            }
        }).then((responseJSON) => {
            this.uploadImageApi(responseJSON.id)
        })
    }
    addRacipeCookingList() {
        // this.setState({ isRefresh: true })
        fetch('http://35.160.197.175:3006/api/v1/recipe/add-to-cooking-list',
            {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + this.props.token,
                },
                body: JSON.stringify({
                    name: this.state.recipeName,
                    preparationTime: this.state.preparationTime,
                    serves: this.state.serves,
                    complexity: this.state.complexity,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName
                })
            }).then((response) => {
                return response.json()
            }).then((responseJSON) => {
                this.uploadImageApi(responseJSON.id)
            })
    }


    uploadImageApi(id) {
        var recipePhoto = {
            uri: this.state.recipeImage,
            type: 'image/jpeg',
            name: 'photo.jpg',
        };
        var formData = new FormData();
        formData.append('photo', recipePhoto);
        formData.append('recipeId', id)

        fetch('http://35.160.197.175:3006/api/v1/recipe/add-update-recipe-photo', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.props.token
            },
            body: formData
        }).then((responseJson) => {
            this.setState({ isLoading: false })
            Alert.alert('Success!', 'Recipe added', [{
                text: 'Done',
                onPress: () => {
                    this.props.navigation.pop();
                }
            }])
        }).catch((error) => {
            this.setState({ isLoading: false })
            Alert.alert('Fail', 'Failed to add recipe')
        });
    }
    onLogin = () => {
        this.props.imageUrl('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyePfpi0Y_O9aRvZwArx3dL4cSCIL8jcwJoeUWDIIbhRkNhoVJ2Q&s')
    };

}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: 'rgba(247,247,247,0)',
        // alignItems: 'flex-start',
        // justifyContent: 'space-between'
    },
    textInput: {
        padding: 10,
        marginBottom: 5,
        backgroundColor: 'white',
        width: '90%',
        height: '9%',
        borderRadius: 10,
        borderColor: 'lightblue',
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
        flex: 0.5,
        height: "100%",
        width: '100%',
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    bgBorder: {
        height: '22%',
        width: '100%',
    },
    profilepic: {
        height: '100%',
        width: '100%',
        borderRadius: 100,
        // borderWidth: 5,
        borderColor: 'rgba(24,140,224,1)',
        alignItems: 'center',
        justifyContent: 'center',
        // marginBottom: 10,
        shadowOpacity: 0.3,
        shadowOffset: {
            height: 5,
            width: 5,
        },
        justifyContent: 'flex-start',
        // alignItems: 'flex-start'

    },
    recipepic: {
        height: '100%',
        width: '100%',
        // borderRadius: 100,
        borderWidth: 1,
        borderColor: 'white'
    },
    comp: {
        backgroundColor: 'rgba(30,90,136,1)',//'#004470',
        fontSize: 10,
        borderRadius: 8,
        width: '30%',
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        top: 12,
        borderColor: 'lightblue',
        borderStartWidth: 5,
    },
    AddButton: {
        backgroundColor: 'rgba(18,55,92,1)',
        fontSize: 20,
        borderRadius: 10,
        width: '90%',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        // top: 12,
        borderColor: 'lightblue',
        borderStartWidth: 5,
    },
    loginText: {
        fontSize: 20,
        color: '#2F98DC',
        fontWeight: 'bold'

    },
    compText: {
        fontSize: 15,
        color: 'lightblue',
        fontWeight: 'bold'

    },
});

function mapDispatchToProps(dispatch) {
    return {
        imageUrl: (value) => dispatch({
            type: 'ImageUrl',
            imageUrl: value
        })
    }
}

// const mapStateToProps = (state) => {
//     alert(state)
//     return { token: state.token,imageUrl: state.imageUrl}
// }
const mapStateToProps = (state) => {
    return { token: state.token }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddRecipe)