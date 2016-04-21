import { StyleSheet } from 'react-native'

export function getStyles (state) {
  return StyleSheet.create({
    triggerBackground: {
      borderColor: state.timeEntryRunning ? 'green' : 'red',
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
}
