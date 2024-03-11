import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import AdminDashboard from '../screens/AdminDashboard';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
      {/* Add more screens as needed */}
    </Tab.Navigator>
  );
};

export default TabNavigation;
