import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../types/navigation';
import HomeScreen from '../screens/main/HomeScreen';
import ServiceSelectionScreen from '../screens/booking/ServiceSelectionScreen';
import ChatScreen from '../screens/chat/ChatScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

import PetNavigator from './PetNavigator';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === 'HomeStack') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'PetStack') {
            iconName = focused ? 'paw' : 'paw-outline';
          } else if (route.name === 'BookingStack') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'ChatStack') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'ProfileStack') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2E7D32',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="HomeStack" 
        component={HomeScreen} 
        options={{ title: 'Home' }} 
      />
      <Tab.Screen 
        name="PetStack" 
        component={PetNavigator} 
        options={{ title: 'My Pets' }} 
      />
      <Tab.Screen 
        name="BookingStack" 
        component={ServiceSelectionScreen} 
        options={{ title: 'Book' }} 
      />
      <Tab.Screen 
        name="ChatStack" 
        component={ChatScreen} 
        options={{ title: 'AI Chat' }} 
      />
      <Tab.Screen 
        name="ProfileStack" 
        component={ProfileScreen} 
        options={{ title: 'Profile' }} 
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
