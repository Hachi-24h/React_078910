import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Picker, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { addBike } from '../slices/bikesSlice';

export default function AddBike({ navigation }) {
  const dispatch = useDispatch();

  // Khởi tạo state cho các thuộc tính xe
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('Mountain');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [discount, setDiscount] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Thông báo lỗi

  // Tạo hàm để kiểm tra tính hợp lệ của dữ liệu
  const validateInputs = () => {
    if (!name || !price || !image || !description || !discount || !originalPrice) {
      setErrorMessage('Vui lòng điền đầy đủ thông tin');
      return false;
    }
    if (isNaN(price) || isNaN(discount) || isNaN(originalPrice)) {
      setErrorMessage('Giá, giảm giá và giá gốc phải là số');
      return false;
    }
    if (parseFloat(discount) > 100) {
      setErrorMessage('Giảm giá không được vượt quá 100%');
      return false;
    }
    setErrorMessage(''); // Xóa lỗi nếu tất cả hợp lệ
    return true;
  };

  const handleAdd = () => {
    if (!validateInputs()) return;

    // Tạo đối tượng xe mới
    const newBike = {
      id: Math.random().toString(36).substr(2, 9), // Tạo id ngẫu nhiên
      name,
      price: parseFloat(price),
      type,
      image,
      description,
      discount: parseFloat(discount),
      originalPrice: parseFloat(originalPrice),
      heart: false, // Mặc định
    };

    // Dispatch action thêm xe mới
    dispatch(addBike(newBike))
      .unwrap()
      .then(() => {
        setErrorMessage(''); // Xóa lỗi nếu thêm thành công
        navigation.goBack(); // Quay lại sau khi thêm thành công
      })
      .catch(() => {
        setErrorMessage('Có lỗi xảy ra khi thêm xe.');
      });
  };

  return (
    <View style={styles.container}>
     <TouchableOpacity onPress={() => navigation.goBack()} style={{ 
          marginTop: 10, 
          padding: 10, 
          alignSelf: 'flex-start', 
          backgroundColor: '#ddd', 
          borderRadius: 8 
        }}>
        <Text style={{ color: '#333', fontSize: 16, fontWeight: 'bold' }}>Quay Lại</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <Text style={styles.header}>Thêm xe mới</Text>

        <Text style={styles.label}>Tên xe:</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Nhập tên xe"
        />

        <Text style={styles.label}>Giá:</Text>
        <TextInput
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          style={styles.input}
          placeholder="Nhập giá xe"
        />

        <Text style={styles.label}>Loại xe (Type):</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={type}
            onValueChange={(itemValue) => setType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Mountain" value="Mountain" />
            <Picker.Item label="Roadbike" value="Roadbike" />
          </Picker>
        </View>

        <Text style={styles.label}>Ảnh (Image):</Text>
        <TextInput
          value={image}
          onChangeText={setImage}
          style={styles.input}
          placeholder="Nhập tên ảnh, ví dụ: anh1.png"
        />

        <Text style={styles.label}>Mô tả (Description):</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          style={[styles.input, styles.textArea]}
          placeholder="Nhập mô tả"
          multiline
        />

        <Text style={styles.label}>Giảm giá (Discount):</Text>
        <TextInput
          value={discount}
          onChangeText={setDiscount}
          keyboardType="numeric"
          style={styles.input}
          placeholder="Nhập phần trăm giảm giá"
        />

        <Text style={styles.label}>Giá gốc (Original Price):</Text>
        <TextInput
          value={originalPrice}
          onChangeText={setOriginalPrice}
          keyboardType="numeric"
          style={styles.input}
          placeholder="Nhập giá gốc"
        />

        {/* Hiển thị thông báo lỗi */}
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <TouchableOpacity onPress={handleAdd} style={styles.button}>
          <Text style={styles.buttonText}>Thêm Xe</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40, 
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1e90ff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
