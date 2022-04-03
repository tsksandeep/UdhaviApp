import { StyleSheet, Platform, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const profileMainStyles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 45,
    backgroundColor: '#fdf6e4',
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  placeIcon: {
    color: '#560cce',
    fontSize: 26,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  telContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCityRow: {
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: '#560cce',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  userImage: {
    borderColor: '#560cce',
    borderRadius: 85,
    borderWidth: 5,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: '#560cce',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#560cce',
    borderWidth: 0,
    borderRadius: 0,
  },
  cardHeading: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%',
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: 'rgba(0,0,0,0.15)',
    borderBottomWidth: 1,
  },
  cardHeadingText: {
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

export default profileMainStyles;
