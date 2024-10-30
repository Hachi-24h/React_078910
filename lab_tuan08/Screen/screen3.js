import React, { useState, useEffect } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRecoilValue } from 'recoil';
import { nameAtom } from '../src/nameAtom';
import axios from 'axios';

const Screen3 = ({ route, navigation }) => {
  const name = useRecoilValue(nameAtom);
  const { textinput = '', title = 'ADD YOUR JOB', idSp = null } = route?.params || {};
  const [namejob, setNameJob] = useState('');

  useEffect(() => {
    setNameJob(textinput || '');
  }, [textinput]);

  const addJob = async () => {
    try {
      await axios.post('https://67166a5e3fcb11b265d25175.mockapi.io/Job', { nameJob: namejob });
      navigation.navigate('Screen2');
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  const updateJob = async () => {
    try {
      await axios.put(`https://67166a5e3fcb11b265d25175.mockapi.io/Job/${idSp}`, { nameJob: namejob });
      navigation.navigate('Screen2');
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  const handleFinish = async () => {
    if (title === 'ADD YOUR JOB') {
      await addJob();
    } else {
      await updateJob();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Screen2')}>
          <Image source={require('../Data/IconButton12.png')} />
        </TouchableOpacity>
        <View style={styles.userContainer}>
          <Image source={require('../Data/Avatar31.png')} style={styles.avatar} />
          <Text>{`Tên là: ${name}\nHave a great day ahead`}</Text>
        </View>
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={setNameJob}
          style={styles.textInput}
          value={namejob}
          placeholder="Input your job"
        />
      </View>
      <TouchableOpacity onPress={handleFinish} style={styles.button}>
        <Text style={styles.buttonText}>Finish</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
 
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  userContainer: {
    flexDirection: 'row',
  },
  avatar: {
    marginRight: 10,
  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    height: 40,
    marginBottom: 40,
  },
  textInput: {
    borderRadius: 10,
    height: '100%',
    paddingLeft: 20,
  },
  button: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#00bdd6',
    justifyContent: 'center',
    width: '70%',
    height: 40,
    backgroundColor: '#00bdd6',
    alignSelf: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
});

export default Screen3;
