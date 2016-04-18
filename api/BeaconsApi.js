import {
  DeviceEventEmitter
} from 'react-native'

import Beacons from 'react-native-beacons-android'

let listeners = []

export function start() {
  Beacons.detectIBeacons()

  // Start detecting all iBeacons in the nearby
  Beacons.startRangingBeaconsInRegion('REGION1')
    .then(() => console.log(`Beacons ranging started succesfully!`))
    .catch(error => console.log(`Beacons ranging not started, error: ${error}`))

  // Print a log of the detected iBeacons (evert 1 second)
  DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
    listeners.forEach(fn => fn(data))
  })
}

export function registerListener (fn) {
  listeners.push(fn)
}
