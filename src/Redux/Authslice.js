import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import CustomDesigns from '../components/CustomDesigns';

const API_URL = 'https://customweavesapi.onrender.com/users';

// Thunks for async actions
export const registerUser = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const loginUser = createAsyncThunk('auth/loginUser', async (loginData, { rejectWithValue }) => {
  try {
    // Fetch user by username
    const response = await axios.get(`${API_URL}?username=${loginData.username}`);
    const users = response.data;

    if (users.length > 0) {
      const user = users[0];
      console.log(user)
      // Validate password
      if (user.password === loginData.password) {
        return user;
      } else {
        throw new Error('Invalid username or password');
      }
    } else {
      throw new Error('Invalid username or password');
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});


export const addFavorite = createAsyncThunk('auth/addFavorite', async ({ userId, product }, { rejectWithValue }) => {
  try {
    const userResponse = await axios.get(`${API_URL}/${userId}`);
    const updatedFavorites = [...userResponse.data.favorites, product];
    const response = await axios.patch(`${API_URL}/${userId}`, {
      favorites: updatedFavorites
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const removeFavorite = createAsyncThunk('auth/removeFavorite', async ({ userId, product}, { rejectWithValue }) => {
  try {
    // Get the user's current favorites
    const userResponse = await axios.get(`${API_URL}/${userId}`);
    const currentFavorites = userResponse.data.favorites;

    // Filter out the product to be removed
    const updatedFavorites = currentFavorites.filter(fav => fav.id !== product.id);

    // Update the user's favorites on the server
    const response = await axios.patch(`${API_URL}/${userId}`, {
      favorites: updatedFavorites,
    });

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const addToCart = createAsyncThunk(
  'auth/addToCart',
  async ({ userId, product, size, quantity }, { rejectWithValue }) => {
    console.log(size)
    try {
      // Get the user's current cart
      const userResponse = await axios.get(`${API_URL}/${userId}`);

      // Create a new product object that includes the size
      const productWithSize = { ...product, size, quantity };
      console.log(productWithSize)

      // Add the product with size to the cart
      const updatedCart = [...userResponse.data.cart, productWithSize];

      // Update the user's cart on the server
      const response = await axios.patch(`${API_URL}/${userId}`, {
        cart: updatedCart,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeFromCart = createAsyncThunk('auth/removeFromCart', async ({ userId, product }, { rejectWithValue }) => {
  try {
    // Get the user's current cart items
    const userResponse = await axios.get(`${API_URL}/${userId}`);
    const currentCart = userResponse.data.cart;

    // Filter out the product to be removed
    const updatedCart = currentCart.filter(cartItem => cartItem.id !== product.id);

    // Update the user's cart on the server
    const response = await axios.patch(`${API_URL}/${userId}`, {
      cart: updatedCart,
    });

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const addcustomDesign = createAsyncThunk('auth/addcustomDesign', async ({ userId, customDesign }, { rejectWithValue }) => {
  console.log(customDesign, userId)
  try {
    const userResponse = await axios.get(`${API_URL}/${userId}`);
    console.log(userResponse.data)

    const updatedcustomDesign = [...userResponse.data.CustomDesigns, customDesign];
    console.log(updatedcustomDesign)
    const response = await axios.patch(`${API_URL}/${userId}`, {
      CustomDesigns: updatedcustomDesign
      
      
    });
   
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


export const removecustomDesign = createAsyncThunk('auth/removecustomDesign', async ({ userId, customDesign }, { rejectWithValue }) => {
  try {
    // Get the user's current cart items
    const userResponse = await axios.get(`${API_URL}/${userId}`);
    const currentcustomDesign = userResponse.data.CustomDesigns;

    // Filter out the product to be removed
    const updatedcustomDesign = currentcustomDesign.filter(cartItem => cartItem.id !== customDesign.id);

    // Update the user's cart on the server
    const response = await axios.patch(`${API_URL}/${userId}`, {
      CustomDesigns: updatedcustomDesign,
    });

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


export const PlaceOrder = createAsyncThunk('auth/PlaceOrder', async ({ userId, product, quantity, size}, { rejectWithValue }) => {
  console.log("clicked")
  try {
    const userResponse = await axios.get(`${API_URL}/${userId}`);
    const productwithUserInfo={...product, quantity, size}

    const updatedOrders = [...userResponse.data.orders, productwithUserInfo];
    const response = await axios.patch(`${API_URL}/${userId}`, {
      orders: updatedOrders
      
      
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});




const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userReg: null,
    user:null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userReg = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login user
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add favorite
      .addCase(addFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Remove favorite
      .addCase(removeFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;

      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Remove from cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
