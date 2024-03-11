import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import StackNavigation from './StackNavigation';
import TabNavigation from './TabNavigation';
import DrawerNavigation from './DrawerNavigation';

const RootNavigation = () => {
  // Decide which navigator to use based on your app's structure
  // For example, use Stack Navigation as the root navigator
  return (
    <NavigationContainer>
      <StackNavigation />
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
      {/* Or use TabNavigation or DrawerNavigation */}
    </NavigationContainer>
  );
};

export default RootNavigation;
