import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const JobDetailsScreen = ({ route }: { route: any }) => {
  const { title, location, type, description } = route.params; // Recebe os dados da vaga via navegação

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.location}>Local: {location}</Text>
      <Text style={styles.type}>Tipo: {type}</Text>

      {/* Descrição maior */}
      <Text style={styles.descriptionTitle}>Descrição da Vaga:</Text>
      <Text style={styles.description}>{description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fcfcfc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1c5229',
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  type: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1c5229',
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});

export default JobDetailsScreen;
