import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import useFetch from '../Hook/useEffetch';
const Screen2 = ({ navigation }) => {
  const name = useSelector((state) => state.user.name);
  const [textvl, setTextvl] = useState('');
   const {
    data: job,
    loading: load2,
    error: rdf,
    refetch: refetch2,
  } = useFetch('https://67166a5e3fcb11b265d25175.mockapi.io/Job');
  const deleteJob = async (jobId) => {
    try {
      await axios.delete(`https://67166a5e3fcb11b265d25175.mockapi.io/Job/${jobId}`);
     
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };
  const renderJobItem = ({ item }) => (
    <View
      style={{
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
        margin: 5,
        backgroundColor: 'white',
        borderRadius: 20,
        height: 40,
        alignItems: 'center',
      }}>
      <TouchableOpacity>
        <Image
          source={require('../Data/mdi_marker-tick.png')}
          style={{ marginLeft: 20 }}
        />
      </TouchableOpacity>
      <Text>{item.nameJob} </Text>
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Screen3', {
              textinput: item.nameJob,
              title: 'EDIT YOUR JOB',
              idSp: `${item.id}`,
            })
          }>
          <Image
            source={require('../Data/iconamoon_edit-bold.png')}
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{marginRight:20}} onPress={() => deleteJob(item.id)} >
          <Icon name="trash" size={24} color="red"  />
        </TouchableOpacity>
      </View>
    </View>
  );

  const filterJob = job.filter((item) =>
    item.nameJob.toLowerCase().includes(textvl.toLowerCase())
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Screen1')}>
          <Image source={require('../Data/IconButton12.png')} />
        </TouchableOpacity>
        <View style={styles.userContainer}>
          <Image source={require('../Data/Avatar31.png')} style={styles.avatar} />
          <Text>{`Tên là: ${name}\nHave a great day ahead`}</Text>
        </View>
      </View>
      <View style={styles.searchInput}>
        <TextInput
          onChangeText={setTextvl}
          style={styles.textInput}
          value={textvl}
          placeholder="Search"
        />
      </View>
      <View style={styles.listContainer}>
           <FlatList data={filterJob} renderItem={renderJobItem} />
      </View>
      <View style={styles.addButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Screen3')} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userContainer: {
    flexDirection: 'row',
  },
  avatar: {
    marginRight: 10,
  },
  searchInput: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    height: 40,
    width: '80%',
    marginBottom: 40,
  },
  textInput: {
    borderRadius: 10,
    borderWidth: 0,
    height: '100%',
    paddingLeft: 20,
  },
  listContainer: {
    width: '100%',
    height: 450,
  },
  addButtonContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  addButton: {
    backgroundColor: '#00bdd6',
    borderRadius: 40,
    width: 80,
    height: 80,
  },
  addButtonText: {
    textAlign: 'center',
    fontSize: 50,
  },
});

export default Screen2;
