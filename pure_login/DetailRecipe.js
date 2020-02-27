import React, { Component } from 'react'
import { View, Text, ImageBackground, ScrollView, SafeAreaView, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Bg from '../images/react-bg.png'


class DetailRecipe extends Component {
    constructor() {
        super()
        this.state = { recipeDetail: [] }

    }
    componentDidMount() {
        // alert("RecipeId"+this.props.navigation.getParam('id', ''))
        const id = this.props.navigation.getParam('id', '')
        this.fetchRecipeListDetail(id)
    }
    render() {
        return <View style={{flex: 1}}>
            {/* <SafeAreaView> */}
                
                    <View style={{flex: 0.3}}>
                        <Image style={{ height: '100%', width: '100%' }} source={this.checkImageURLNull(this.state.recipeDetail.photo)}></Image>
                    </View>
                    <View style={{flex: 0.7}}>
                        <ImageBackground source={Bg} style={styles.baground} >


                            <View style={styles.detaiTextRow}>
                                <Text style={[styles.detaiText, styles.detaiTextRow]}>Chef : </Text>
                                <Text style={styles.detaiText}>{this.state.recipeDetail.firstName} {this.state.recipeDetail.lastName}</Text>
                            </View>

                            <View style={styles.detaiTextRow}>
                                <Text style={[styles.detaiText, styles.detaiTextRow]}>preparationTime : </Text>
                                <Text style={styles.detaiText}>{this.state.recipeDetail.preparationTime} </Text>
                            </View>

                            <View style={styles.detaiTextRow}>
                                <Text style={[styles.detaiText, styles.detaiTextRow]}>serves : </Text>
                                <Text style={styles.detaiText}>{this.state.recipeDetail.serves} </Text>
                            </View>

                            <View style={styles.detaiTextRow}>
                                <Text style={[styles.detaiText, styles.detaiTextRow]}>name : </Text>
                                <Text style={styles.detaiText}>{this.state.recipeDetail.name} </Text>
                            </View>

                        </ImageBackground>
                    </View>


                


            {/* </SafeAreaView> */}
        </View>
    }
    checkImageURLNull(url) {
        if (url == null) {
            return require('../images/recipeNotFound.png')
        } else {
            return { uri: url };
        }
    }
    fetchRecipeListDetail(id) {
        this.setState({ isRefresh: true })
        fetch('http://35.160.197.175:3006/api/v1/recipe/' + id + '/details',
            {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + this.props.token,
                },
            }).then((response) => {
                return response.json()
            }).then((responseJSON) => {
                // this.setState({ recipeData: responseJSON, isRefresh: false })


                this.setState({ recipeDetail: responseJSON })

                console.log(this.state.recipeDetail.complexity)
                // console.log(this.state.recipeDetail.firstName)
                console.log(this.state.recipeDetail.inCookingList)
                console.log(this.state.recipeDetail.ingredients)
                console.log(this.state.recipeDetail.instructions)
                // console.log(this.state.recipeDetail.lastName)
                console.log(this.state.recipeDetail.metaTags)
                // console.log(this.state.recipeDetail.name)
                // console.log(this.state.recipeDetail.photo)
                // console.log(this.state.recipeDetail.preparationTime)
                // console.log(this.state.recipeDetail.serves)
                console.log(this.state.recipeDetail.ytUrl)

                // alert(responseJSON['name'])
            })
    }
}

const styles = StyleSheet.create({
    detaiText: {
        color: 'red',
        fontSize: 20,
        fontFamily: "Baskerville-SemiBold",
    },
    detaiTextRow: {
        // color: 'blue',
        flexDirection: 'row'
    },
    baground: {
        height: '100%'
    }
})


const mapStateToProps = (state) => {
    return { token: state.token }
}
export default connect(mapStateToProps)(DetailRecipe)