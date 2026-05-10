import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: -1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  statusBox: {
    marginTop: 30,
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 16,
    width: '100%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  statusTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.primary,
  },
  statusItem: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 5,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  }
});
