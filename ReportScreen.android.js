import React, {
  Component,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text
} from 'react-native'

import { getStyles } from './ReportScreen.styles.js'
import { get } from './ExcercisesApi.js'
import { maxBy } from 'lodash'

export default class ReportScreen extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const styles = getStyles(this.state)
    const excercises = get().map(beacon => {
      return {
        ...beacon
      }
    })
    const maxTime = maxBy(excercises, 'rawTime').rawTime
    return (
      <View>
        <View>
          <Text style={styles.reportLabel}>
            APRIL, 25. 2016
          </Text>
          {
            excercises.map(excercise => {
              const width = (excercise.rawTime * 200 / maxTime)
              return (
                <View>
                  <View style={styles.report}>
                    <View style={styles.reportIcon}>
                      <Image
                        source={excercise.icon}
                      />
                    </View>
                    <View style={{ height: 10, borderRadius: 5, backgroundColor: '#04C5A6', marginTop: 20, marginLeft: 15, marginRight: 15, width: width}}>
                    </View>
                    <Text style={styles.reportTimer}>
                      {excercise.time}
                    </Text>
                  </View>
                </View>
              )
            })
          }
        </View>
      </View>
    )
  }
}

