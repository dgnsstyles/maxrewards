export interface Card {
  id: string;
  name: string;
  bank: string;
  rewardRate: number;
  category?: string;
  color: string;
  annualFee: number;
  benefits: string[];
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  rewardRate: number;
  merchant: string;
  expiryDate: string;
  category: string;
  isFavorite?: boolean;
}

export interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  category: string;
  date: string;
  cardUsed: string;
  rewardsEarned: number;
}

export const mockCards: Card[] = [
  {
    id: '1',
    name: 'Chase Sapphire Preferred',
    bank: 'Chase',
    rewardRate: 5,
    category: 'Dining',
    color: '#1E40AF',
    annualFee: 95,
    benefits: ['2x points on travel and dining', '1.25x value when redeemed through Chase portal']
  },
  {
    id: '2',
    name: 'American Express Gold',
    bank: 'Amex',
    rewardRate: 4,
    category: 'Groceries',
    color: '#D97706',
    annualFee: 250,
    benefits: ['4x points on groceries', '4x points on dining', '$120 dining credit']
  },
  {
    id: '3',
    name: 'Citi Double Cash',
    bank: 'Citi',
    rewardRate: 2,
    category: 'Everything',
    color: '#DC2626',
    annualFee: 0,
    benefits: ['2% cash back on everything', 'No annual fee', 'No category restrictions']
  }
];

export const mockOffers: Offer[] = [
  {
    id: '1',
    title: '5% back at Amazon',
    description: 'Get 5% cash back on all Amazon purchases when you use your Chase Freedom card',
    rewardRate: 5,
    merchant: 'Amazon',
    expiryDate: 'Dec 31, 2024',
    category: 'Online Shopping',
    isFavorite: true
  },
  {
    id: '2',
    title: '3% back at gas stations',
    description: 'Earn 3% cash back at gas stations nationwide for the rest of the quarter',
    rewardRate: 3,
    merchant: 'Gas Stations',
    expiryDate: 'Mar 31, 2025',
    category: 'Gas',
    isFavorite: false
  },
  {
    id: '3',
    title: '4% back at grocery stores',
    description: 'Special offer: 4% cash back at all grocery stores, no limit',
    rewardRate: 4,
    merchant: 'Grocery Stores',
    expiryDate: 'Jan 15, 2025',
    category: 'Groceries',
    isFavorite: true
  },
  {
    id: '4',
    title: '2x points on dining',
    description: 'Double your rewards at restaurants and food delivery services',
    rewardRate: 2,
    merchant: 'Restaurants',
    expiryDate: 'Feb 28, 2025',
    category: 'Dining',
    isFavorite: false
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    merchant: 'Starbucks',
    amount: 5.75,
    category: 'Dining',
    date: '2024-10-15',
    cardUsed: 'Chase Sapphire Preferred',
    rewardsEarned: 11.5
  },
  {
    id: '2',
    merchant: 'Whole Foods',
    amount: 127.50,
    category: 'Groceries',
    date: '2024-10-14',
    cardUsed: 'American Express Gold',
    rewardsEarned: 510
  },
  {
    id: '3',
    merchant: 'Shell Gas Station',
    amount: 45.20,
    category: 'Gas',
    date: '2024-10-13',
    cardUsed: 'Chase Freedom',
    rewardsEarned: 135.6
  },
  {
    id: '4',
    merchant: 'Amazon',
    amount: 89.99,
    category: 'Online Shopping',
    date: '2024-10-12',
    cardUsed: 'Chase Freedom',
    rewardsEarned: 449.95
  }
];

export const mockUserStats = {
  totalRewards: 2847.50,
  monthlySpending: 1250.75,
  favoriteCategory: 'Dining',
  bestCard: 'Chase Sapphire Preferred',
  rewardsThisMonth: 385.20
};