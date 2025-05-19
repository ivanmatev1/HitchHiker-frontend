import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

export default function RootLayout() {
  const router = useRouter();
  async function checkUserStatus() {
    const JWT_TOKEN = await SecureStore.getItemAsync("JWT_TOKEN");
    console.log("JWT_TOKEN: ", JWT_TOKEN);
    if(JWT_TOKEN === null){
      router.replace("/(login)");
    }else{
      router.replace("/(home)/(profile)");
    }
  }

  useEffect(() => {
    checkUserStatus();
    console.log("checkUserStatus");
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(login)" options={{ headerShown: false }} />
      <Stack.Screen name="(home)" options={{ headerShown: false }}/>
    </Stack>
  );
}

