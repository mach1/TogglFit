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
import { getStyles } from './MainScreen.styles.js'
import { save } from './ExcercisesApi.js'

const getFormatedTime = (startTime) => {
  const seconds = moment().diff(startTime, 'seconds')
  return moment().startOf('day').seconds(seconds).format('mm:ss')
}

const mapBeaconDate = (beacon) => {
  return {
    time: getFormatedTime(beacon.time)
  }
}

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
      save(mapBeaconDate(this.state.beacon))
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

    const time = getFormatedTime(startTime)
    const styles = getStyles(this.state)

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
