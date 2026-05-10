import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { COLORS, FONTS, SIZES } from '../constants/theme';

export default function WordTrainingScreen() {
  const [currentWord, setCurrentWord] = useState('ASSET');
  const [answer, setAnswer] = useState('');
  const [mastery, setMastery] = useState(3);
  const [loading, setLoading] = useState(false);
  const [resultModalVisible, setResultModalVisible] = useState(false);
  const [resultData, setResultData] = useState(null);

  const loadNextWord = async () => {
    setLoading(true);
    // Simulating API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleSpeak = () => {
    Speech.speak(currentWord, {
      language: 'en-US',
      pitch: 1.0,
      rate: 0.9,
    });
  };

  const checkAnswer = () => {
    setResultData({
      report: {
        word: currentWord,
        correct_meaning: 'Ativo',
        insight: 'Recurso com valor econômico que uma empresa possui ou controla.',
        example: 'The company\'s assets include cash, inventory, and property.'
      },
      score: 100
    });
    setResultModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header-like stats */}
        <View style={styles.statsRow}>
          <View style={styles.masteryBox}>
            <Text style={styles.statsLabel}>MAESTRIA</Text>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((s) => (
                <MaterialCommunityIcons 
                  key={s} 
                  name="star" 
                  size={16} 
                  color={s <= mastery ? "#facc15" : "#e2e8f0"} 
                />
              ))}
            </View>
          </View>
          <View style={styles.xpBox}>
             <Text style={styles.xpText}>1250 XP</Text>
          </View>
        </View>

        {/* Word Card */}
        <View style={styles.wordCard}>
          <Text style={styles.wordTitle}>{currentWord}</Text>
          <Text style={styles.wordSubtitle}>Traduza este termo financeiro</Text>
        </View>

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite a tradução..."
            value={answer}
            onChangeText={setAnswer}
            placeholderTextColor={COLORS.textLight}
          />
          <TouchableOpacity style={styles.voiceBtn} onPress={handleSpeak}>
            <MaterialCommunityIcons name="volume-high" size={24} color={COLORS.secondary} />
          </TouchableOpacity>
        </View>

        {/* Actions */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={[styles.btn, styles.btnSkip]} onPress={loadNextWord}>
            <MaterialCommunityIcons name="skip-next" size={20} color={COLORS.textLight} />
            <Text style={styles.btnSkipText}>PULAR</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.btn, styles.btnCheck]} onPress={checkAnswer}>
            <Text style={styles.btnCheckText}>VERIFICAR</Text>
            <MaterialCommunityIcons name="check-circle" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Result Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={resultModalVisible}
        onRequestClose={() => setResultModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={[styles.statusBadge, resultData?.score >= 80 ? styles.statusSuccess : styles.statusError]}>
              <MaterialCommunityIcons 
                name={resultData?.score >= 80 ? "check-decagram" : "alert-circle"} 
                size={16} 
                color={COLORS.white} 
              />
              <Text style={styles.statusText}>
                {resultData?.score >= 80 ? "EXCELENTE!" : "QUASE LÁ"}
              </Text>
            </View>

            <View style={styles.resultTextContainer}>
              <Text style={styles.resultWord}>{resultData?.report.word}</Text>
              <Text style={styles.resultMeaning}>{resultData?.report.correct_meaning}</Text>
            </View>

            <View style={styles.insightBox}>
              <View style={styles.insightHeader}>
                <View style={styles.insightIconCircle}>
                  <MaterialCommunityIcons name="lightbulb-on" size={18} color={COLORS.secondary} />
                </View>
                <Text style={styles.insightTitle}>INSIGHT FINANCEIRO</Text>
              </View>
              <Text style={styles.insightBody}>{resultData?.report.insight}</Text>
              
              <View style={styles.exampleDivider} />
              
              <View style={styles.exampleContainer}>
                <MaterialCommunityIcons name="chat-outline" size={16} color={COLORS.textLight} />
                <View style={{ flex: 1, marginLeft: 8 }}>
                   <Text style={styles.exampleLabel}>EXEMPLO DE USO</Text>
                   <Text style={styles.exampleBody}>{resultData?.report.example}</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.nextBtn} 
              onPress={() => {
                setResultModalVisible(false);
                loadNextWord();
              }}
            >
              <Text style={styles.nextBtnText}>PRÓXIMO TERMO</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  masteryBox: {
    alignItems: 'flex-start',
  },
  statsLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: COLORS.textLight,
    letterSpacing: 1,
    marginBottom: 4,
  },
  starsRow: {
    flexDirection: 'row',
  },
  xpBox: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  xpText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  wordCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
  },
  wordTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.primary,
    marginBottom: 10,
  },
  wordSubtitle: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  input: {
    backgroundColor: COLORS.white,
    height: 60,
    borderRadius: 16,
    paddingHorizontal: 20,
    fontSize: 18,
    color: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  voiceBtn: {
    position: 'absolute',
    right: 15,
    top: 10,
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f0f7ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  btn: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  btnSkip: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  btnSkipText: {
    fontSize: 14,
    fontWeight: '900',
    color: COLORS.textLight,
  },
  btnCheck: {
    backgroundColor: COLORS.primary,
  },
  btnCheckText: {
    fontSize: 14,
    fontWeight: '900',
    color: COLORS.white,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 30, 64, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    marginBottom: 20,
  },
  statusSuccess: {
    backgroundColor: COLORS.success,
  },
  statusError: {
    backgroundColor: COLORS.error,
  },
  statusText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '900',
  },
  resultTextContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  resultWord: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.primary,
  },
  resultMeaning: {
    fontSize: 18,
    color: COLORS.textLight,
    fontStyle: 'italic',
  },
  insightBox: {
    backgroundColor: '#f0f7ff',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    marginBottom: 24,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  insightIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  insightTitle: {
    fontSize: 11,
    fontWeight: '900',
    color: '#1e3a8a',
    letterSpacing: 1,
  },
  insightBody: {
    fontSize: 14,
    color: '#1e3a8a',
    lineHeight: 20,
    fontWeight: '500',
  },
  exampleDivider: {
    height: 1,
    backgroundColor: '#dbeafe',
    marginVertical: 15,
  },
  exampleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  exampleLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: COLORS.textLight,
    letterSpacing: 1,
    marginBottom: 4,
  },
  exampleBody: {
    fontSize: 13,
    color: COLORS.textLight,
    fontStyle: 'italic',
    lineHeight: 18,
  },
  nextBtn: {
    backgroundColor: COLORS.secondary,
    width: '100%',
    height: 60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
  }
});
