import React from 'react';
import { Text, View } from 'react-native';
import * as Location from 'expo-location';

export default class WeatherComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            city: 'Morrisville',
            location: null,
            errorMsg: null
        }
    }

    setLocation(location) {
        this.setState({
            location: location
        })
    }

    setErrorMsg(message) {
        this.setState({
            errorMsg: message
        })
    }

    setCity(city) {
        this.setState({
            city: city
        })
    }

    async componentDidMount() {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                this.setErrorMsg('You need to grant location access for the best services.');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            this.setLocation(location);
        } catch (error) {
            console.log(error);
        }
    }


    render() {
        let text = 'Waiting..';
        if (this.state.errorMsg) {
            text = this.state.errorMsg;
        } else if (this.state.location) {
            text = JSON.stringify(this.state.location);
        }
        return (
            <View>
                <Text>{text}</Text>
            </View>
        );
    }
}
