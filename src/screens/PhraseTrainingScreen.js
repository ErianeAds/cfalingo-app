import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';

export default function PhraseTrainingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={FONTS.h2}>Treino de Frases</Text>
        <Text style={styles.subtitle}>Em breve: Pratique a construção de frases financeiras complexas.</Text>
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
