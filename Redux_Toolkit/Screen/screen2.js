import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useRecoilValue } from 'recoil';
import { nameAtom } from '../src/nameAtom';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const Screen2 = ({ navigation }) => {
  const name = useRecoilValue(nameAtom);
  const [textvl, setTextvl] = useState('');
  const [jobList, setJobList] = useState([]);

  // Hàm lấy danh sách công việc từ API
  const fetchJobs = async () => {
    try {
      const response = await axios.get('https://67166a5e3fcb11b265d25175.mockapi.io/Job');
      setJobList(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  // Gọi fetchJobs khi component được mount
  useEffect(() => {
    fetchJobs();
  }, []);

  // Hàm xóa công việc
  const deleteJob = async (jobId) => {
    try {
      await axios.delete(`https://67166a5e3fcb11b265d25175.mockapi.io/Job/${jobId}`);
      fetchJobs(); // Cập nhật lại danh sách công việc sau khi xóa
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  // Hàm lọc công việc theo từ khóa tìm kiếm
  const filteredJobs = jobList.filter((job) =>
    job.nameJob.toLowerCase().includes(textvl.toLowerCase())
  );

  // Hàm render từng mục công việc
  const renderJobItem = ({ item }) => (
    <View style={styles.jobItem}>
      <Text style={styles.jobText}>{item.nameJob}</Text>
      <View style={styles.jobActions}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Screen3', {
              textinput: item.nameJob,
              title: 'EDIT YOUR JOB',
              idSp: item.id,
            })
          }>
          <Image source={require('../Data/iconamoon_edit-bold.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteJob(item.id)}>
          <Icon name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
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
      <View style={{width:'100%',height:400}}>
        <FlatList
          data={filteredJobs}
          renderItem={renderJobItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <View style={styles.addButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Screen3', { title: 'ADD YOUR JOB' })} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
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
    marginBottom: 20,
    alignSelf: 'center',
  },
  textInput: {
    borderRadius: 10,
    paddingLeft: 20,
    height:'100%'
  },

  jobItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  jobText: {
    fontSize: 16,
  },
  jobActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
  addButtonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  addButton: {
    backgroundColor: '#00bdd6',
    borderRadius: 40,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 50,
    textAlign: 'center',
  },
});

export default Screen2;
