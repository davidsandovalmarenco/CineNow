import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainTabs } from './MainTabs';
import { MovieDetailScreen } from '../screens/MovieDetailScreen';
import { ScheduleScreen } from '../screens/ScheduleScreen';
import { SeatsScreen } from '../screens/SeatsScreen';
import { SnacksScreen } from '../screens/SnacksScreen';
import { SummaryScreen } from '../screens/SummaryScreen';
import { ConfirmationScreen } from '../screens/ConfirmationScreen';
import { EditProfileScreen } from '../screens/EditProfileScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { PaymentMethodsScreen } from '../screens/PaymentMethodsScreen';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator();

export const RootStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
      <Stack.Screen name="Schedule" component={ScheduleScreen} />
      <Stack.Screen name="Seats" component={SeatsScreen} />
      <Stack.Screen name="Snacks" component={SnacksScreen} />
      <Stack.Screen name="Summary" component={SummaryScreen} />
      <Stack.Screen name="Confirmation" component={ConfirmationScreen} options={{ presentation: 'fullScreenModal' }} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
    </Stack.Navigator>
  );
};
