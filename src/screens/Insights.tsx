import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import SectionHeader from '../components/SectionHeader';
import { mockUserStats, mockTransactions } from '../data/mockData';

const screenWidth = Dimensions.get('window').width;

export default function Insights({ navigation }: any) {
  const categories = [
    { name: 'Dining', amount: 425.50, color: '#7c3aed', percentage: 34 },
    { name: 'Groceries', amount: 312.75, color: '#22d3ee', percentage: 25 },
    { name: 'Gas', amount: 187.20, color: '#f59e0b', percentage: 15 },
    { name: 'Shopping', amount: 325.30, color: '#ef4444', percentage: 26 }
  ];

  const insights = [
    {
      icon: 'trending-up',
      title: 'You\'re earning 15% more rewards this month',
      subtitle: 'Keep using your Chase Sapphire for dining!',
      color: '#22c55e'
    },
    {
      icon: 'warning',
      title: 'Missing out on 3x points at gas stations',
      subtitle: 'Consider using your Chase Freedom for gas purchases',
      color: '#f59e0b'
    },
    {
      icon: 'star',
      title: 'Dining is your top category',
      subtitle: 'You\'ve earned $127 in rewards from restaurants',
      color: '#7c3aed'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Insights</Text>
            <Text style={styles.subtitle}>Your spending & rewards analysis</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="calendar-outline" size={24} color="#64748b" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Rewards Summary */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>This Month's Summary</Text>
            <View style={styles.summaryRow}>
              <View>
                <Text style={styles.summaryLabel}>Rewards Earned</Text>
                <Text style={styles.summaryAmount}>${mockUserStats.rewardsThisMonth}</Text>
              </View>
              <View>
                <Text style={styles.summaryLabel}>Total Spent</Text>
                <Text style={styles.summaryAmount}>${mockUserStats.monthlySpending.toLocaleString()}</Text>
              </View>
            </View>
          </View>

          {/* Spending Breakdown */}
          <SectionHeader title="Spending by Category" />
          <View style={styles.spendingCard}>
            {/* Simple Bar Chart */}
            <View style={styles.chartContainer}>
              {categories.map((category, index) => (
                <View key={category.name} style={[styles.categoryRow, index === categories.length - 1 && { marginBottom: 0 }]}>
                  <View style={styles.categoryHeader}>
                    <Text style={styles.categoryName}>{category.name}</Text>
                    <Text style={styles.categoryAmount}>${category.amount.toLocaleString()}</Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View 
                      style={[styles.progressFill, { 
                        width: `${category.percentage}%`, 
                        backgroundColor: category.color 
                      }]}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* AI Insights */}
          <SectionHeader title="Smart Insights" subtitle="AI-powered recommendations" />
          {insights.map((insight, index) => (
            <View key={index} style={styles.insightCard}>
              <View style={styles.insightRow}>
                <View 
                  style={[styles.insightIcon, { backgroundColor: `${insight.color}20` }]}
                >
                  <Ionicons name={insight.icon as any} size={20} color={insight.color} />
                </View>
                <View style={styles.insightContent}>
                  <Text style={styles.insightTitle}>{insight.title}</Text>
                  <Text style={styles.insightSubtitle}>{insight.subtitle}</Text>
                </View>
              </View>
            </View>
          ))}

          {/* Premium Upgrade CTA */}
          <View style={styles.premiumCard}>
            <View style={styles.premiumRow}>
              <View style={styles.premiumContent}>
                <Text style={styles.premiumTitle}>Upgrade to Premium</Text>
                <Text style={styles.premiumSubtitle}>
                  Get personalized recommendations, spending forecasts, and exclusive offers
                </Text>
                <TouchableOpacity 
                  style={styles.premiumButton}
                  onPress={() => navigation.navigate('Subscription')}
                >
                  <Text style={styles.premiumButtonText}>Learn More</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.premiumIcon}>
                <Ionicons name="sparkles" size={32} color="white" />
              </View>
            </View>
          </View>

          {/* Quick Stats Grid */}
          <SectionHeader title="Quick Stats" />
          <View style={styles.statsGrid}>
            <View style={[styles.statCard, styles.statCardLeft]}>
              <View style={styles.statIconContainer}>
                <Ionicons name="card" size={20} color="#7c3aed" />
              </View>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Active Cards</Text>
            </View>
            <View style={[styles.statCard, styles.statCardRight]}>
              <View style={styles.statIconContainer}>
                <Ionicons name="calendar" size={20} color="#22d3ee" />
              </View>
              <Text style={styles.statValue}>23</Text>
              <Text style={styles.statLabel}>Transactions</Text>
            </View>
          </View>

          {/* Recent Activity */}
          <SectionHeader title="Recent Activity" />
          <View style={styles.activityCard}>
            {mockTransactions.slice(0, 3).map((transaction, index) => (
              <View key={transaction.id} style={[styles.transactionRow, index === 2 && { borderBottomWidth: 0 }]}>
                <View style={styles.transactionLeft}>
                  <View style={styles.transactionAvatar}>
                    <Text style={styles.transactionInitial}>
                      {transaction.merchant.charAt(0)}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.transactionMerchant}>{transaction.merchant}</Text>
                    <Text style={styles.transactionCategory}>{transaction.category}</Text>
                  </View>
                </View>
                <View style={styles.transactionRight}>
                  <Text style={styles.transactionAmount}>${transaction.amount}</Text>
                  <Text style={styles.transactionRewards}>+{transaction.rewardsEarned} pts</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
  },
  summaryCard: {
    backgroundColor: '#7c3aed',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
  },
  summaryTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    color: 'white',
    fontSize: 14,
  },
  summaryAmount: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  spendingCard: {
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
  chartContainer: {
    marginBottom: 16,
  },
  categoryRow: {
    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontWeight: '500',
    color: '#0f172a',
  },
  categoryAmount: {
    color: '#64748b',
  },
  progressBar: {
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
    height: 8,
  },
  progressFill: {
    height: 8,
    borderRadius: 4,
  },
  insightCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  insightRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  insightIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  insightSubtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  premiumCard: {
    backgroundColor: '#f59e0b',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    marginTop: 16,
  },
  premiumRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  premiumContent: {
    flex: 1,
  },
  premiumTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  premiumSubtitle: {
    color: 'white',
    fontSize: 14,
    marginBottom: 16,
  },
  premiumButton: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  premiumButtonText: {
    color: '#f59e0b',
    fontWeight: '600',
  },
  premiumIcon: {
    marginLeft: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  statCardLeft: {
    marginRight: 8,
  },
  statCardRight: {
    marginLeft: 8,
  },
  statIconContainer: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  activityCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 24,
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
  transactionAvatar: {
    backgroundColor: '#f1f5f9',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionInitial: {
    color: '#64748b',
    fontWeight: 'bold',
  },
  transactionMerchant: {
    fontWeight: '500',
    color: '#0f172a',
  },
  transactionCategory: {
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
