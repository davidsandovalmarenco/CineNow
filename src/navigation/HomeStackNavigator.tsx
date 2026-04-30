import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { MovieDetailScreen } from '../screens/MovieDetailScreen';
import { ScheduleScreen } from '../screens/ScheduleScreen';
import { SeatsScreen } from '../screens/SeatsScreen';
import { SnacksScreen } from '../screens/SnacksScreen';
import { SummaryScreen } from '../screens/SummaryScreen';
import { ConfirmationScreen } from '../screens/ConfirmationScreen';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator();

export const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MovieDetail" component={MovieDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Schedule" component={ScheduleScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Seats" component={SeatsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Snacks" component={SnacksScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Summary" component={SummaryScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Confirmation" component={ConfirmationScreen} options={{ headerShown: false, presentation: 'fullScreenModal' }} />
    </Stack.Navigator>
  );
};
