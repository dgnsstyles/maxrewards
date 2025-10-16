import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { mockOffers } from '../data/mockData';

export default function OfferDetail({ route, navigation }: any) {
  const { offerId } = route.params;
  const offer = mockOffers.find(o => o.id === offerId);

  if (!offer) {
    return (
      <SafeAreaView style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Offer not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#64748b" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Offer Details</Text>
        <TouchableOpacity>
          <Ionicons 
            name={offer.isFavorite ? 'heart' : 'heart-outline'} 
            size={24} 
            color={offer.isFavorite ? '#ef4444' : '#64748b'} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Offer Hero */}
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <View style={styles.heroIcon}>
              <Ionicons name="pricetag" size={32} color="white" />
            </View>
            <Text style={styles.offerTitle}>
              {offer.title}
            </Text>
            <View style={styles.rewardBadge}>
              <Text style={styles.rewardText}>
                {offer.rewardRate}% Cashback
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.description}>
              {offer.description}
            </Text>
          </View>

          {/* Details */}
          <View style={styles.detailsCard}>
            <Text style={styles.sectionTitle}>Offer Details</Text>
            
            <View style={[styles.detailRow, styles.detailRowWithBorder]}>
              <Text style={styles.detailLabel}>Merchant</Text>
              <Text style={styles.detailValue}>{offer.merchant}</Text>
            </View>
            
            <View style={[styles.detailRow, styles.detailRowWithBorder]}>
              <Text style={styles.detailLabel}>Category</Text>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{offer.category}</Text>
              </View>
            </View>
            
            <View style={[styles.detailRow, styles.detailRowWithBorder]}>
              <Text style={styles.detailLabel}>Reward Rate</Text>
              <Text style={styles.rewardRateText}>{offer.rewardRate}%</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Valid Until</Text>
              <Text style={styles.detailValue}>{offer.expiryDate}</Text>
            </View>
          </View>

          {/* Terms */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Terms & Conditions</Text>
            <Text style={styles.termsText}>
              • Offer valid for new purchases only{'\n'}
              • Cashback will be credited within 2-3 billing cycles{'\n'}
              • Subject to credit approval{'\n'}
              • Cannot be combined with other offers{'\n'}
              • Terms and conditions may apply
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Action Button */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Activate Offer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  notFoundContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    color: '#64748b',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: '#f8fafc',
  },
  heroContent: {
    alignItems: 'center',
    marginBottom: 24,
  },
  heroIcon: {
    backgroundColor: '#7c3aed',
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  offerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: 8,
  },
  rewardBadge: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  rewardText: {
    color: 'white',
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 24,
  },
  section: {
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  detailsCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  detailRowWithBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  detailLabel: {
    color: '#64748b',
  },
  detailValue: {
    fontWeight: '500',
    color: '#0f172a',
  },
  categoryBadge: {
    backgroundColor: '#cffafe',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#22d3ee',
  },
  rewardRateText: {
    fontWeight: '600',
    color: '#7c3aed',
  },
  termsText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  actionContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  actionButton: {
    backgroundColor: '#7c3aed',
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
});
