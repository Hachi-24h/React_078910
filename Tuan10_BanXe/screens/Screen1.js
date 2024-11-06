import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import { users } from '../utils/users';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('pass');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  const handleLogin = () => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      setErrorMessage(''); // Xóa thông báo lỗi nếu đăng nhập thành công
      if (user.role === 'admin') {
        navigation.navigate('admin'); // Điều hướng đến trang Admin nếu role là admin
      } else {
        navigation.navigate('Screen2'); // Điều hướng đến trang User nếu role là user
      }
    } else {
      setErrorMessage('Tên đăng nhập hoặc mật khẩu không đúng'); // Hiển thị thông báo lỗi
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require('../assets/xe1.png')} />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Đăng nhập vào tài khoản của bạn</Text>
        <Text style={styles.label}>Tên đăng nhập:</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <Text style={styles.label}>Mật khẩu:</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        {/* Display error message below password input */}
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        <Button title="Đăng nhập" onPress={handleLogin} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  formContainer: {
    flex: 3,
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
});
