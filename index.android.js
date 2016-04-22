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
  constructor (props) {
    super(props)
    this.onImageChange = this.onImageChange.bind(this)

    this.state = {}
  }

  componentWillMount () {
    start()
  }

  onImageChange (image) {
    this.setState({
      image
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={this.state.image}
          style={styles.backgroundImage}
        />
        <MainScreen
          style={styles.trigger}
          onImageChange={this.onImageChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    backgroundColor: 'black',
  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: Image.resizeMode.cover,
    opacity: 0.3,
    width: null,
    height: null
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
