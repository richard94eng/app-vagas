import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aqui você pode adicionar a lógica de login, por enquanto é apenas um exemplo
    if (email && password) {
      alert(`Login realizado com o email: ${email}`);
      navigation.replace('Feed'); // Navega para o feed após login
    } else {
      alert('Preencha os campos de email e senha.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Campo de Email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Campo de Senha */}
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Botão Esqueci Minha Senha */}
      <TouchableOpacity onPress={() => alert('Função "Esqueci minha senha" ainda não implementada.')}>
        <Text style={styles.link}>Esqueci minha senha</Text>
      </TouchableOpacity>

      {/* Botão de Login */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Entrar</Text>
      </TouchableOpacity>

      {/* Botão de Cadastro */}
      <TouchableOpacity onPress={() => alert('Função "Cadastrar" ainda não implementada.')}>
        <Text style={styles.link}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcfcfc',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1c5229',
    marginBottom: 32,
  },
  input: {
    width: '100%',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    color: '#1c5229',
  },
  link: {
    color: '#1c5229',
    marginBottom: 16,
  },
  loginButton: {
    width: '100%',
    padding: 12,
    backgroundColor: '#1c5229',
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  loginText: {
    color: '#fcfcfc',
    fontSize: 16,
  },
});

export default LoginScreen;
