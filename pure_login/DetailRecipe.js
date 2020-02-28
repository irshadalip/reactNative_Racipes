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
        return <View style={{ flex: 1 }}>
            {/* <SafeAreaView> */}

            <View style={{ flex: 0.3 }}>
                <Image style={{ height: '100%', width: '100%' }} source={this.checkImageURLNull(this.state.recipeDetail.photo)}></Image>
            </View>
            <View style={{ flex: 0.7 }}>
                <ImageBackground source={Bg} style={{ height: '100%', paddingLeft: 10, paddingRight: 10 }} >
                    <View><Text>
                    </Text></View>

                    <View style={styles.detaiTextRow}>
                        <View style={styles.onlyRow}>
                            <Image style={{ height: 25, width: 25, marginTop: 5 }} source={require('../images/comp.png')}></Image>
                            <Text style={[styles.detaiText, styles.detaiTextRow]}>Name : </Text>
                        </View>

                        <Text style={styles.detaiTextData}>{this.state.recipeDetail.name} </Text>
                    </View>

                    <View style={styles.detaiTextRow}>
                        <View style={styles.onlyRow}>
                            <Image style={{ height: 20, width: 20, marginTop: 5 }} source={require('../images/chef.png')}></Image>
                            <Text style={[styles.detaiText, styles.detaiTextRow]}>Chef : </Text>
                        </View>

                        <Text style={styles.detaiTextData}>{this.state.recipeDetail.firstName} {this.state.recipeDetail.lastName}</Text>
                    </View>

                    <View style={styles.detaiTextRow}>
                        <View style={styles.onlyRow}>
                            <Image style={{ height: 20, width: 20, marginTop: 5 }} source={require('../images/timer.png')}></Image>
                            <Text style={[styles.detaiText, styles.detaiTextRow]}>PreparationTime : </Text>
                        </View>
                        <Text style={styles.detaiTextData}>{this.state.recipeDetail.preparationTime} </Text>
                    </View>

                    <View style={styles.detaiTextRow}>
                        <View style={styles.onlyRow}>
                            <Image style={{ height: 20, width: 20, marginTop: 5 }} source={require('../images/serves.png')}></Image>
                            <Text style={[styles.detaiText, styles.detaiTextRow]}>Serves : </Text>
                        </View>

                        <Text style={styles.detaiTextData}>{this.state.recipeDetail.serves} </Text>
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
        color: 'rgba(255,145,71,1)',
        fontSize: 20,
        fontFamily: "Baskerville-SemiBold",
        padding: 5
    },
    detaiTextData: {
        color: 'black',
        fontSize: 20,
        fontFamily: "AmericanTypewriter-Condensed",//"AmericanTypewriter-Light"
        padding: 5
    },
    detaiTextRow: {
        // color: 'blue',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    onlyRow: {
        flexDirection: 'row'
    }
})


const mapStateToProps = (state) => {
    return { token: state.token }
}
export default connect(mapStateToProps)(DetailRecipe)