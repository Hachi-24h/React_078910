// screens/AdminScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBikes, toggleHeart, deleteBike } from '../slices/bikesSlice';

const AdminScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { items: bikes, loading, error } = useSelector((state) => state.bikes);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBike, setSelectedBike] = useState(null);
  const [statusMessage, setStatusMessage] = useState(''); // Biến trạng thái để hiển thị thông báo

  useEffect(() => {
    dispatch(fetchBikes());
  }, [dispatch]);

  const filteredBikes = bikes.filter((bike) =>
    selectedCategory === 'All' ? true : bike.type === selectedCategory
  );

  const handleDelete = () => {
    if (!selectedBike) {
      setStatusMessage('Vui lòng chọn một xe để xóa.');
      return;
    }

    dispatch(deleteBike(selectedBike.id))
      .unwrap()
      .then(() => {
        setSelectedBike(null);
        setStatusMessage('Xe đã được xóa khỏi danh sách.'); // Thông báo thành công
      })
      .catch(() => {
        setStatusMessage('Có lỗi xảy ra khi xóa xe.'); // Thông báo lỗi
      });
  };

  const handleEdit = () => {
    if (!selectedBike) {
      setStatusMessage('Vui lòng chọn một xe để sửa.');
      return;
    }
    navigation.navigate('edit', { bike: selectedBike });
  };

  const handleAdd = () => {
    navigation.navigate('add');
  };

  if (loading) return <ActivityIndicator size="large" color="blue" />;
  if (error) return <Text>Error fetching data...</Text>;

  const getImage = (imagePath) => {
    switch (imagePath) {
      case 'xe1.png':
        return require('../assets/xe1.png');
      case 'xe2.png':
        return require('../assets/xe2.png');
      case 'xe3.png':
        return require('../assets/xe3.png');
      case 'xe4.png':
        return require('../assets/xe4.png');
      default:
        return require('../assets/xe4.png');
    }
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
      <Text style={styles.header}>Admin - Quản lý xe đạp</Text>
      
      {/* Hiển thị thông báo trạng thái */}
      {statusMessage ? <Text style={styles.statusMessage}>{statusMessage}</Text> : null}

      <View style={styles.filterContainer}>
        {['All', 'Roadbike', 'Mountain'].map((category) => (
          <TouchableOpacity
            key={category}
            style={styles.filterButton}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[styles.filterButtonText, selectedCategory === category && styles.activeFilterButton]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <FlatList
        data={filteredBikes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.bikeCard,
              selectedBike?.id === item.id && styles.selectedBikeCard, // Highlight xe được chọn
            ]}
            onPress={() => setSelectedBike(item)}
          >
            <MaterialIcons
              name="favorite"
              size={24}
              color={item.heart ? 'red' : 'gray'}
              style={styles.heartIcon}
              onPress={() => dispatch(toggleHeart(item.id))}
            />
            <Image source={getImage(item.image)} style={styles.bikeImage} />
            <Text style={styles.bikeName}>{item.name}</Text>
            <Text style={styles.bikePrice}>$ {item.price}</Text>
          </TouchableOpacity>
        )}
        numColumns={2}
      />

      <View style={styles.adminButtonsContainer}>
        <Button title="Thêm" onPress={handleAdd} color="green"  />
        <Button title="Sửa" onPress={handleEdit} color="orange" />
        <Button title="Xóa" onPress={handleDelete} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'red',
    textAlign: 'center',
  },
  statusMessage: {
    fontSize: 16,
    color: 'blue',
    textAlign: 'center',
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'pink',
  },
  activeFilterButton: {
    color: 'red',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#bbbbbb',
  },
  bikeCard: {
    flex: 1,
    margin: 10,
    backgroundColor: '#E941411A',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    position: 'relative',
  },
  selectedBikeCard: {
    borderColor: 'blue',
    borderWidth: 2,
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  bikeImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  bikeName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bikePrice: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  },
  adminButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
});

export default AdminScreen;
