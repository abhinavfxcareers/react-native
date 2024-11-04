import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

const StockNews = ({ navigation }) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockNews = async () => {
      try {
        const response = await axios.get(
          'https://real-time-finance-data.p.rapidapi.com/stock-news',
          {
            params: { symbol: 'AAPL:NASDAQ', language: 'en' },
            headers: {
              'x-rapidapi-host': 'real-time-finance-data.p.rapidapi.com',
              'x-rapidapi-key': '4a2cd54b59msh0925b9d277dbb70p15ff13jsn52963ca5ddba',
            },
          }
        );
        setNewsData(response.data.data.news); // Accessing nested 'news' array correctly
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStockNews();
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={newsData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.newsItem}>
            <Text style={styles.title}>{item.article_title}</Text>
            <Image source={{ uri: item.article_photo_url }} style={styles.image} />
            <Text style={styles.source}>Source: {item.source}</Text>
            <Text style={styles.postTime}>Published on: {item.post_time_utc}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('WebViewScreen', { url: item.article_url })}>
              <Text style={styles.link}>Read more</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  newsItem: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  source: {
    marginTop: 5,
    fontSize: 14,
    color: '#555',
  },
  postTime: {
    fontSize: 12,
    color: '#777',
  },
  link: {
    marginTop: 10,
    color: '#1e90ff',
    fontSize: 14,
  },
  image: {
    height: 150,
    width: '100%',
    marginTop: 10,
    borderRadius: 5,
  },
});

export default StockNews;