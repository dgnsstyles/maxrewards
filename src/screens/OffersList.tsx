import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import OfferTile from '../components/OfferTile';
import { mockOffers, Offer } from '../data/mockData';

export default function OffersList({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [offers, setOffers] = useState(mockOffers);

  const filters = ['All', 'Favorites', 'Dining', 'Groceries', 'Gas', 'Online Shopping'];

  const filteredOffers = offers.filter(offer => {
    const matchesSearch = offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         offer.merchant.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilter === 'All') return matchesSearch;
    if (selectedFilter === 'Favorites') return matchesSearch && offer.isFavorite;
    return matchesSearch && offer.category === selectedFilter;
  });

  const toggleFavorite = (offerId: string) => {
    setOffers(offers.map(offer => 
      offer.id === offerId ? { ...offer, isFavorite: !offer.isFavorite } : offer
    ));
  };

  const renderOffer = ({ item }: { item: Offer }) => (
    <OfferTile
      offer={item}
      onPress={() => navigation.navigate('OfferDetail', { offerId: item.id })}
      onFavoriteToggle={() => toggleFavorite(item.id)}
    />
  );

  const renderFilterPill = ({ item }: { item: string }) => (
    <TouchableOpacity
      onPress={() => setSelectedFilter(item)}
      style={[
        styles.filterPill,
        selectedFilter === item ? styles.filterPillActive : styles.filterPillInactive
      ]}
    >
      <Text style={[
        styles.filterPillText,
        selectedFilter === item ? styles.filterPillTextActive : styles.filterPillTextInactive
      ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Special Offers</Text>
            <Text style={styles.subtitle}>{filteredOffers.length} offers available</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="filter" size={24} color="#64748b" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search offers..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9ca3af"
          />
          <Ionicons 
            name="search" 
            size={20} 
            color="#9ca3af" 
            style={styles.searchIcon}
          />
        </View>

        {/* Filter Pills */}
        <FlatList
          horizontal
          data={filters}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
          keyExtractor={(item) => item}
          renderItem={renderFilterPill}
        />
      </View>

      {/* Offers List */}
      <FlatList
        data={filteredOffers}
        renderItem={renderOffer}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search" size={48} color="#d1d5db" />
            <Text style={styles.emptyText}>
              No offers found matching your criteria
            </Text>
          </View>
        }
      />
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
    fontSize: 16,
    color: '#64748b',
  },
  searchContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 20,
    paddingLeft: 48,
    paddingRight: 16,
    paddingVertical: 16,
    color: '#0f172a',
    fontSize: 16,
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    top: 16,
  },
  filtersContainer: {
    paddingBottom: 16,
  },
  filterPill: {
    marginRight: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterPillActive: {
    backgroundColor: '#7c3aed',
  },
  filterPillInactive: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  filterPillText: {
    fontWeight: '500',
  },
  filterPillTextActive: {
    color: 'white',
  },
  filterPillTextInactive: {
    color: '#64748b',
  },
  listContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    color: '#64748b',
    marginTop: 16,
    textAlign: 'center',
  },
});
