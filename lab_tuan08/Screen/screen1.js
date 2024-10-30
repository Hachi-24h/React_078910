import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useState} from 'react'
const Screen1 = ({navigation }) => {
  const [name,setName] = useState(" ");
  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          alignContent: 'center',
          alignItems: 'center',
          marginTop: 50,
        }}>
        <Image source={require('../Data/Image95.png')} />
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            width: 200,
            textAlign: 'center',
          }}>
          Manage Your task{' '}
        </Text>
      </View>
      <View style={styles.input}>
        <TextInput onChangeText={setName}
          style={{
            borderRadius: 10,
            borderColor: null,
            borderWidth: 0,
            placeholder:'Input your name ',
            height: '100%',
            paddingLeft:20
          
          }}
          value={name}
          placeholder="Enter your name "
        />
      </View>
      <View
        style={{
          width: '100%',
          alignContent: 'center',
          alignItems: 'center',
          marginTop: 50,
        }}>
        <TouchableOpacity onPress ={()=> navigation.navigate("Screen2",{vlname:name})}
          style={{
            marginTop: 80,
            borderWidth: 1,
            borderRadius: 10,
            borderColor:'#00bdd6',
            justifyContent: 'center',
            width: '70%',
            height: 40,
            backgroundColor: '#00bdd6',
          }}>
          <Text
            style={{
              borderRadius: 10,
              borderColor: null,
              borderWidth: 0,
              height: '100%',
              textAlign: 'center',
              color:'white',
              marginTop: 7,
            }}>
            Getting Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    height: 40,
    width: '70%',
    marginLeft:'15%'
    
  },
  container: {
    flex: 1,
  },
});

export default Screen1;
