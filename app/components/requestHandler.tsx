import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
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
  } catch (error: any) {
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

export async function getChats() {
  try {
    const response = await apiClient.get(`/chats`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}


export async function getChat(chatId: string) {
  try {
    const response = await apiClient.get(`/chats/${chatId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}


export async function getUser() {
  try {
    const response = await apiClient.get(`/auth/user`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function postRoute(userData: any) {
  try {
    const response = await apiClient.post(`/routes`, userData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function filterRoutes(startLat: number | null, startLng: number | null, endLat: number | null, endLng: number | null, date: Date | null) {
  try {
    const response = await apiClient.get(`/routes/filter`, {
      params: {
        ...(startLat != null && { startLat }),
        ...(startLng != null && { startLng }),
        ...(endLat != null && { endLat }),
        ...(endLng != null && { endLng }),
        ...(date != null? { date } : {}),
      }
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function getPersonalRoutes() {
  try {
    const response = await apiClient.get(`/routes/personal`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function getRoute(routeId: string) {
  try {
    const response = await apiClient.get(`/routes/${routeId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function postRouteRequest(routeId: number) {
  try {
    const response = await apiClient.post(`/route-requests`, {routeId});
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function acceptRequest(requestId: string) {
  try {
    const response = await apiClient.delete(`/route-requests/accept/${requestId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function denyRequest(requestId: string) {
  try {
    const response = await apiClient.delete(`/route-requests/deny/${requestId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function patchRoute(userData: any, routeId: string) {
  try {
    const response = await apiClient.patch(`/routes/${routeId}`, userData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function completeRoute(routeId: string) {
  try {
    const response = await apiClient.patch(`/routes/complete/${routeId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function removeUser(userId: number, routeId: number) {
  try {
    const response = await apiClient.patch(`routes/remove-participant`, {userId, routeId});
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}