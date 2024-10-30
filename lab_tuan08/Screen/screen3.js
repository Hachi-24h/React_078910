import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Screen3 = ({ route, navigation }) => {
  const { ten, textinput, title, idSp } = route.params;
  const [namejob, setNameJob] = useState('');
  const [title1, setTitle1] = useState("ADD YOUR JOB");
  const [text1, setText1] = useState(ten|| ' ');


  useEffect(() => {
    
      setTitle1(title);
      setText1(textinput || 'Input your name job');
      setNameJob(textinput || ''); 
    
  }, [textinput, title]);

  // Hàm thêm job
  const addJob = async ({ ten }) => {
    try {
      const response = await axios.post(
        'https://67166a5e3fcb11b265d25175.mockapi.io/Job',
        {
          nameJob: ten,
        }
      );
      console.log('Job added successfully:', response.data);
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  // Hàm cập nhật job
  const updateJob = async (updatedName) => {
    try {
      const response = await axios.put(
        `https://67166a5e3fcb11b265d25175.mockapi.io/Job/${idSp}`,
        {
          nameJob: updatedName,
        }
      );
      console.log('Job updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  // Hàm xử lý khi nhấn nút Finish
  const handler = async () => {
    if (title1 === "ADD YOUR JOB") {
      await addJob({ ten: namejob });
    } else {
      await updateJob(namejob);
    }
    navigation.navigate('Screen2', { vlname: ten });
  };

  return (
    <View>
      <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => navigation.navigate('Screen2', { vlname: ten })}>
          <Image source={require('../Data/IconButton12.png')} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row' }}>
          <Image source={require('../Data/Avatar31.png')} style={{ marginRight: 10 }} />
          <Text>{`tên là : ${ten}`}{`\n`}Have a great day ahead{' '}</Text>
        </View>
      </View>
      <Text style={{ width: '100%', textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}>
        {title1}
      </Text>
      <View style={{ marginTop: 30, borderWidth: 1, borderColor: 'black', borderRadius: 10, height: 40, width: '80%', marginBottom: 40 }}>
        <TextInput
          onChangeText={setNameJob}
          style={{ borderRadius: 10, borderWidth: 0, height: '100%', paddingLeft:20 }}
          value={namejob}
          placeholder={text1}
        />
      </View>
      <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={handler} 
          style={{ marginTop: 80, borderWidth: 1, borderRadius: 10, borderColor: '#00bdd6', justifyContent: 'center', width: '70%', height: 40, backgroundColor: '#00bdd6' }}
        >
          <Text style={{ textAlign: 'center', color: 'white', }}>Finish</Text>
        </TouchableOpacity>
      </View>
      <Image style={{ marginTop: 100, marginLeft: 40 }} source={require('../Data/Image95.png')} />
    </View>
  );
};

export default Screen3;
