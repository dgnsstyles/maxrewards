import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Card {
  id: string;
  name: string;
  bank: string;
  rewardRate: number;
  category?: string;
  color: string;
}

interface CardTileProps {
  card: Card;
  onPress?: () => void;
  showBestChoice?: boolean;
}

export default function CardTile({ card, onPress, showBestChoice }: CardTileProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
    >
      <View style={styles.header}>
        <View 
          style={[styles.cardColor, { backgroundColor: card.color }]}
        />
        <View style={styles.cardInfo}>
          <Text style={styles.cardName}>{card.name}</Text>
          <Text style={styles.bankName}>{card.bank}</Text>
        </View>
        {showBestChoice && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Best Choice</Text>
          </View>
        )}
      </View>
      
      <View style={styles.footer}>
        <View>
          <Text style={styles.rewardRate}>{card.rewardRate}%</Text>
          <Text style={styles.category}>
            {card.category || 'Base Rate'}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardColor: {
    width: 48,
    height: 32,
    borderRadius: 8,
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  bankName: {
    fontSize: 14,
    color: '#64748b',
  },
  badge: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rewardRate: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7c3aed',
  },
  category: {
    fontSize: 12,
    color: '#64748b',
  },
});
