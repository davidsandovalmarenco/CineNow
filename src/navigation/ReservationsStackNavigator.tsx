import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ReservationsScreen } from '../screens/ReservationsScreen';
import { ConfirmationScreen } from '../screens/ConfirmationScreen';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator();

export const ReservationsStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen 
        name="ReservationsMain" 
        component={ReservationsScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Confirmation" 
        component={ConfirmationScreen} 
        options={{ headerShown: false, presentation: 'fullScreenModal' }} 
      />
    </Stack.Navigator>
  );
};
