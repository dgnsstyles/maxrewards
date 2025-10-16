import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import SectionHeader from '../components/SectionHeader';
import CardTile from '../components/CardTile';
import RewardBadge from '../components/RewardBadge';
import { mockCards, mockUserStats } from '../data/mockData';
import WidgetDataManager from '../utils/WidgetDataManager';

export default function HomeDashboard({ navigation }: any) {
  const bestCard = mockCards[0]; // Chase Sapphire Preferred

  // Sync data with iOS widget when component mounts
  useEffect(() => {
    const syncWidgetData = async () => {
      try {
        const widgetManager = WidgetDataManager.getInstance();
        
        await widgetManager.syncWithAppData({
          bestCard: {
            name: bestCard.name,
            bank: bestCard.bank,
            rewardRate: bestCard.rewardRate,
            category: bestCard.category || 'General',
            color: bestCard.color,
          },
          monthlyRewards: mockUserStats.rewardsThisMonth,
          totalRewards: mockUserStats.totalRewards,
        });
        
        console.log('Widget data synced successfully');
      } catch (error) {
        console.log('Widget sync failed:', error);
      }
    };

    syncWidgetData();
  }, [bestCard]);
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>Good morning! ☀️</Text>
            <Text style={styles.subtitle}>Let's maximize your rewards today</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="#64748b" />
          </TouchableOpacity>
        </View>

        {/* Rewards Balance */}
        <View style={styles.rewardsCard}>
          <Text style={styles.rewardsLabel}>Total Rewards Balance</Text>
          <Text style={styles.rewardsAmount}>
            ${mockUserStats.totalRewards.toLocaleString()}
          </Text>
          <View style={styles.rewardsRow}>
            <View>
              <Text style={styles.monthLabel}>This Month</Text>
              <Text style={styles.monthAmount}>
                +${mockUserStats.rewardsThisMonth}
              </Text>
            </View>
            <TouchableOpacity style={styles.redeemButton}>
              <Text style={styles.redeemText}>Redeem</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Best Card Recommendation */}
          <SectionHeader 
            title="Best Card to Use Right Now"
            subtitle="For dining purchases"
            actionText="See All"
            onActionPress={() => navigation.navigate('Cards', { screen: 'CardsList' })}
          />
          <CardTile 
            card={bestCard} 
            showBestChoice 
            onPress={() => navigation.navigate('Cards', { screen: 'CardDetail', params: { cardId: bestCard.id } })}
          />

          {/* Quick Stats Grid */}
          <SectionHeader title="Quick Stats" />
          <View style={styles.statsRow}>
            <View style={[styles.statCard, styles.statCardLeft]}>
              <View style={styles.statIcon}>
                <Ionicons name="trending-up" size={20} color="#7c3aed" />
              </View>
              <Text style={styles.statAmount}>
                ${mockUserStats.monthlySpending.toLocaleString()}
              </Text>
              <Text style={styles.statLabel}>Monthly Spending</Text>
            </View>
            <View style={[styles.statCard, styles.statCardRight]}>
              <View style={styles.statIcon}>
                <Ionicons name="star" size={20} color="#f59e0b" />
              </View>
              <Text style={styles.statAmount}>
                {mockUserStats.favoriteCategory}
              </Text>
              <Text style={styles.statLabel}>Top Category</Text>
            </View>
          </View>

          {/* Quick Actions */}
          <SectionHeader title="Quick Actions" />
          <View style={styles.actionsRow}>
            <TouchableOpacity 
              style={[styles.actionCard, styles.actionCardLeft]}
              onPress={() => navigation.navigate('Offers')}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#e0f2fe' }]}>
                <Ionicons name="pricetag" size={24} color="#22d3ee" />
              </View>
              <Text style={styles.actionText}>View Offers</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionCard, styles.actionCardCenter]}
              onPress={() => navigation.navigate('Cards')}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#f3e8ff' }]}>
                <Ionicons name="card" size={24} color="#7c3aed" />
              </View>
              <Text style={styles.actionText}>My Cards</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionCard, styles.actionCardRight]}
              onPress={() => navigation.navigate('Insights')}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#fef3c7' }]}>
                <Ionicons name="analytics" size={24} color="#f59e0b" />
              </View>
              <Text style={styles.actionText}>Insights</Text>
            </TouchableOpacity>
          </View>

          {/* Recent Activity Preview */}
          <SectionHeader 
            title="Recent Activity" 
            actionText="View All"
            onActionPress={() => navigation.navigate('Insights')}
          />
          <View style={styles.activityCard}>
            <View style={styles.activityRow}>
              <View style={styles.activityLeft}>
                <View style={styles.activityAvatar}>
                  <Text style={styles.activityAvatarText}>S</Text>
                </View>
                <View>
                  <Text style={styles.activityMerchant}>Starbucks</Text>
                  <Text style={styles.activityDate}>Oct 15, 2024</Text>
                </View>
              </View>
              <View style={styles.activityRight}>
                <Text style={styles.activityAmount}>$5.75</Text>
                <Text style={styles.activityPoints}>+11.5 points</Text>
              </View>
            </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
  },
  notificationButton: {
    padding: 8,
  },
  rewardsCard: {
    backgroundColor: '#7c3aed',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
  },
  rewardsLabel: {
    color: 'white',
    fontSize: 14,
    marginBottom: 8,
  },
  rewardsAmount: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  rewardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  monthLabel: {
    color: 'white',
    fontSize: 12,
  },
  monthAmount: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  redeemButton: {
    backgroundColor: '#e2e8f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  redeemText: {
    color: '#475569',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
  },
  statsRow: {
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
  statIcon: {
    marginBottom: 8,
  },
  statAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  actionCardLeft: {
    marginRight: 8,
  },
  actionCardCenter: {
    marginHorizontal: 4,
  },
  actionCardRight: {
    marginLeft: 8,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  activityCard: {
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
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  activityAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#dcfce7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityAvatarText: {
    color: '#16a34a',
    fontWeight: 'bold',
  },
  activityMerchant: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  activityDate: {
    fontSize: 12,
    color: '#64748b',
  },
  activityRight: {
    alignItems: 'flex-end',
  },
  activityAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  activityPoints: {
    fontSize: 12,
    color: '#16a34a',
  },
});
