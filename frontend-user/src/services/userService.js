// frontend-user/src/services/userService.js

import apiService from './apiService';

// GET: Get User Profile
export const getUserProfile = async () => {
  try {
    const response = await apiService.get('/users/profile');
    return response.data; 
  } catch (error) {
    console.error('Error fetching user profile:', error.response?.data || error.message);
    throw error;
  }
};

// PUT: Update User Profile
export const updateUserProfile = async (updatedData) => {
  try {
    const response = await apiService.put('/users/profile', updatedData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error updating user profile (API Error):', error.response?.data?.message || error.message);
    } else {
      console.error('Error updating user profile (Generic Error):', error.message);
    }
    throw error;
  }
};

// POST: Send OTP for sensitive actions
export const sendOtp = async () => {
  try {
    const response = await apiService.post('/users/send-otp');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// POST: Verify OTP
export const verifyOtp = async (otp) => {
  try {
    const response = await apiService.post('/users/verify-otp', { otp });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// PUT: Change Password
export const changePassword = async (passwords) => {
  try {
    const response = await apiService.put('/users/change-password', passwords);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// POST: Forgot Password
export const forgotPassword = async (identifier) => {
  try {
    const response = await apiService.post('/users/forgot-password', { identifier });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// POST: Reset Password
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await apiService.post('/users/reset-password', { token, newPassword });
    return response.data;
  } catch (error) {
    throw error;
  }
};