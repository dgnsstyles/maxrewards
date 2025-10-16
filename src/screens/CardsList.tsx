import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import CardTile from '../components/CardTile';
import SectionHeader from '../components/SectionHeader';
import { mockCards, Card } from '../data/mockData';

export default function CardsList({ navigation }: any) {
  const renderCard = ({ item }: { item: Card }) => (
    <CardTile
      card={item}
      onPress={() => navigation.navigate('CardDetail', { cardId: item.id })}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>My Cards</Text>
            <Text style={styles.subtitle}>{mockCards.length} cards in wallet</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="add-circle-outline" size={28} color="#7c3aed" />
          </TouchableOpacity>
        </View>

        {/* Stats Summary */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>This Month's Performance</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statAmount}>$385</Text>
              <Text style={styles.statLabel}>Rewards Earned</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statAmountSecondary}>$1,251</Text>
              <Text style={styles.statLabel}>Total Spent</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statAmountAccent}>2.8%</Text>
              <Text style={styles.statLabel}>Avg Rate</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Cards List */}
      <View style={styles.listContainer}>
        <View style={styles.listHeader}>
          <SectionHeader title="Your Cards" />
        </View>
        
        <FlatList
          data={mockCards}
          renderItem={renderCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.floatingButton}>
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  subtitle: {
    color: '#64748b',
    marginTop: 4,
  },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  statsTitle: {
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7c3aed',
  },
  statAmountSecondary: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  statAmountAccent: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f59e0b',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: '#e2e8f0',
    marginHorizontal: 16,
  },
  listContainer: {
    flex: 1,
  },
  listHeader: {
    paddingHorizontal: 24,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    backgroundColor: '#7c3aed',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
