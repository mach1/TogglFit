import React, {
  Component,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text
} from 'react-native'

import Animatable from 'react-native-animatable'

import {
  minBy
} from 'lodash'

import {
  registerListener
} from './api/BeaconsApi.js'

import {
  authenticate,
  startTimeEntry,
  stopTimeEntry
} from './api/TogglApi.js'

export default class MainScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      beacons: [],
      timeEntryRunning: false
    }
    this.onBeaconsUpdate = this.onBeaconsUpdate.bind(this)
  }

  startTimeEntry (beacon) {
    this.setState({
      timeEntryRunning: true,
      beacon
    })
    startTimeEntry(beacon.name)
  }

  onBeaconsUpdate (beacons) {
    this.setState({
      beacons
    })
    const nearest = minBy(beacons, 'distance')
    if (nearest && !this.state.timeEntryRunning) {
      this.startTimeEntry(nearest)
    } else if (nearest && this.state.beacon && this.state.beacon.id2 !== nearest.id2) {
      stopTimeEntry()
      this.startTimeEntry(nearest)
    }
  }

  componentWillMount () {
    registerListener(this.onBeaconsUpdate)
  }

  render () {
    const {
      beacons
    } = this.state

    var toggl = true

    const styles = StyleSheet.create({
      triggerBackground: {
        borderColor: this.state.borderColor || 'red',
        borderWidth: 2.5,
        height: 225,
        borderRadius: 225,
        width: 225,
        padding: 10
      },
      report: {
        flexDirection:'row',
        marginBottom: 15,
      },
      reportIcon: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 25,
        padding: 10
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
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Helvetica Neue Light',
        fontSize: 16,
        marginBottom: 40
      },
      reportTimer: {
        alignItems: 'center',
        flexDirection:'row',
        color: 'white',
        fontFamily: 'Helvetica Neue Light',
        fontSize: 12,
        marginTop: 15
      }
    });


    return (
      <View>
      {toggl &&
        <Animatable.View ref="view" transition='borderColor' easing='ease-out' style={styles.triggerBackground} >
            <TouchableOpacity activeOpacity={0.6} style={styles.trigger} onPress={() => this.refs.view.bounce(800).then((endState) => this.setState({borderColor: this.state.borderColor == 'green' ? 'red' : 'green'})) }>
              <Animatable.Text style={styles.triggerText}>
                00:01
              </Animatable.Text>
            </TouchableOpacity>      
        </Animatable.View>
      }
      {!toggl &&
        <View>
          <Text style={styles.reportLabel}>
            APRIL, 25. 2016
          </Text>  
          <View>
            <View style={styles.report}>
              <View style={styles.reportIcon}>
                <Image
                  source={require('./assets/images/Dumbbell-50.png')}
                />
              </View>
              <View style={{ height: 10, borderRadius: 5, backgroundColor: '#04C5A6', marginTop: 20, marginLeft: 15, marginRight: 15, width: 200 }}>
              </View>
              <Text style={styles.reportTimer}>
                20:45
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.report}>
              <View style={styles.reportIcon}>
                <Image
                  source={require('./assets/images/Dumbbell-50.png')}
                />
              </View>
              <View style={{ height: 10, borderRadius: 5, backgroundColor: '#04C5A6', marginTop: 20, marginLeft: 15, marginRight: 15, width: 100 }}>
              </View>
              <Text style={styles.reportTimer}>
                13:45
              </Text>
            </View>
          </View>
        </View>
      }
      </View>
    )
  }
}
