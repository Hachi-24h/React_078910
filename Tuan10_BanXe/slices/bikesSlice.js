import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://671001f7a85f4164ef2cc4c3.mockapi.io/api/bike';

// Action để lấy danh sách xe đạp
export const fetchBikes = createAsyncThunk('bikes/fetchBikes', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Action để toggle trạng thái heart của xe đạp
export const toggleHeart = createAsyncThunk('bikes/toggleHeart', async (bikeId, { getState }) => {
  const bike = getState().bikes.items.find((b) => b.id === bikeId);
  if (!bike) throw new Error("Bike not found");

  const updatedBike = { ...bike, heart: !bike.heart };
  
  await axios.put(`${API_URL}/${bikeId}`, updatedBike);
  return updatedBike;
});

// Action để thêm xe đạp
export const addBike = createAsyncThunk('bikes/addBike', async (newBike) => {
  const response = await axios.post(API_URL, newBike);
  return response.data;
});

// Action để sửa xe đạp
export const editBike = createAsyncThunk('bikes/editBike', async ({ bikeId, updatedData }) => {
  const response = await axios.put(`${API_URL}/${bikeId}`, updatedData);
  return response.data;
});

// Action để xóa xe đạp
export const deleteBike = createAsyncThunk('bikes/deleteBike', async (bikeId) => {
  await axios.delete(`${API_URL}/${bikeId}`);
  return bikeId;
});

const bikesSlice = createSlice({
  name: 'bikes',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Reducer để xóa thông báo lỗi
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBikes.pending, (state) => {
        state.loading = true;
        state.error = null;
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
      })
      .addCase(toggleHeart.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addBike.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addBike.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(editBike.fulfilled, (state, action) => {
        const updatedBike = action.payload;
        const index = state.items.findIndex((bike) => bike.id === updatedBike.id);
        if (index >= 0) {
          state.items[index] = updatedBike;
        }
      })
      .addCase(editBike.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteBike.fulfilled, (state, action) => {
        state.items = state.items.filter((bike) => bike.id !== action.payload);
      })
      .addCase(deleteBike.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { clearError } = bikesSlice.actions;
export default bikesSlice.reducer;
