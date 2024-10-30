import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { View, Text, TextInput, TouchableOpacity, StyleSheet ,FlatList, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Nhập useFocusEffect từ React Navigation

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      console.log('API Data:', response.data); // Kiểm tra dữ liệu trả về từ API
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url]);

  // Tải lại dữ liệu khi màn hình được focus
  useFocusEffect(
    useCallback(() => {
      fetchData(); // Gọi lại hàm fetchData để tải lại dữ liệu
    }, [fetchData])
  );

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;



