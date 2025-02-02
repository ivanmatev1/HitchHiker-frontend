import { Stack } from 'expo-router';

export default function ChatLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Chats",
          headerTitleStyle: {
            color: "rgb(20, 5, 18)",
            fontSize: 24,
            fontWeight: "light",
          },
        }}
      />
      <Stack.Screen
        name="[id]"
      />
    </Stack>
  );
}
