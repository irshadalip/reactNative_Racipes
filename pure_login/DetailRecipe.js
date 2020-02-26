import React, { Component } from 'react'
import { View, Text, ImageBackground, ScrollView, SafeAreaView, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native'



export default class DetailRecipe extends Component {
    render() {
        return <View>
            <SafeAreaView>
                <ScrollView keyboardDismissMode = 'on-drag'>
                    <TextInput placeholder='Email'></TextInput>
                    <Text>
                        irshadali Palsaniya.drge
                </Text>
                </ScrollView>
            </SafeAreaView>
        </View>
    }
}