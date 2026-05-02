import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';
import { AuthNavigator } from './AuthNavigator';
import { RootStackNavigator } from './RootStackNavigator';
import { useAuth } from '../hooks/useAuth';
import { colors } from '../theme/colors';
import { seedService } from '../services/seedService';

export const AppNavigator = () => {
  const { user, isLoading } = useAuth();
  const hasSyncedCatalog = useRef(false);

  useEffect(() => {
    if (!user || hasSyncedCatalog.current) return;

    hasSyncedCatalog.current = true;
    Promise.all([
      seedService.seedMovies(),
      seedService.seedSnacks(),
    ]).catch((error) => {
      console.error('Error syncing Firebase catalog:', error);
    });
  }, [user]);

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
