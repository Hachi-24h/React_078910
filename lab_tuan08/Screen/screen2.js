import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import useFetch from '../Hook/useEffetch';
import Icon from 'react-native-vector-icons/FontAwesome';

const Screen2 = ({ route, navigation }) => {
  const [textvl, setTextvl] = useState('');
  const { vlname: name } = '';
  // route.params;
  const {
    data: job,
    loading: load2,
    error: rdf,
    refetch: refetch2,
  } = useFetch('https://67166a5e3fcb11b265d25175.mockapi.io/Job');

  
const deleteJob = async (jobId) => {
  try {
    const response = await axios.delete(
      `https://67166a5e3fcb11b265d25175.mockapi.io/Job/${jobId}`
    );
    console.log('Job deleted successfully:', response.data);
    refetch2();
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
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Screen1')}>
            <Image source={require('../Data/IconButton12.png')} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Image
            source={require('../Data/Avatar31.png')}
            style={{ marginRight: 10 }}
          />
          <Text>
            {`tên là : ${name} `}
            {`\n`}Have agrate day a hdead{' '}
          </Text>
        </View>{' '}
      </View>
      <View
        style={{
          marginTop: 30,
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 10,
          height: 40,
          width: '80%',
          marginBottom: 40,
        }}>
        <TextInput
          onChangeText={setTextvl}
          style={{
            borderRadius: 10,
            borderColor: null,
            borderWidth: 0,
            height: '100%',
            paddingLeft: 20,
          }}
          value={textvl}
          placeholder="Search "
        />
      </View>
      <View style={{ width: '100%', height: 450 }}>
        <FlatList data={filterJob} renderItem={renderJobItem} />
      </View>
      <View
        style={{ flex: 1, width: '100%', alignItems: 'center', marginTop: 20 }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#00bdd6',
            borderRadius: 40,
            width: 80,
            height: 80,
          }}
          onPress={() =>
            navigation.navigate('Screen3', { ten: name, title: 'ADD YOUR JOB' })
          }>
          <Text style={{ textAlign: 'center', fontSize: 50 }}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Screen2;
