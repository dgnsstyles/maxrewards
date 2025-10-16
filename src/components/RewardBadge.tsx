import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface RewardBadgeProps {
  amount: number;
  currency?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'accent';
}

export default function RewardBadge({ 
  amount, 
  currency = '$', 
  size = 'medium',
  variant = 'primary' 
}: RewardBadgeProps) {
  const formatAmount = (amount: number) => {
    if (amount >= 1000) {
      return `${currency}${(amount / 1000).toFixed(1)}k`;
    }
    return `${currency}${amount.toLocaleString()}`;
  };

  const getContainerStyle = () => {
    let style = [styles.container];
    
    // Size styles
    if (size === 'small') style.push(styles.small);
    else if (size === 'large') style.push(styles.large);
    else style.push(styles.medium);
    
    // Variant styles
    if (variant === 'secondary') style.push(styles.secondary);
    else if (variant === 'accent') style.push(styles.accent);
    else style.push(styles.primary);
    
    return style;
  };

  const getTextStyle = () => {
    let style = [styles.text];
    if (size === 'small') style.push(styles.textSmall);
    else if (size === 'large') style.push(styles.textLarge);
    else style.push(styles.textMedium);
    return style;
  };

  return (
    <View style={getContainerStyle()}>
      <Text style={getTextStyle()}>
        {formatAmount(amount)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  small: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  medium: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  large: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  primary: {
    backgroundColor: '#7c3aed',
  },
  secondary: {
    backgroundColor: '#22d3ee',
  },
  accent: {
    backgroundColor: '#f59e0b',
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  textSmall: {
    fontSize: 14,
  },
  textMedium: {
    fontSize: 16,
  },
  textLarge: {
    fontSize: 18,
  },
});
