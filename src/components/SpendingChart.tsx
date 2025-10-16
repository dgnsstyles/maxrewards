import React from 'react';
import { View, Text } from 'react-native';

interface SpendingData {
  category: string;
  amount: number;
  color: string;
  percentage: number;
}

interface SpendingChartProps {
  data: SpendingData[];
}

export default function SpendingChart({ data }: SpendingChartProps) {
  return (
    <View className="bg-white rounded-2xl p-4">
      <Text className="font-semibold text-slate-900 mb-4">Spending Breakdown</Text>
      {data.map((item, index) => (
        <View key={index} className="mb-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="font-medium text-slate-900">{item.category}</Text>
            <Text className="text-slate-600">${item.amount.toLocaleString()}</Text>
          </View>
          <View className="bg-slate-100 rounded-full h-2">
            <View 
              className="h-2 rounded-full"
              style={{ 
                width: `${item.percentage}%`, 
                backgroundColor: item.color 
              }}
            />
          </View>
        </View>
      ))}
    </View>
  );
}