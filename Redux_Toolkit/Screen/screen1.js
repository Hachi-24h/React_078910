import React from 'react';
import { Text, View, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRecoilState } from 'recoil';
import { nameAtom } from '../src/nameAtom';

const Screen1 = ({ navigation }) => {
  const [name, setName] = useRecoilState(nameAtom);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../Data/Image95.png')} />
        <Text style={styles.title}>Manage Your Task</Text>
      </View>
      <View style={styles.input}>
        <TextInput
          onChangeText={setName}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
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
  },
  textInput: {
    borderRadius: 10,
    height: '100%',
    paddingLeft: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 50,
  },
  button: {
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
