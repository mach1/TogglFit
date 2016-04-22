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
import { excerciseData } from './ExcerciseData.js'

const getFormatedTime = (startTime) => {
  const seconds = moment().diff(startTime, 'seconds')
  return moment().startOf('day').seconds(seconds).format('mm:ss')
}

const mapBeaconDate = (beacon) => {
  return {
    time: getFormatedTime(beacon.time),
    rawTime: moment().diff(beacon.time, 'seconds')
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
    this.updateTime = this.updateTime.bind(this)
  }

  saveStartedTimeEntryToState (response) {
    const startTime = new Date(response.data.start).getTime()
    this.setState({
      startTime,
      teId: response.data.id
    })
  }

  startTimeEntry (beacon) {
    const excercise = excerciseData[beacon.name]
    this.props.onImageChange(excercise.image)
    this.onManualStop()
    this.setState({
      timeEntryRunning: true,
      beacon
    })
    startTimeEntry(beacon.name).then(this.saveStartedTimeEntryToState)
  }


  onBeaconsUpdate (beacons) {
    this.setState({
      beacons
    })
    const nearest = minBy(beacons, 'distance')
    if (nearest && nearest.name === 'Exit') {
      if (this.state.timeEntryRunning) {
        stopTimeEntry(this.state.teId)
      }

      if (this.state.beacon.name !== 'Exit') {
        save(mapBeaconDate(this.state.beacon))
        this.setState({
          timeEntryRunning: false,
          beacon: nearest,
          teId: null
        })
      }
    } else if (nearest && !this.state.timeEntryRunning) {
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
    this.refs.view.bounce(800)
  }

  updateTime () {
    const { startTime } = this.state
    this.setState({
      time: getFormatedTime(startTime)
    })
  }

  componentDidMount () {
    setInterval(this.updateTime, 1000)
  }

  render () {
    const {
      beacons,
      beacon,
      time
    } = this.state

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
