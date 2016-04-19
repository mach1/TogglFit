import React, {
  Component,
  View,
  StyleSheet,
  Text
} from 'react-native'

import {
  registerListener
} from './api/BeaconsApi.js'

export default class MainScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      beacons: [] 
    }
    this.onBeaconsUpdate = this.onBeaconsUpdate.bind(this)
  }

  onBeaconsUpdate (data) {
    this.setState(data)
  }

  componentWillMount () {
    registerListener(this.onBeaconsUpdate)
  }

  render () {
    const {
      beacons
    } = this.state

    return (
      <View style={styles.trigger}>
        {
          beacons.map((beacon, index) => {
            console.log(beacon)
            return (
              <View>
                <Text style={styles.triggerText}>
                  Beacon {beacon.id2}
                </Text>
              </View>
            )
          })
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  trigger: {
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center',
    borderColor: 'green',
    borderWidth: 5,
    backgroundColor: 'rgba(250,250,250,0.2)',
    color: 'white',
    borderRadius: 225,
    height: 225,
    width: 225,
  },
  triggerText: {
    color: 'white',
  }
});