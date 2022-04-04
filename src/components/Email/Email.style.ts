import { StyleSheet } from 'react-native';

const EmailStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 25,
  },
  emailColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  emailIcon: {
    color: 'black',
    fontSize: 30,
    marginRight: 15,
  },
  emailNameColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  emailNameText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '300',
  },
  emailRow: {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 20,
  },
  emailText: {
    fontSize: 16,
    fontWeight: '600',
  },
  iconRow: {
    justifyContent: 'center',
  },
});

export default EmailStyles;
