import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const apiClient = axios.create({
  baseURL: 'http://10.0.2.2:3000',
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("JWT_TOKEN");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export async function getUsers() {
  try {
    const response = await apiClient.get("/users");
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }

}

export async function postUser(userData: any) {
  try {
    const response = await apiClient.post(`/users`, userData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function findUserByEmail(email: string) {
  try {
    const response = await apiClient.get(`/users/search`, {
      params: {
        email: email,
      },
    });
    return response.data;
  } catch (error:any) {
    throw new Error(error.response.data.message);
  }
}

export async function postLogin(userData: { email: string; password: string, provider: string }) {
  try {
    const response = await apiClient.post(`/auth/login`, userData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function testRequest() {
  try {
    const response = await apiClient.get(`auth/test`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function getChats() {
  try {
    const response = await apiClient.get(`/chats`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}


export async function getChat(chatId: string) {
  try{
    const response = await apiClient.get(`/chats/${chatId}`);
    return response.data;
  }catch(error: any) {
    throw new Error(error.response.data.message);
  }
}


export async function getUser(){
  try {
    const response = await apiClient.get(`/auth/user`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}