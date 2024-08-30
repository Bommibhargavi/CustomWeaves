import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Customization from '../components/Customization';

export const fetchBlouseDesigns = createAsyncThunk('blouse/fetchBlouseDesigns', async () => {
  const response = await fetch('YOUR_API_ENDPOINT');
  const data = await response.json();
  return data;
});

const blouseSlice = createSlice({
  name: 'blouse',
  initialState: {
    fabric: null,
    color: null,
    design: null,
    embroidery: null,
    size:null,
  },
  reducers: {
      setCustomization:(state,action)=>{
        console.log(state.size)
        return {
          ...state,
          ...action.payload, 
        };
      },
      resetSize:(state, action)=>{
        state.size=null;

      }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlouseDesigns.fulfilled, (state, action) => {
        state.design = action.payload;
      });
  },
});

export const {setCustomization,resetSize } = blouseSlice.actions;

export default blouseSlice.reducer;
