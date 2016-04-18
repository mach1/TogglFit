import React, {
  Component,
  View,
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
      <View>
        {
          beacons.map((beacon, index) => {
            console.log(beacon)
            return (
              <View>
                <Text>
                  Beacon {beacon.id2}
                </Text>
                <Text>
                  {beacon.distance}
                </Text>
              </View>
            )
          })
        }
      </View>
    )
  }
}
