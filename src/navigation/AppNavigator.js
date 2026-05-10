import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

// Placeholder screens - we'll create them properly next
import WordTrainingScreen from '../screens/WordTrainingScreen';
import PhraseTrainingScreen from '../screens/PhraseTrainingScreen';
import PerformanceScreen from '../screens/PerformanceScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: COLORS.border,
          height: 60,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: COLORS.secondary,
        tabBarInactiveTintColor: COLORS.textLight,
      }}
    >
      <Tab.Screen
        name="Palavras"
        component={WordTrainingScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="school" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Frases"
        component={PhraseTrainingScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="brain" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Performance"
        component={PerformanceScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chart-bar" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
