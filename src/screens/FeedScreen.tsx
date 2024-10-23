import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Modal, Button, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Dados Mockados com novos campos: estado, cidade, área
const mockJobs = [
  {
    id: 1,
    title: 'Desenvolvedor React',
    location: 'Remoto',
    state: 'Pará',
    city: 'Belém',
    area: 'TI',
    type: 'Remoto',
    description: 'Desenvolvimento de aplicações web usando React.'
  },
  {
    id: 2,
    title: 'Analista de Dados',
    location: 'Presencial',
    state: 'Tocantins',
    city: 'Palmas',
    area: 'Saúde',
    type: 'Presencial',
    description: 'Análise de dados em grande volume para suporte à tomada de decisão.'
  },
  {
    id: 3,
    title: 'UX Designer',
    location: 'Remoto',
    state: 'Pará',
    city: 'Belém',
    area: 'Design',
    type: 'Remoto',
    description: 'Design de experiência do usuário para melhorar a interface de sistemas.'
  },
  {
    id: 4,
    title: 'Engenheiro de Software',
    location: 'Remoto',
    state: 'Pará',
    city: 'Ananindeua',
    area: 'TI',
    type: 'Remoto',
    description: 'Desenvolvimento de sistemas complexos.'
  }
];

const FeedScreen = ({ navigation }: { navigation: any }) => {
  const [jobs, setJobs] = useState(mockJobs);  // Usar os dados mockados
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(mockJobs);  // Inicialmente, o filtro é a lista completa
  const [modalVisible, setModalVisible] = useState(false);
  
  // Estados para popups
  const [selectedState, setSelectedState] = useState('Todos');
  const [selectedCity, setSelectedCity] = useState('Todos');
  const [selectedArea, setSelectedArea] = useState('Todos');
  const [selectedType, setSelectedType] = useState('Todos');

  const [stateModalVisible, setStateModalVisible] = useState(false);
  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [areaModalVisible, setAreaModalVisible] = useState(false);
  const [typeModalVisible, setTypeModalVisible] = useState(false);
  
  // Extrair estados únicos
  const states = Array.from(new Set(jobs.map(job => job.state)));
  
  // Filtrar cidades com base no estado selecionado
  const cities = Array.from(new Set(jobs
    .filter(job => selectedState === 'Todos' || job.state === selectedState)
    .map(job => job.city)))
    .filter((value, index, self) => self.indexOf(value) === index);  // Remover duplicatas

  // Extrair áreas e tipos de vagas únicos
  const areas = Array.from(new Set(jobs.map(job => job.area)));
  const types = Array.from(new Set(jobs.map(job => job.type)));

  // Simular busca de vagas com dados mockados
  const fetchJobs = async () => {
    try {
      const response = mockJobs;
      setJobs(response);
      setFilteredData(response);
    } catch (error) {
      console.log('Erro ao buscar vagas:', error);
    }
  };

  useEffect(() => {
    fetchJobs();  // Buscar as vagas ao carregar a tela (dados mockados)
  }, []);

  // Filtrar vagas conforme os critérios de busca e filtro
  useEffect(() => {
    const filtered = jobs.filter((job) => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesState = selectedState === 'Todos' || job.state === selectedState;
      const matchesCity = selectedCity === 'Todos' || job.city === selectedCity;
      const matchesArea = selectedArea === 'Todos' || job.area === selectedArea;
      const matchesType = selectedType === 'Todos' || job.type === selectedType;
      return matchesSearch && matchesState && matchesCity && matchesArea && matchesType;
    });
    setFilteredData(filtered);
  }, [searchQuery, selectedState, selectedCity, selectedArea, selectedType, jobs]);

  const renderItem = ({ item }: { item: { id: number, title: string, location: string, state: string, city: string, area: string, type: string, description: string } }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('JobDetails', { 
        title: item.title, 
        location: item.location, 
        state: item.state, 
        city: item.city, 
        area: item.area, 
        type: item.type, 
        description: item.description 
      })}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.location}>{item.state}, {item.city}</Text>
      <Text style={styles.type}>{item.area}</Text>
      <Text style={styles.type}>{item.type}</Text>
    </TouchableOpacity>
  );

  // Função para resetar os filtros ao clicar em "Cancelar" ou "Limpar"
  const resetFilters = () => {
    setSelectedState('Todos');
    setSelectedCity('Todos');
    setSelectedArea('Todos');
    setSelectedType('Todos');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Barra de Pesquisa */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar vagas..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Botões de Filtro e Limpar */}
      <View style={styles.filterButtonsContainer}>
        <TouchableOpacity style={styles.filterButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="filter" size={20} color="#fcfcfc" />
          <Text style={styles.filterText}>Filtrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.clearButton} onPress={resetFilters}>
          <Ionicons name="close-circle" size={20} color="#fcfcfc" />
          <Text style={styles.clearText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Vagas */}
      {filteredData.length === 0 ? (
        <Text>Nenhuma vaga encontrada.</Text>
      ) : (
        <FlatList
          data={filteredData}  // Dados mockados
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}

      {/* Modal de Filtros */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filtrar Vagas</Text>

            {/* Botão para selecionar Estado */}
            <View style={styles.filterRow}>
              <Text style={styles.filterLabel}>Estado:</Text>
              <TouchableOpacity onPress={() => setStateModalVisible(true)} style={styles.selectionBox}>
                <Text>{selectedState}</Text>
              </TouchableOpacity>
            </View>

            {/* Botão para selecionar Cidade */}
            <View style={styles.filterRow}>
              <Text style={styles.filterLabel}>Cidade:</Text>
              <TouchableOpacity onPress={() => setCityModalVisible(true)} style={styles.selectionBox} disabled={selectedState === 'Todos'}>
                <Text>{selectedCity}</Text>
              </TouchableOpacity>
            </View>

            {/* Botão para selecionar Área */}
            <View style={styles.filterRow}>
              <Text style={styles.filterLabel}>Área:</Text>
              <TouchableOpacity onPress={() => setAreaModalVisible(true)} style={styles.selectionBox}>
                <Text>{selectedArea}</Text>
              </TouchableOpacity>
            </View>

            {/* Botão para selecionar Tipo de Vaga */}
            <View style={styles.filterRow}>
              <Text style={styles.filterLabel}>Tipo de Vaga:</Text>
              <TouchableOpacity onPress={() => setTypeModalVisible(true)} style={styles.selectionBox}>
                <Text>{selectedType}</Text>
              </TouchableOpacity>
            </View>

            {/* Botões de aplicar e cancelar */}
            <View style={styles.modalButtonsContainer}>
              <Button title="Aplicar" onPress={() => setModalVisible(false)} color="#1c5229" />
              <Button title="Cancelar" color="red" onPress={resetFilters} />
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal para selecionar Estado */}
      <Modal visible={stateModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione um Estado</Text>
            {states.map(state => (
              <TouchableOpacity key={state} onPress={() => { setSelectedState(state); setStateModalVisible(false); }}>
                <Text>{state}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Modal para selecionar Cidade */}
      <Modal visible={cityModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione uma Cidade</Text>
            {cities.map(city => (
              <TouchableOpacity key={city} onPress={() => { setSelectedCity(city); setCityModalVisible(false); }}>
                <Text>{city}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Modal para selecionar Área */}
      <Modal visible={areaModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione uma Área</Text>
            {areas.map(area => (
              <TouchableOpacity key={area} onPress={() => { setSelectedArea(area); setAreaModalVisible(false); }}>
                <Text>{area}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Modal para selecionar Tipo de Vaga */}
      <Modal visible={typeModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione um Tipo de Vaga</Text>
            {types.map(type => (
              <TouchableOpacity key={type} onPress={() => { setSelectedType(type); setTypeModalVisible(false); }}>
                <Text>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc',
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1c5229',
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c5229',
    padding: 8,
    borderRadius: 8,
    width: '45%',
  },
  filterText: {
    color: '#fcfcfc',
    marginLeft: 8,
    fontSize: 14,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d6850d',
    padding: 8,
    borderRadius: 8,
    width: '45%',
  },
  clearText: {
    color: '#fcfcfc',
    marginLeft: 8,
    fontSize: 14,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1c5229',
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  type: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1c5229',
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1c5229',
    flex: 1,
  },
  selectionBox: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '60%',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});

export default FeedScreen;
