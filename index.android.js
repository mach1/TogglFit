/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */


import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter
} from 'react-native';

import Beacons from 'react-native-beacons-android'

class TogglFit extends Component {
  render() {
    Beacons.detectIBeacons()

    // Start detecting all iBeacons in the nearby
    Beacons.startRangingBeaconsInRegion('REGION1')
      .then(() => console.log(`Beacons ranging started succesfully!`))
      .catch(error => console.log(`Beacons ranging not started, error: ${error}`))

    // Monitoring
    Beacons.startMonitoringForRegion('REGION1')
      .then(() => console.log(`Beacons monitoring started succesfully`))
      .catch(error => console.log(`Beacons monitoring not started, error: ${error}`))

    // Print a log of the detected iBeacons (evert 1 second)
    DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
      console.log('Found beacons!', data)
    })

    DeviceEventEmitter.addListener('regionDidEnter', (region) => {
      console.log('Entered new beacons region!', region) // Result of monitoring
    })

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('TogglFit', () => TogglFit);
