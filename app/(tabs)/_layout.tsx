// app/(tabs)/_layout.tsx
import React from "react";
import { Platform } from "react-native";
import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}
    >
      <Tabs
        initialRouteName="browse" // <-- MUST match app/(tabs)/browse.tsx
        screenOptions={{
          animation: "shift",
          headerShown: false,
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: { position: "absolute" },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarLabel: "Profile",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="user" size={24} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="browse"
          options={{
            title: "Browse",
            tabBarLabel: "Browse",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="person.3.fill" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="(chats)"
          options={{
            title: "Chats",
            tabBarLabel: "Chats",
            tabBarIcon: ({ color }) => (
              <Ionicons name="chatbubble" size={24} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="index"
          options={{
            title: "Likes",
            tabBarLabel: "Likes",
            tabBarIcon: ({ color }) => (
              <Ionicons name="heart" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
