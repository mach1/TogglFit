import React, {
  Component,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text
} from 'react-native'

import {
  registerListener
} from './api/BeaconsApi.js'

import {
  authenticate
} from './api/TogglApi.js'

export default class MainScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      beacons: [] 
    }
    this.onBeaconsUpdate = this.onBeaconsUpdate.bind(this)
  }

  onBeaconsUpdate (data) {
    this.setState({
      beacons: data
    })
  }

  componentWillMount () {
    authenticate()
    registerListener(this.onBeaconsUpdate)
  }

  render () {
    const {
      beacons
    } = this.state

    var toggl = true

    return (
      <View>
      {toggl &&
        <View style={styles.triggerBackground}>
            <TouchableOpacity activeOpacity={0.6} style={styles.trigger}>
              <Text style={styles.triggerText}>
                00:01
              </Text>
            </TouchableOpacity>      
        </View>
      }
      {!toggl &&
        <View>
          <Text style={styles.reportLabel}>
            APRIL, 25. 2016
          </Text>  
          <View style={styles.report}>
            <View style={styles.reportIcon}>
              <Image
                source={require('./assets/images/Dumbbell-50.png')}
              />
            </View>
            <View style={styles.progressBar}>
            </View>
          </View>
        </View>
      }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  triggerBackground: {
    borderColor: 'green',
    borderWidth: 2.5,
    height: 225,
    borderRadius: 225,
    width: 225,
    padding: 10
  },
  report: {
    flexDirection:'row',
    marginTop: 40
  },
  reportIcon: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 25,
    padding: 10
  },
  progressBar: {
    height: 10,
    width: 150,
    borderRadius: 5,
    backgroundColor: '#04C5A6',
    marginTop: 20,
    marginLeft: 15
  },
  trigger: {
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(250,250,250,0.15)',
    borderRadius: 200,
    height: 200,
    width: 200,
  },
  triggerText: {
    color: 'white',
    fontFamily: 'Helvetica Neue Light',
    fontSize: 48
  },
  reportLabel: {
    alignItems: 'center',
    flexDirection:'row',
    color: 'white',
    fontFamily: 'Helvetica Neue Light',
    fontSize: 16
  }
});
