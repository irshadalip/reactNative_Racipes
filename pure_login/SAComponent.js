import React, { Component } from 'react'
import { View, Text, ScrollView, SafeAreaView, TextInput, StyleSheet } from 'react-native'

export default class SAComponent extends Component {
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