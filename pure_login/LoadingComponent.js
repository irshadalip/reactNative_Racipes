import React, { Component } from 'react'
import { View, ActivityIndicator } from 'react-native'
export default function LoadingComponent(props){
    if (props.isLoading) {
        return (
            <View style={{ position: 'absolute', width: '100%', height: '140%', zIndex: 1 }}>
                <ActivityIndicator size='large' color='lightblue' style={{ flex: 1 }}></ActivityIndicator>
            </View>
        )
    } else {
        return (<View></View>)
    }
}