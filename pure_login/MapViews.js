import React, { Component } from 'react'
import { View } from 'react-native'
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps'
import Permission from 'react-native-permissions'


export default class MapViews extends Component {
    constructor() {
        super()
        // Permission.askAsync(Permission.LOCATION)
        // navigator.geolocation.watchPosition(this.onSuccess, this.onError)
    }

    onSuccess = (position) => {
        // console.log(position);
    }

    onError = (error) => {}

    render() {
        return <View style={{ flex: 1 }}>
            <MapView
                initialRegion={{
                    latitude: 23.025838,
                    longitude: 72.503350,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05
                }}
                // provider={PROVIDER_GOOGLE}
                style={{ flex: 1 }}
                showsUserLocation={true}
                onRegionChange={this.onMapRegionChange}
                onMarkerPress={this.onMapMarkerPressed}>

                <Polyline
                    strokeWidth={2}
                    strokeColor='black'
                    coordinates={
                        [
                            {
                                latitude: 23.025734,
                                longitude: 72.503349
                            },
                            {
                                latitude: 23.025530,
                                longitude: 72.505603
                            },
                            {
                                latitude: 23.024113,
                                longitude: 72.505498
                            },
                            {
                                latitude: 23.023941,
                                longitude: 72.506493
                            },
                            {
                                latitude: 22.999724,
                                longitude: 72.498825
                            },
                            {
                                latitude: 22.999101, 
                                longitude: 72.500869
                            },
                            {
                                latitude: 22.998538, 
                                longitude: 72.501953
                            },
                            {
                                latitude: 23.002529,
                                longitude: 72.507046
                            },
                            {
                                latitude: 23.001801, 
                                longitude: 72.507375
                            },
                            {
                                latitude: 22.999432, 
                                longitude: 72.509541
                            },
                            {
                                latitude:  22.997337, 
                                longitude: 72.510839
                            },
                            {
                                latitude: 22.989913, 
                                longitude: 72.515265
                            },
                            {
                                latitude: 22.992625,
                                longitude: 72.521921
                            },
                            {
                                latitude: 22.993500,
                                longitude: 72.525227
                            },
                            {
                                latitude: 22.991233,
                                longitude: 72.525443
                            },
                            {
                                latitude: 22.990132,
                                longitude: 72.525640
                            },
                            {
                                latitude: 22.990130,
                                longitude: 72.525181
                            },
                        ]
                    }
                >

                </Polyline>

                <Marker
                    coordinate={{
                        latitude: 23.025836,
                        longitude: 72.503349,
                    }}
                    title='Solution Analysts'
                    description='Information & Technology'
                    identifier='1'
                >

                </Marker>
                <Marker
                    coordinate={{
                        latitude: 22.990130,
                        longitude: 72.525181
                    }}
                    title='Home'
                    description='Sarkhej Road ,Ahmedabad'
                    identifier='1'
                >

                </Marker>
            </MapView>
        </View>
    }
    onMapRegionChange = (region) => {
        // console.log(region);
    }

    onMapMarkerPressed = (marker) => {
        // console.log(marker);
    }
}