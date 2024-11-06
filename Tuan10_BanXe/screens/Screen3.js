import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleHeart } from '../slices/bikesSlice';

const Screen3 = ({ route }) => {
  const { bike } = route.params;
  const dispatch = useDispatch();
  const currentBike = useSelector((state) =>
    state.bikes.items.find((item) => item.id === bike.id)
  );

  const handleToggleHeart = () => {
    dispatch(toggleHeart(bike.id));
  };
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
      <View style={styles.imgContainer}>
        <Image source={ getImage(currentBike.image)}  style={styles.image} />
      </View>
      <Text style={styles.title}>{currentBike.name}</Text>
      <Text style={styles.discount}>{currentBike.discount}% OFF ${currentBike.originalPrice}</Text>
      <Text style={styles.price}>${currentBike.price}</Text>
      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.description}>{currentBike.description}</Text>

      <View style={styles.actionContainer}>
        <TouchableOpacity onPress={handleToggleHeart} style={styles.heartIconContainer}>
          <MaterialIcons
            name="favorite"
            size={30}
            color={currentBike.heart ? 'red' : 'gray'}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Add to cart</Text>
        </TouchableOpacity>
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
  imgContainer: {
    backgroundColor: '#E941411A',
    padding: 5,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  discount: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'justify',
    marginBottom: 20,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  heartIconContainer: {
    padding: 10,
  },
  addToCartButton: {
    backgroundColor: '#f77f00',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Screen3;
