import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigation from './components/BottomNavigation';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  return (
    <NavigationContainer>
      <BottomNavigation />
    </NavigationContainer>
  );
}
