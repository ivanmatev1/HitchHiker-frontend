import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs, useSegments } from 'expo-router';


export default function TabLayout() {
  const segments = useSegments();

  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: "rgb(20, 5, 18)",
      tabBarInactiveTintColor: "rgb(150, 137, 150)",
      tabBarStyle: {
        paddingTop: 7,
        height: 60,
        paddingBottom: 7
      }
    }}>
      <Tabs.Screen
        name="(routes)"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <FontAwesome6 size={28} name="route" color={color} />,
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="(create)"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="plus" color={color} />,
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="(chats)"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <Ionicons name="chatbox-ellipses" size={28} color={color} />,
          headerShown: false,
          tabBarStyle: { display: segments[2] === "[id]" ? "none" : "flex" },
        }}
      />

      <Tabs.Screen
        name="(profile)"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color}/>,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}