import { StyleSheet } from 'react-native';

const TelStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 25,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  smsIcon: {
    color: 'black',
    fontSize: 30,
    marginRight: 15,
  },
  telIcon: {
    color: 'black',
    fontSize: 30,
    marginRight: 15,
  },
  telNameColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  telNameText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '300',
  },
  telNumberColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  telNumberText: {
    fontSize: 16,
    fontWeight: '600',
  },
  telRow: {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 20,
  },
});

export default TelStyles;
