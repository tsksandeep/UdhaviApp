const searchBarStyles = (isRegisterForm?: boolean) => {
  return {
    container: {
      flex: 1,
    },
    textInputContainer: {
      flexDirection: 'row',
    },
    textInput: {
      height: isRegisterForm ? 56 : 28,
      borderRadius: 10,
      paddingVertical: 5,
      paddingHorizontal: 10,
      fontSize: 15,
      flex: 1,
      shadowColor: '#171717',
      shadowOffset: { width: 2, height: 0 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    listView: {
      width: '100%',
      zIndex: 999,
      marginTop: 10,
      borderColor: '#c8c7cc',
      borderWidth: 1,
      borderRadius: 10,
    },
    predefinedPlacesDescription: {
      color: '#1faadb',
    },
    row: {},
    loader: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      height: 20,
    },
    description: {},
    separator: {
      height: 0.5,
      backgroundColor: '#c8c7cc',
    },
    poweredContainer: {
      justifyContent: 'flex-end',
      alignItems: 'center',
      borderBottomRightRadius: 5,
      borderBottomLeftRadius: 5,
      borderColor: '#c8c7cc',
      borderTopWidth: 0.5,
    },
    powered: {},
  };
};

const searchBarErrorStyles = {
  container: {
    flex: 1,
  },
  textInputContainer: {
    flexDirection: 'row',
  },
  textInput: {
    height: 56,
    borderRadius: 5,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    flex: 1,
    borderColor: 'red',
  },
  listView: {},
  row: {
    backgroundColor: '#FFFFFF',
    padding: 13,
    minHeight: 44,
    flexDirection: 'row',
  },
  loader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 20,
  },
  description: {},
  separator: {
    height: 0.5,
    backgroundColor: '#c8c7cc',
  },
  poweredContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: '#c8c7cc',
    borderTopWidth: 0.5,
  },
  powered: {},
};

export { searchBarStyles, searchBarErrorStyles };
