import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function Subscription({ navigation }: any) {
  const [selectedPlan, setSelectedPlan] = useState('premium');

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: '/month',
      features: [
        'Basic card recommendations',
        'View up to 3 offers',
        'Monthly spending overview',
        'Email support'
      ],
      limitations: [
        'Limited to 3 cards',
        'Basic insights only',
        'Ads supported'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$9.99',
      period: '/month',
      popular: true,
      features: [
        'Unlimited cards & offers',
        'AI-powered recommendations',
        'Advanced spending analytics',
        'Real-time offer notifications',
        'Priority customer support',
        'Export data & reports',
        'Dark mode & themes'
      ],
      benefits: [
        'Save up to $500/year in rewards',
        'Get exclusive offers first',
        '24/7 premium support'
      ]
    }
  ];

  const currentPlan = 'premium'; // This would come from user state

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#64748b" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Subscription</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <View style={styles.heroIcon}>
              <Ionicons name="sparkles" size={32} color="white" />
            </View>
            <Text style={styles.heroTitle}>
              Maximize Your Rewards
            </Text>
            <Text style={styles.heroSubtitle}>
              Choose the plan that's right for you and start earning more rewards today
            </Text>
          </View>

          {/* Current Plan Status */}
          {currentPlan === 'premium' && (
            <View style={styles.currentPlanCard}>
              <View style={styles.currentPlanRow}>
                <View>
                  <Text style={styles.currentPlanTitle}>Current Plan: Premium</Text>
                  <Text style={styles.currentPlanSubtitle}>Renews on Dec 15, 2024</Text>
                </View>
                <View style={styles.activeBadge}>
                  <Text style={styles.activeBadgeText}>Active</Text>
                </View>
              </View>
            </View>
          )}

          {/* Plans */}
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id || currentPlan === plan.id;
            return (
              <TouchableOpacity
                key={plan.id}
                onPress={() => setSelectedPlan(plan.id)}
                style={[styles.planCard, isSelected ? styles.planCardSelected : styles.planCardDefault]}
              >
                {plan.popular && (
                  <View style={[styles.badge, styles.popularBadge]}>
                    <Text style={styles.badgeText}>Most Popular</Text>
                  </View>
                )}

                {currentPlan === plan.id && (
                  <View style={[styles.badge, styles.currentBadge]}>
                    <Text style={styles.badgeText}>Current Plan</Text>
                  </View>
                )}

                {/* Plan Header */}
                <View style={styles.planHeader}>
                  <View>
                    <Text style={styles.planName}>{plan.name}</Text>
                    <View style={styles.priceRow}>
                      <Text style={styles.planPrice}>{plan.price}</Text>
                      <Text style={styles.planPeriod}>{plan.period}</Text>
                    </View>
                  </View>
                  
                  <View style={[styles.checkbox, isSelected ? styles.checkboxSelected : styles.checkboxDefault]}>
                    {isSelected && (
                      <Ionicons name="checkmark" size={14} color="white" />
                    )}
                  </View>
                </View>

                {/* Features */}
                <View style={styles.featuresSection}>
                  <Text style={styles.sectionTitle}>Features included:</Text>
                  {plan.features.map((feature, index) => (
                    <View key={index} style={styles.featureRow}>
                      <View style={styles.checkIcon}>
                        <Ionicons name="checkmark" size={12} color="#059669" />
                      </View>
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>

                {/* Limitations (for free plan) */}
                {plan.limitations && (
                  <View style={styles.featuresSection}>
                    <Text style={styles.sectionTitle}>Limitations:</Text>
                    {plan.limitations.map((limitation, index) => (
                      <View key={index} style={styles.featureRow}>
                        <View style={styles.closeIcon}>
                          <Ionicons name="close" size={12} color="#dc2626" />
                        </View>
                        <Text style={styles.featureText}>{limitation}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {/* Benefits (for premium plan) */}
                {plan.benefits && (
                  <View style={styles.benefitsSection}>
                    <Text style={styles.sectionTitle}>Premium Benefits:</Text>
                    {plan.benefits.map((benefit, index) => (
                      <Text key={index} style={styles.benefitText}>
                        • {benefit}
                      </Text>
                    ))}
                  </View>
                )}
              </TouchableOpacity>
            );
          })}

          {/* Action Buttons */}
          <View style={styles.actionSection}>
            {currentPlan === 'free' && selectedPlan === 'premium' && (
              <TouchableOpacity style={styles.upgradeButton}>
                <Text style={styles.upgradeButtonText}>Upgrade to Premium</Text>
                <Text style={styles.upgradeButtonSubtext}>Start 7-day free trial</Text>
              </TouchableOpacity>
            )}

            {currentPlan === 'premium' && (
              <TouchableOpacity style={styles.manageButton}>
                <Text style={styles.manageButtonText}>Manage Subscription</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.disclaimerButton}>
              <Text style={styles.disclaimerText}>
                Cancel anytime • No hidden fees • Secure billing
              </Text>
            </TouchableOpacity>
          </View>

          {/* FAQ Section */}
          <View style={styles.faqSection}>
            <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
            
            <View style={styles.faqCard}>
              <Text style={styles.faqQuestion}>
                Can I cancel anytime?
              </Text>
              <Text style={styles.faqAnswer}>
                Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your current billing period.
              </Text>
            </View>

            <View style={styles.faqCard}>
              <Text style={styles.faqQuestion}>
                Is there a free trial?
              </Text>
              <Text style={styles.faqAnswer}>
                New users get a 7-day free trial of Premium features. Cancel before the trial ends to avoid being charged.
              </Text>
            </View>

            <View style={styles.faqCard}>
              <Text style={styles.faqQuestion}>
                How much can I really save?
              </Text>
              <Text style={styles.faqAnswer}>
                Our Premium users save an average of $400+ per year in additional rewards by using our AI recommendations and exclusive offers.
              </Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    backgroundColor: 'white',
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
  content: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  heroIcon: {
    backgroundColor: '#f59e0b',
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    color: '#64748b',
    textAlign: 'center',
  },
  currentPlanCard: {
    backgroundColor: '#7c3aed',
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
  },
  currentPlanRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  currentPlanTitle: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  currentPlanSubtitle: {
    color: 'white',
    fontSize: 14,
  },
  activeBadge: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  activeBadgeText: {
    color: '#374151',
    fontSize: 12,
    fontWeight: '600',
  },
  planCard: {
    marginBottom: 16,
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
    position: 'relative',
  },
  planCardDefault: {
    borderColor: '#e2e8f0',
    backgroundColor: 'white',
  },
  planCardSelected: {
    borderColor: '#7c3aed',
    backgroundColor: '#faf5ff',
  },
  badge: {
    position: 'absolute',
    top: -8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  popularBadge: {
    left: 16,
    backgroundColor: '#f59e0b',
  },
  currentBadge: {
    right: 16,
    backgroundColor: '#22c55e',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  planPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#7c3aed',
  },
  planPeriod: {
    color: '#64748b',
    marginLeft: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDefault: {
    borderColor: '#d1d5db',
  },
  checkboxSelected: {
    borderColor: '#7c3aed',
    backgroundColor: '#7c3aed',
  },
  featuresSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 12,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkIcon: {
    backgroundColor: '#dcfce7',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  closeIcon: {
    backgroundColor: '#fee2e2',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  featureText: {
    color: '#374151',
    flex: 1,
  },
  benefitsSection: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
  },
  benefitText: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  actionSection: {
    marginTop: 24,
  },
  upgradeButton: {
    backgroundColor: '#7c3aed',
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  upgradeButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
  upgradeButtonSubtext: {
    color: 'white',
    fontSize: 14,
  },
  manageButton: {
    backgroundColor: '#e2e8f0',
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  manageButtonText: {
    color: '#64748b',
    fontWeight: '600',
  },
  disclaimerButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  disclaimerText: {
    color: '#64748b',
    fontSize: 14,
  },
  faqSection: {
    marginTop: 32,
  },
  faqTitle: {
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 16,
  },
  faqCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
  },
  faqQuestion: {
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 8,
  },
  faqAnswer: {
    color: '#64748b',
    fontSize: 14,
  },
});
