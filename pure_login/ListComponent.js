import React, { Component } from 'react'
import { Image, View, Text, SafeAreaView, FlatList, ImageBackground, Button, Imageplaceholder, TouchableWithoutFeedback, Dimensions, RefreshControl, StyleSheet } from 'react-native'
import listPic from '../images/session/pic4.png'
import Logo from '../images/react-logo.png'
import Bg from '../images/react-bg.png'
import AddRecipe from './AddRecipe'
import DetailRecipe from './DetailRecipe'
import { connect } from 'react-redux'



const DATA = [
    {
        title: 'Session #1',
        id: '1',
        imagePic: 'pic1.png'
    }
]
class ListComponent extends Component {
    // static navigationOpations = {
    //     headers
    // }
    constructor() {
        super()

        // this.onLogin()
        this.state = { recipeData: [], data: [], isRefresh: false ,recipeId: ''}
    }

    componentDidMount() {
        this.fetchRecipeList()
        // this.fetchRecipeCookingList()
    }
    componentWillUnmount() {
        console.log('****************************************');
        console.log('***FAQComponent: componentWillUnmount***');
        console.log('****************************************');
    }
    render() {
        return <ImageBackground source={Bg} style={styles.imageBg}>
            <View>
                <SafeAreaView>
                    <Button title='AddRecipe' onPress={() => { this.props.navigation.navigate('AddRecipe', this.props.navigation.state['params']['token']) }}></Button>
                    <FlatList
                        refreshControl={
                            <RefreshControl refreshing={this.state.isRefresh} onRefresh={() => { this.fetchRecipeList(this.state.token) }}>

                            </RefreshControl>
                        }
                        data={this.state.recipeData}//{this.state.recipeData}
                        numColumns={1}
                        renderItem={({ item }) => {
                            return <View style={style = styles.listCard}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image style={{ height: 25, width: 25, fontSize: 20, margin: 5 }} source={require('../images/chef.png')}></Image>
                                    <Text style={{ color: 'white', fontSize: 20 }}>{item.firstName + ' ' + item.lastName}</Text>
                                </View>
                                {/* <TouchableWithoutFeedback onPress={()=>{this.onDetail(item)}}> */}
                                <TouchableWithoutFeedback onPress={() => this.onDetail(item)}>
                                    {/* <Image style={styles.cardImage} source={{uri: item.photo }}></Image> */}
                                    <Image style={styles.cardImage} source={this.checkImageURLNull(item.photo)}></Image>

                                </TouchableWithoutFeedback>
                                <View style={styles.textRow}>
                                    <View style={{ flexDirection: 'row', margin: 5, alignItems: 'center' }}>
                                        <Image style={{ height: 25, width: 25 }} source={require('../images/comp.png')}></Image>
                                        <Text style={{ color: 'white' }}>{'  ' + item.name}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', margin: 5, alignItems: 'center' }}>
                                        <Image style={{ height: 25, width: 25 }} source={require('../images/timer.png')}></Image>
                                        <Text style={{ color: 'white' }}>{'  ' + item.preparationTime}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', margin: 5, alignItems: 'center' }}>
                                        <Image style={{ height: 25, width: 25 }} source={require('../images/serves.png')}></Image>
                                        <Text style={{ color: 'white' }}>{'  ' + item.serves}</Text>
                                    </View>
                                    {/* <TouchableWithoutFeedback onPress={() => this.deleteRecipe(item)} >
                                        <Image source={require('../images/timer.png')} style={{ width: 25, height: 25, tintColor: 'white' }}></Image>
                                    </TouchableWithoutFeedback> */}
                                </View>

                            </View>
                        }}
                        style={style = styles.listView}
                        keyExtractor={(item) => item.id}
                    // extraData={this.state}
                    ></FlatList>
                </SafeAreaView>
            </View>
        </ImageBackground>
    }
    onDetail = (item) => {
        console.log('hello=========')
        
        this.setState({recipeId : item.recipeId})
        console.log(this.state.recipeId)
        
        // this.props.navigation.navigate('DetailRecipe')
        this.props.navigation.navigate('DetailRecipe',{id : this.state.recipeId})
    };

    checkImageURLNull(url) {
        if (url == null) {
            return require('../images/recipeNotFound.png')
        } else {
            return { uri: url };
        }
    }

    fetchRecipeList() {
        this.setState({ isRefresh: true })
        fetch('http://35.160.197.175:3006/api/v1/recipe/feeds',
            {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + this.props.token,
                },
            }).then((response) => {
                return response.json()
            }).then((responseJSON) => {
                this.setState({ recipeData: responseJSON, isRefresh: false })
            })
    }               
    fetchRecipeCookingList() {
        this.setState({ isRefresh: true })
        fetch('http://35.160.197.175:3006/api/v1/recipe/cooking-list',
            {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + this.props.token,
                },
            }).then((response) => {
                return response.json()
            }).then((responseJSON) => {

                this.setState({ recipeData: responseJSON, isRefresh: false })
            })
    }

    deleteRecipe(item) {
        console.log('Delete_Function_Call')
        // const data = this.props.navigation.getParam('data', '');
        fetch('http://35.160.197.175:3006/api/v1/recipe/rm-from-cooking-list' + item.id,
            {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + this.props.token,
                },
            }
        ).then((response) => {
            if (response.status == 200) {
                return response.json()
            } else {
            }
        }).then((responseJson) => {
            this.setState({
                recipeData: responseJson,
                isLoading: false,
                isRefreshing: false
            });
            this.fetchRecipeCookingList()
        }).catch((error) => {
        });
    }

}

const styles = StyleSheet.create({
    listView: {
        // flex: 1,
        // backgroundColor: 'gray',
        padding: 10,
        // bottom: 10,
    },
    listCard: {
        backgroundColor: 'rgba(000,000,000,0.4)',
        padding: 0,
        height: 230,
        // margin: 10,
        marginBottom: 10,
        borderRadius: 15,
        // width: ((Dimensions.get('window').width-60)/3),

    },
    textRow: {

        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowTextStyle: {
        fontSize: 20,
    },
    cardImage: {
        height: '70%',
        width: '100%',
        borderRadius: 15
    },
    cardText: {
        padding: 10
    },
    imageBg: {
        height: '100%',
        width: '100%'
    }
});


const mapStateToProps = (state) => {
    return { token: state.token }
}
export default connect(mapStateToProps)(ListComponent)