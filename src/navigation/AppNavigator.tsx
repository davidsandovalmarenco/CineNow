import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';
import { AuthNavigator } from './AuthNavigator';
import { RootStackNavigator } from './RootStackNavigator';
import { useAuth } from '../hooks/useAuth';
import { colors } from '../theme/colors';

export const AppNavigator = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <RootStackNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
