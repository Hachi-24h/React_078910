import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker, Alert ,TouchableOpacity} from 'react-native';
import { useDispatch } from 'react-redux';
import { editBike } from '../slices/bikesSlice';

export default function EditBike({ route, navigation }) {
  const { bike } = route.params;
  const dispatch = useDispatch();

  // Thiết lập state cho các thuộc tính được chỉnh sửa
  const [name, setName] = useState(bike.name);
  const [price, setPrice] = useState(bike.price.toString());
  const [type, setType] = useState(bike.type);
  const [description, setDescription] = useState(bike.description);
  const [discount, setDiscount] = useState(bike.discount.toString());
  const [originalPrice, setOriginalPrice] = useState(bike.originalPrice.toString());
  const [statusMessage, setStatusMessage] = useState(''); // Trạng thái thông báo

  const handleSave = () => {
    // Chuyển đổi các giá trị số
    const updatedBike = {
      ...bike,
      name,
      price: parseFloat(price),
      type,
      description,
      discount: parseFloat(discount),
      originalPrice: parseFloat(originalPrice),
    };

    // Dispatch hành động editBike để cập nhật dữ liệu
    dispatch(editBike({ bikeId: bike.id, updatedData: updatedBike }))
      .unwrap()
      .then(() => {
        setStatusMessage('Cập nhật thành công!');
        setTimeout(() => navigation.goBack(), 1000); // Điều hướng lại sau khi thành công
      })
      .catch(() => {
        setStatusMessage('Có lỗi xảy ra khi lưu thay đổi.');
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
      <Text style={styles.header}>Chỉnh sửa thông tin xe đạp</Text>

      {statusMessage ? <Text style={styles.statusMessage}>{statusMessage}</Text> : null}

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

      <Button title="Lưu thay đổi" onPress={handleSave} color="#1e90ff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  statusMessage: {
    color: 'green',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
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
    height: 100,
    textAlignVertical: 'top',
  },
});
