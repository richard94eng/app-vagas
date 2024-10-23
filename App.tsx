import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FeedScreen from './src/screens/FeedScreen';
import LoginScreen from './src/screens/LoginScreen'; // Importar a tela de login
import JobDetailsScreen from './src/screens/JobDetailsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Feed" component={FeedScreen} options={{ title: 'Vagas de Emprego' }} />
        <Stack.Screen name="JobDetails" component={JobDetailsScreen} options={{ title: 'Detalhes da Vaga' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
