import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';

export default function NewsScreen() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch(
        'https://newsapi.org/v2/everything?q=mango%20AND%20India&from=2025-03-07&sortBy=publishedAt&apiKey=1c3ee84842ff472396fb97df34bb0431'
      );
      const data = await response.json();
      setArticles(data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.card} onPress={() => Linking.openURL(item.url)}>
        <Image source={{ uri: item.urlToImage }} style={styles.image} />
        <View style={styles.content}>
            <Text style={styles.category}>{item.author || 'Unknown Author'}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.published}>{new Date(item.publishedAt).toLocaleString()}</Text>
        </View>
    </TouchableOpacity>
);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Mango News from India</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={articles}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 50,
    backgroundColor: '#fff',
    flex: 1
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2
  },
  image: {
    width: '100%',
    height: 180
  },
  content: {
    padding: 12
  },
  category: {
    color: '#008000',
    fontWeight: '600',
    marginBottom: 4
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6
  },
  description: {
    fontSize: 14,
    color: '#444'
  },
  published: {
    marginTop: 8,
    fontSize: 12,
    color: '#999'
  }
});