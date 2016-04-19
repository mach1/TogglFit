/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';

import MainScreen from './MainScreen'


import { start } from './api/BeaconsApi.js'

class TogglFit extends Component {
  componentWillMount () {
    start()
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('./assets/images/bg-row.png')}
          style={styles.backgroundImage}
        />
        <MainScreen style={styles.trigger} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: Image.resizeMode.contain,
    opacity: 0.6
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
  trigger: {
    fontSize: 500,
    color: 'red',
    backgroundColor: 'green'
  }
});

AppRegistry.registerComponent('TogglFit', () => TogglFit);
