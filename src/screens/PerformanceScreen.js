import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';

export default function PerformanceScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={FONTS.h2}>Sua Performance</Text>
        <Text style={styles.subtitle}>Em breve: Acompanhe seu progresso e maestria nos termos do CFA.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  subtitle: {
    marginTop: 10,
    textAlign: 'center',
    color: COLORS.textLight,
  }
});
