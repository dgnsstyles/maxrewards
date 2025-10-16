import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Offer {
  id: string;
  title: string;
  description: string;
  rewardRate: number;
  merchant: string;
  expiryDate: string;
  category: string;
  isFavorite?: boolean;
}

interface OfferTileProps {
  offer: Offer;
  onPress?: () => void;
  onFavoriteToggle?: () => void;
}

export default function OfferTile({ offer, onPress, onFavoriteToggle }: OfferTileProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {/* Header with merchant and favorite */}
      <View style={styles.header}>
        <View style={styles.merchantContainer}>
          <Text style={styles.merchantName}>{offer.merchant}</Text>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{offer.category}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={onFavoriteToggle} style={styles.favoriteButton}>
          <Ionicons 
            name={offer.isFavorite ? 'heart' : 'heart-outline'} 
            size={20} 
            color={offer.isFavorite ? '#ef4444' : '#9ca3af'} 
          />
        </TouchableOpacity>
      </View>

      {/* Main content */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {offer.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {offer.description}
        </Text>
      </View>

      {/* Footer with reward and expiry */}
      <View style={styles.footer}>
        <View style={styles.rewardContainer}>
          <Text style={styles.rewardRate}>{offer.rewardRate}%</Text>
          <Text style={styles.rewardLabel}>cash back</Text>
        </View>
        <Text style={styles.expiryDate}>Expires {offer.expiryDate}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  merchantContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  merchantName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    marginRight: 8,
  },
  categoryBadge: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#1d4ed8',
  },
  favoriteButton: {
    padding: 4,
  },
  content: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 6,
    lineHeight: 20,
  },
  description: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  rewardContainer: {
    alignItems: 'flex-start',
  },
  rewardRate: {
    fontSize: 20,
    fontWeight: '800',
    color: '#7c3aed',
  },
  rewardLabel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: -2,
  },
  expiryDate: {
    fontSize: 12,
    color: '#9ca3af',
    fontStyle: 'italic',
  },
});
