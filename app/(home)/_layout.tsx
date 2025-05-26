import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs, useSegments } from 'expo-router';
import RoutesHeader from '../components/routesHeader';


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
        name="(profile)"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color}/>,
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="(routes)"
        options={{
          title: "Routes",
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="search" color={color} />,
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="(create)"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <Feather size={28} name="plus-square" color={color} />,
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
    </Tabs>
  );
}