import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';

const Dosa = () => {
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketTrends = async () => {
      try {
        const response = await axios.get('https://real-time-finance-data.p.rapidapi.com/market-trends', {
          params: {
            trend_type: 'MARKET_INDEXES',
            country: 'us',
            language: 'en',
          },
          headers: {
            'x-rapidapi-host': 'real-time-finance-data.p.rapidapi.com',
            'x-rapidapi-key': '4a2cd54b59msh0925b9d277dbb70p15ff13jsn52963ca5ddba',
          },
        });

        console.log('Full Market Data Response:', response.data);

        // Set market data state
        setMarketData(response.data);
      } catch (error) {
        console.error('Error fetching market trends:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketTrends();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Market Trends</Text>
      {loading ? (
        <Text style={styles.loadingText}>
            <ActivityIndicator size="large" color="red" />

        </Text>
      ) : marketData && marketData.data && marketData.data.trends ? (
        Array.isArray(marketData.data.trends) && marketData.data.trends.length > 0 ? (
          marketData.data.trends.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.indexName}>{item?.name || 'N/A'}</Text>
              <Text style={styles.indexValue}>Price: {item?.price || 'N/A'}</Text>
              <Text style={styles.indexChange}>Change: {item?.change || 'N/A'}</Text>
              <Text style={styles.indexChangePercent}>
                Change Percent: {item?.change_percent ? `${(item.change_percent * 100).toFixed(2)}%` : 'N/A'}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.errorText}>No valid data available</Text>
        )
      ) : (
        <Text style={styles.errorText}>No data available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  indexName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  indexValue: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  indexChange: {
    fontSize: 16,
    marginTop: 4,
  },
  indexChangePercent: {
    fontSize: 16,
    color: 'green', // Adjust color based on your preference
    marginTop: 4,
  },
});

export default Dosa;
