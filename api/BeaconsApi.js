import {
  DeviceEventEmitter
} from 'react-native'
import {
  keyBy
} from 'lodash'
import Beacons from 'react-native-beacons-android'

let listeners = []

const stations = {
  '0xebb0': { name: 'Barbell press' },
  '0x08e5': { name: 'Squats' },
  '0x5fbf': { name: 'Exit' }
}

const NEAR = 0.5
const TIMEOUT = 5000

const isNear = (beacon => beacon.distance <= NEAR)
const isNew = (beacon => (Date.now() - beacon.time) < TIMEOUT)

let beaconsData = {}

const mergeData = data => {
  beaconsData = {
    ...beaconsData,
    ...data
  }

  return Object.values(beaconsData)
}

const formatData = beacons => {
  return keyBy(beacons.beacons.map(beacon => {
    return {
      distance: beacon.distance.toFixed(2),
      name: stations[beacon.id2].name,
      time: Date.now()
    }
  }).filter(isNear), 'name')
}

export function start() {
  Beacons.detectIBeacons()

  // Start detecting all iBeacons in the nearby
  Beacons.startRangingBeaconsInRegion('REGION1')
    .then(() => console.log(`Beacons ranging started succesfully!`))
    .catch(error => console.log(`Beacons ranging not started, error: ${error}`))

  // Print a log of the detected iBeacons (evert 1 second)
  DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
    listeners.forEach(fn => fn(mergeData(formatData(data)).filter(isNew)))
  })
}

export function registerListener (fn) {
  listeners.push(fn)
}
