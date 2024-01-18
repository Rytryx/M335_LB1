import * as React from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { getAllReflections } from '../storage/AsyncStorage';

const SearchReflectionsComponent = () => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [allReflections, setAllReflections] = React.useState([]);

  const loadReflections = async () => {
    try {
      const loadedReflections = await getAllReflections();
      setAllReflections(loadedReflections);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    loadReflections();
  }, []);

  const handleSearch = () => {
    const filteredReflections = allReflections.filter(reflection =>
      reflection.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredReflections);
  };

  return (
    <SafeAreaProvider>
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <TextInput
          style={styles.input}
          placeholder="Search Reflections"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Button title="Search" onPress={handleSearch} />

        <ScrollView style={styles.resultsContainer}>
          {searchResults.map((reflection, index) => (
            <View key={index} style={styles.resultItem}>
              <View style={styles.reflectionDetails}>
                <Text style={styles.resultText}>Title: {reflection.title}</Text>
                {reflection.image && (
                  <Image source={{ uri: reflection.image }} style={styles.image} />
                )}
                <Text style={styles.resultText}>Date: {new Date(reflection.date).toLocaleDateString()}</Text>
                <Text style={styles.reflectionText}>{reflection.text}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  resultsContainer: {
    marginTop: 20,
    width: '100%',
  },
  resultItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  reflectionDetails: {
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    marginBottom: 10,
  },
  resultText: {
    fontSize: 16,
    color: 'black',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  reflectionText: {
    fontSize: 14,
    color: 'grey',
    marginTop: 10,
  },
});

export default SearchReflectionsComponent;
