import React from 'react'

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { windowHeight, windowWidth } from '../utils/Dimentions';

const HomeStyles = (props) => {

  return (
    <View styles={styles.container} >
      <View style={styles.textStyle} />


    </View>
  )
}


export default HomeStyles



export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 20,
  },
  textStyle: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'flex-start',
  },
  btnSubmit: {
    backgroundColor: 'blue',
    width: windowWidth / 1.5,
    fontSize: 20,
    color: 'white',
    // alignSelf: 'flex-start',
    // width: '100%',
    width: windowWidth / 1.5,
    height: windowHeight / 10,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
    margin: 0,
  },
  datePickerStyle: {
    width: 200,
    marginTop: 5,
  },
  timePickerStyle: {
    width: 200,
    marginTop: 5,
    color: '#000000'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  centeredNotes: {
    // flex: 1,
    fontSize: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    color: "#ffffff"
    // , borderWidth: 5, borderColor: '#ffffff'
  },
  centeredList: {
    // flex: 1,
    fontSize: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    color: "#ffffff"
    , borderWidth: 1, borderColor: '#ffffff'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalMandatory: {
    color: 'red'
  },
  btnLogout: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: windowWidth / 4,
    backgroundColor: "#fa2549",
    alignSelf: 'flex-end',
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  btnBookSlot: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: windowWidth / 4,
    backgroundColor: "#0eb51c",
    alignSelf: 'center',
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  btnSubmit: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: windowWidth / 1.45,
    backgroundColor: "#2e64e5",
    // alignSelf: 'center',
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  btnCancel: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: windowWidth / 1.45,
    backgroundColor: "#fa2549",
    marginTop: 5,
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold"
  }
})
