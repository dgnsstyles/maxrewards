import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface NotificationBannerProps {
  title: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  onClose?: () => void;
  onPress?: () => void;
}

export default function NotificationBanner({
  title,
  message,
  type = 'info',
  onClose,
  onPress
}: NotificationBannerProps) {
  const getStyles = () => {
    switch (type) {
      case 'success':
        return {
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          iconColor: '#10b981',
          iconName: 'checkmark-circle' as keyof typeof Ionicons.glyphMap
        };
      case 'warning':
        return {
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-200',
          iconColor: '#f59e0b',
          iconName: 'warning' as keyof typeof Ionicons.glyphMap
        };
      case 'error':
        return {
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          iconColor: '#ef4444',
          iconName: 'close-circle' as keyof typeof Ionicons.glyphMap
        };
      default:
        return {
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          iconColor: '#3b82f6',
          iconName: 'information-circle' as keyof typeof Ionicons.glyphMap
        };
    }
  };

  const styles = getStyles();

  const BannerContent = (
    <View className={`${styles.bgColor} border ${styles.borderColor} rounded-2xl p-4 mb-4`}>
      <View className="flex-row items-start">
        <Ionicons 
          name={styles.iconName} 
          size={20} 
          color={styles.iconColor} 
          style={{ marginRight: 12, marginTop: 2 }}
        />
        <View className="flex-1">
          <Text className="font-semibold text-slate-900 mb-1">{title}</Text>
          <Text className="text-sm text-slate-700">{message}</Text>
        </View>
        {onClose && (
          <TouchableOpacity onPress={onClose} className="ml-2">
            <Ionicons name="close" size={18} color="#9ca3af" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        {BannerContent}
      </TouchableOpacity>
    );
  }

  return BannerContent;
}