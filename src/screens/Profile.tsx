import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function Profile({ navigation }: any) {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  const menuItems = [
    {
      icon: 'person-outline',
      title: 'Personal Information',
      subtitle: 'Update your profile details',
      onPress: () => {}
    },
    {
      icon: 'card-outline',
      title: 'Payment Methods',
      subtitle: 'Manage your cards and accounts',
      onPress: () => {}
    },
    {
      icon: 'shield-checkmark-outline',
      title: 'Security & Privacy',
      subtitle: 'Password, biometrics, and data settings',
      onPress: () => {}
    },
    {
      icon: 'help-circle-outline',
      title: 'Help & Support',
      subtitle: 'FAQs, contact us, and tutorials',
      onPress: () => {}
    },
    {
      icon: 'document-text-outline',
      title: 'Terms & Conditions',
      subtitle: 'Legal information and policies',
      onPress: () => {}
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={24} color="#64748b" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* User Info Card */}
          <View style={styles.userCard}>
            <View style={styles.userInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>JD</Text>
              </View>
              <View style={styles.userDetails}>
                <Text style={styles.userName}>John Doe</Text>
                <Text style={styles.userEmail}>john.doe@example.com</Text>
                <View style={styles.userBadgeRow}>
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>Premium</Text>
                  </View>
                  <Text style={styles.memberSince}>Member since Jan 2024</Text>
                </View>
              </View>
            </View>
            
            {/* Stats Row */}
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValuePrimary}>$2,847</Text>
                <Text style={styles.statLabel}>Total Rewards</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>3</Text>
                <Text style={styles.statLabel}>Active Cards</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValueAccent}>23</Text>
                <Text style={styles.statLabel}>This Month</Text>
              </View>
            </View>
          </View>

          {/* Quick Settings */}
          <View style={styles.settingsCard}>
            <Text style={styles.sectionTitle}>Quick Settings</Text>
            
            <View style={[styles.settingRow, styles.settingRowWithBorder]}>
              <View style={styles.settingLeft}>
                <View style={styles.settingIcon}>
                  <Ionicons name="notifications-outline" size={20} color="#64748b" />
                </View>
                <View>
                  <Text style={styles.settingTitle}>Push Notifications</Text>
                  <Text style={styles.settingSubtitle}>Offers, rewards, and updates</Text>
                </View>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#e5e5e5', true: '#7c3aed' }}
                thumbColor={notificationsEnabled ? '#ffffff' : '#f4f3f4'}
              />
            </View>
            
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <View style={styles.settingIcon}>
                  <Ionicons name="moon-outline" size={20} color="#64748b" />
                </View>
                <View>
                  <Text style={styles.settingTitle}>Dark Mode</Text>
                  <Text style={styles.settingSubtitle}>Switch to dark theme</Text>
                </View>
              </View>
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
                trackColor={{ false: '#e5e5e5', true: '#7c3aed' }}
                thumbColor={darkModeEnabled ? '#ffffff' : '#f4f3f4'}
              />
            </View>
          </View>

          {/* Subscription Status */}
          <TouchableOpacity 
            style={styles.subscriptionCard}
            onPress={() => navigation.navigate('Subscription')}
          >
            <View style={styles.subscriptionRow}>
              <View style={styles.subscriptionContent}>
                <View style={styles.subscriptionHeader}>
                  <View style={styles.subscriptionIconContainer}>
                    <Ionicons name="sparkles" size={20} color="white" />
                  </View>
                  <Text style={styles.subscriptionTitle}>Premium Member</Text>
                </View>
                <Text style={styles.subscriptionSubtitle}>
                  Enjoying unlimited insights and exclusive offers
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="white" />
            </View>
          </TouchableOpacity>

          {/* Menu Items */}
          <View style={styles.menuCard}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={item.onPress}
                style={[styles.menuItem, index === menuItems.length - 1 && { borderBottomWidth: 0 }]}
              >
                <View style={styles.menuIconContainer}>
                  <Ionicons name={item.icon as any} size={22} color="#64748b" />
                </View>
                <View style={styles.menuContent}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Sign Out */}
          <TouchableOpacity style={styles.signOutCard}>
            <View style={styles.signOutRow}>
              <View style={styles.signOutIcon}>
                <Ionicons name="log-out-outline" size={20} color="#ef4444" />
              </View>
              <Text style={styles.signOutText}>Sign Out</Text>
            </View>
          </TouchableOpacity>

          {/* App Version */}
          <Text style={styles.versionText}>
            MaxRewards v1.0.0
          </Text>
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
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
  },
  userCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    backgroundColor: '#7c3aed',
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  userEmail: {
    color: '#64748b',
  },
  userBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  premiumBadge: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 8,
  },
  premiumBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  memberSince: {
    fontSize: 12,
    color: '#64748b',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  statItem: {
    alignItems: 'center',
  },
  statValuePrimary: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7c3aed',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  statValueAccent: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f59e0b',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  settingsCard: {
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
  sectionTitle: {
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingRowWithBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: 12,
  },
  settingTitle: {
    fontWeight: '500',
    color: '#0f172a',
  },
  settingSubtitle: {
    fontSize: 12,
    color: '#64748b',
  },
  subscriptionCard: {
    backgroundColor: '#f59e0b',
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
  },
  subscriptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subscriptionContent: {
    flex: 1,
  },
  subscriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  subscriptionIconContainer: {
    marginRight: 8,
  },
  subscriptionTitle: {
    color: 'white',
    fontWeight: 'bold',
  },
  subscriptionSubtitle: {
    color: 'white',
    fontSize: 14,
  },
  menuCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  menuIconContainer: {
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontWeight: '500',
    color: '#0f172a',
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  signOutCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  signOutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutIcon: {
    marginRight: 8,
  },
  signOutText: {
    fontWeight: '500',
    color: '#ef4444',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 16,
  },
});
