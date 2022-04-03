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
    color: 'darkgray',
    fontSize: 30,
    marginRight: 15,
  },
  telIcon: {
    color: 'gray',
    fontSize: 30,
    marginRight: 15,
  },
  telNameColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  telNameText: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '200',
  },
  telNumberColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  telNumberText: {
    fontSize: 16,
  },
  telRow: {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 20,
  },
});

export default TelStyles;
