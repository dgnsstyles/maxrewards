import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { mockCards } from '../data/mockData';

export default function CardDetail({ route, navigation }: any) {
  const { cardId } = route.params;
  const card = mockCards.find(c => c.id === cardId);

  if (!card) {
    return (
      <SafeAreaView style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Card not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#64748b" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Card Details</Text>
        <TouchableOpacity>
          <Ionicons name="more-horizontal" size={24} color="#64748b" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Card Visual */}
        <View style={styles.cardVisualContainer}>
          <View 
            style={[styles.cardVisual, { backgroundColor: card.color }]}
          >
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.cardName}>{card.name}</Text>
                <Text style={styles.cardBank}>{card.bank}</Text>
              </View>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>
                  {card.category || 'Base Rate'}
                </Text>
              </View>
            </View>
            
            <View style={styles.cardFooter}>
              <View>
                <Text style={styles.rateLabel}>Current Rate</Text>
                <Text style={styles.rateValue}>{card.rewardRate}%</Text>
              </View>
              <View style={styles.feeContainer}>
                <Text style={styles.feeLabel}>Annual Fee</Text>
                <Text style={styles.feeValue}>
                  {card.annualFee === 0 ? 'No Fee' : `$${card.annualFee}`}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          {/* Card Stats */}
          <View style={styles.statsCard}>
            <Text style={styles.sectionTitle}>This Month's Activity</Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statAmountPrimary}>$127</Text>
                <Text style={styles.statLabel}>Rewards Earned</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.statItem}>
                <Text style={styles.statAmountSecondary}>$423</Text>
                <Text style={styles.statLabel}>Total Spent</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.statItem}>
                <Text style={styles.statAmountAccent}>12</Text>
                <Text style={styles.statLabel}>Transactions</Text>
              </View>
            </View>
          </View>

          {/* Benefits */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Card Benefits</Text>
            <View style={styles.benefitsCard}>
              {card.benefits.map((benefit, index) => (
                <View key={index} style={[styles.benefitRow, index === card.benefits.length - 1 && { marginBottom: 0 }]}>
                  <View style={styles.checkIcon}>
                    <Ionicons name="checkmark" size={14} color="#059669" />
                  </View>
                  <Text style={styles.benefitText}>{benefit}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Best Categories */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Best Categories for This Card</Text>
            <View style={styles.categoriesContainer}>
              {['Dining', 'Travel', 'Gas Stations'].map((category) => (
                <View key={category} style={styles.categoryPill}>
                  <Text style={styles.categoryText}>{category}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Recent Transactions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <View style={styles.transactionsCard}>
              {[
                { merchant: 'Starbucks', amount: 5.75, date: 'Oct 15', rewards: 11.5 },
                { merchant: 'Uber Eats', amount: 23.45, date: 'Oct 14', rewards: 46.9 },
                { merchant: 'Shell', amount: 45.20, date: 'Oct 13', rewards: 90.4 }
              ].map((transaction, index) => (
                <View key={index} style={[styles.transactionRow, index === 2 && { borderBottomWidth: 0 }]}>
                  <View style={styles.transactionLeft}>
                    <View style={styles.merchantAvatar}>
                      <Text style={styles.merchantInitial}>
                        {transaction.merchant.charAt(0)}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.merchantName}>{transaction.merchant}</Text>
                      <Text style={styles.transactionDate}>{transaction.date}</Text>
                    </View>
                  </View>
                  <View style={styles.transactionRight}>
                    <Text style={styles.transactionAmount}>${transaction.amount}</Text>
                    <Text style={styles.transactionRewards}>+{transaction.rewards} pts</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
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
    backgroundColor: 'white',
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
  cardVisualContainer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  cardVisual: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  cardName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardBank: {
    color: 'white',
    fontSize: 14,
  },
  categoryBadge: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  categoryText: {
    color: '#374151',
    fontSize: 12,
    fontWeight: '600',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  rateLabel: {
    color: 'white',
    fontSize: 12,
    marginBottom: 4,
  },
  rateValue: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  feeContainer: {
    alignItems: 'flex-end',
  },
  feeLabel: {
    color: 'white',
    fontSize: 12,
    marginBottom: 4,
  },
  feeValue: {
    color: 'white',
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 24,
  },
  statsCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statAmountPrimary: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7c3aed',
  },
  statAmountSecondary: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  statAmountAccent: {
    fontSize: 20,
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
  section: {
    marginBottom: 24,
  },
  benefitsCard: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    borderRadius: 20,
    padding: 16,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  checkIcon: {
    backgroundColor: '#dcfce7',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  benefitText: {
    flex: 1,
    color: '#374151',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryPill: {
    backgroundColor: '#f3e8ff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  transactionsCard: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    borderRadius: 20,
    padding: 16,
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  merchantAvatar: {
    backgroundColor: '#f1f5f9',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  merchantInitial: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: 'bold',
  },
  merchantName: {
    fontWeight: '500',
    color: '#0f172a',
  },
  transactionDate: {
    fontSize: 12,
    color: '#64748b',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontWeight: '500',
    color: '#0f172a',
  },
  transactionRewards: {
    fontSize: 12,
    color: '#059669',
  },
});
