import React, {
  Component,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text
} from 'react-native'

import { getStyles } from './ReportScreen.styles.js'

export default class ReportScreen extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const styles = getStyles(this.state)
    const excercises = [
      {
        image: require('./assets/images/Dumbbell-50.png'),
        time: '20:45'
      }
    ]

    return (
      <View>
        <View>
          <Text style={styles.reportLabel}>
            APRIL, 25. 2016
          </Text>
          {
            excercises.map(excercise => {
              return (
                <View>
                  <View style={styles.report}>
                    <View style={styles.reportIcon}>
                      <Image
                        source={excercise.image} //excercise.image)}
                      />
                    </View>
                    <View style={{ height: 10, borderRadius: 5, backgroundColor: '#04C5A6', marginTop: 20, marginLeft: 15, marginRight: 15, width: 200 }}>
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

