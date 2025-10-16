import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import WidgetDataManager from '../utils/WidgetDataManager';

const WidgetTestCard: React.FC = () => {
  const testUpdateWidget = async () => {
    try {
      const widgetManager = WidgetDataManager.getInstance();
      
      // Test data to send to widget
      const testData = {
        bestCard: {
          name: 'Chase Sapphire Reserve',
          bank: 'Chase',
          rewardRate: 5.0,
          category: 'Travel',
          color: '#1e40af',
        },
        monthlyRewards: 250,
        totalRewards: 5680,
      };

      await widgetManager.syncWithAppData(testData);
      Alert.alert('Success', 'Widget data updated! Check your iOS widget.');
      console.log('Widget data synced successfully');
    } catch (error) {
      console.error('Failed to update widget:', error);
      Alert.alert('Error', 'Failed to update widget data');
    }
  };

  const testUpdateBestCard = async () => {
    try {
      const widgetManager = WidgetDataManager.getInstance();
      
      await widgetManager.updateBestCard({
        name: 'Amex Platinum Card',
        bank: 'American Express',
        rewardRate: 4.0,
        category: 'Airlines',
        color: '#059669',
      });
      
      Alert.alert('Success', 'Best card updated in widget!');
    } catch (error) {
      console.error('Failed to update best card:', error);
      Alert.alert('Error', 'Failed to update best card');
    }
  };

  const testUpdateRewards = async () => {
    try {
      const widgetManager = WidgetDataManager.getInstance();
      
      await widgetManager.updateRewards(320, 6850);
      
      Alert.alert('Success', 'Rewards data updated in widget!');
    } catch (error) {
      console.error('Failed to update rewards:', error);
      Alert.alert('Error', 'Failed to update rewards');
    }
  };

  return (
    <View className="bg-white rounded-2xl p-6 m-4 shadow-lg">
      <Text className="text-xl font-bold text-gray-900 mb-4">🔧 Widget Testing</Text>
      <Text className="text-gray-600 mb-6">Test your iOS widget with sample data</Text>
      
      <View className="space-y-3">
        <TouchableOpacity
          onPress={testUpdateWidget}
          className="bg-blue-600 py-3 px-4 rounded-lg"
        >
          <Text className="text-white font-semibold text-center">Update Widget Data</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={testUpdateBestCard}
          className="bg-green-600 py-3 px-4 rounded-lg"
        >
          <Text className="text-white font-semibold text-center">Update Best Card</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={testUpdateRewards}
          className="bg-purple-600 py-3 px-4 rounded-lg"
        >
          <Text className="text-white font-semibold text-center">Update Rewards</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-xs text-gray-500 mt-4 text-center">
        After updating, check your iOS widget on the home screen
      </Text>
    </View>
  );
};

export default WidgetTestCard;