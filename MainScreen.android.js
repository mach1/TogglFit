import React, {
  Component,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text
} from 'react-native'

import Animatable from 'react-native-animatable'
import { minBy } from 'lodash'
import { registerListener } from './api/BeaconsApi.js'
import moment from 'moment'
import {
  authenticate,
  startTimeEntry,
  stopTimeEntry
} from './api/TogglApi.js'
import ReportScreen from './ReportScreen.android.js'

export default class MainScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      beacons: [],
      beacon: {},
      timeEntryRunning: false
    }
    this.onBeaconsUpdate = this.onBeaconsUpdate.bind(this)
    this.onManualStop = this.onManualStop.bind(this)
    this.saveStartedTimeEntryToState = this.saveStartedTimeEntryToState.bind(this)
  }

  saveStartedTimeEntryToState (response) {
    const startTime = new Date(response.data.start).getTime()
    this.setState({
      startTime
    })
  }

  startTimeEntry (beacon) {
    this.setState({
      timeEntryRunning: true,
      beacon,
      startTime: Date.now()
    })
    startTimeEntry(beacon.name).then(this.saveStartedTimeEntryToState)
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

  onManualStop () {
    this.refs.view.bounce(800).then((endState) => {
      this.setState({borderColor: this.state.borderColor == 'green' ? 'red' : 'green'})
    })
  }

  render () {
    const {
      beacons,
      beacon,
      startTime
    } = this.state

    var toggl = true

    const seconds = moment().diff(startTime, 'seconds')
    const time = moment().startOf('day').seconds(seconds).format('mm:ss')

    const styles = StyleSheet.create({
      triggerBackground: {
        borderColor: this.state.timeEntryRunning ? 'green' : 'red',
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
      stationText: {
        color: 'white',
        fontFamily: 'Helvetica Neue Light',
        fontSize: 24
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
      {beacon.name !== 'Exit' &&
        <Animatable.View ref="view" transition='borderColor' easing='ease-out' style={styles.triggerBackground} >
            <TouchableOpacity activeOpacity={0.6} style={styles.trigger} onPress={this.onManualStop}>
              <Text style={styles.stationText}>
                {beacon.name || 'Not running'}
              </Text>
              <Animatable.Text style={styles.triggerText}>
                {time}
              </Animatable.Text>
            </TouchableOpacity>
        </Animatable.View>
      }
      {beacon.name === 'Exit' &&
        <ReportScreen />
      }
      </View>
    )
  }
}
