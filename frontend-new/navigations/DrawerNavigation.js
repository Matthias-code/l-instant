import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import AdminDashboard from '../screens/AdminDashboard';
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
      {/* Add more screens as needed */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
