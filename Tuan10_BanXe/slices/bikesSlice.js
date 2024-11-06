import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://671001f7a85f4164ef2cc4c3.mockapi.io/api/bike';

// Tạo action để lấy danh sách xe đạp từ API
export const fetchBikes = createAsyncThunk('bikes/fetchBikes', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Tạo action để toggle trạng thái heart của xe đạp
export const toggleHeart = createAsyncThunk('bikes/toggleHeart', async (bikeId, { getState }) => {
  const bike = getState().bikes.items.find((b) => b.id === bikeId);
  const updatedBike = { ...bike, heart: !bike.heart };

  // Cập nhật trạng thái heart trên API
  await axios.put(`${API_URL}/${bikeId}`, updatedBike);
  return updatedBike;
});

const bikesSlice = createSlice({
  name: 'bikes',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBikes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBikes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBikes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(toggleHeart.fulfilled, (state, action) => {
        const updatedBike = action.payload;
        const index = state.items.findIndex((bike) => bike.id === updatedBike.id);
        if (index >= 0) {
          state.items[index] = updatedBike;
        }
      });
  },
});

export default bikesSlice.reducer;
