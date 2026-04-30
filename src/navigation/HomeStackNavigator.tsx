import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { MovieDetailScreen } from '../screens/MovieDetailScreen';
import { ScheduleScreen } from '../screens/ScheduleScreen';
import { SeatsScreen } from '../screens/SeatsScreen';
import { SnacksScreen } from '../screens/SnacksScreen';
import { SummaryScreen } from '../screens/SummaryScreen';
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
      <Stack.Screen name="MovieDetail" component={MovieDetailScreen} options={{ title: '' }} />
      <Stack.Screen name="Schedule" component={ScheduleScreen} options={{ title: 'Horarios' }} />
      <Stack.Screen name="Seats" component={SeatsScreen} options={{ title: 'Asientos' }} />
      <Stack.Screen name="Snacks" component={SnacksScreen} options={{ title: 'Dulcería' }} />
      <Stack.Screen name="Summary" component={SummaryScreen} options={{ title: 'Resumen de Reserva' }} />
    </Stack.Navigator>
  );
};
