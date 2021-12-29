import React from 'react';
import { Text, View } from 'react-native';
import WeatherComponent from './components/weather';

function fetchWeatherForToday(lat, lon) {
  let url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=2b6b99284ca5506af3a162425a954d1e`;
  return fetch(url)
    .then(response => response.json()) //convert response to json
    .then(responseJSON => {
      let temp = responseJSON.daily.temp; // temperature
      return Promise.resolve(temp);
    })
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      temp: {}
    }
  }

  componentDidMount() {
    fetchWeatherForToday(35, -78).then((temp) => {
      this.setState({ temp: temp });
    }).catch((err) => console.error(err))
  }

  render() {
    console.log(this.state.temp);
    return (
      <View>
        <WeatherComponent /> 
        <Text>{/* Component that temporarily displays json, for testing purposes */}</Text>
        <Text>Weather App</Text>
        <Text>Weather for your location today:</Text>
        <Text>{JSON.stringify(this.state.temp)}</Text>
        <Text>{/*<Picker
          selectedValue={this.state.city}
          onValueChange={currentCity => this.setCity(currentCity)}>
          <Picker.Item label='Morrisville' value='Morrisville' />
          <Picker.Item label='Cary' value='Cary' />
          <Picker.Item label='Pune' value='Pune' />
        </Picker>*/}</Text>
      </View>
    );
  }
}
