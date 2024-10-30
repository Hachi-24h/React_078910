import React from 'react';
import { Text, View, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../src/userslice';

const Screen1 = ({ navigation }) => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.user.name);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../Data/Image95.png')} />
        <Text style={styles.title}>Manage Your Task</Text>
      </View>
      <View style={styles.input}>
        <TextInput
          onChangeText={(text) => dispatch(setName(text))}
          style={styles.textInput}
          value={name}
          placeholder="Enter your name"
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Screen2")} style={styles.button}>
          <Text style={styles.buttonText}>Getting Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    width: 200,
    textAlign: 'center',
  },
  input: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    height: 40,
    width: '70%',
    marginLeft: '15%',
  },
  textInput: {
    borderRadius: 10,
    borderWidth: 0,
    height: '100%',
    paddingLeft: 20,
  },
  buttonContainer: {
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  button: {
    marginTop: 80,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#00bdd6',
    justifyContent: 'center',
    width: '70%',
    height: 40,
    backgroundColor: '#00bdd6',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    marginTop: 7,
  },
});

export default Screen1;
