import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, Pressable, Modal, TextInput, Button } from "react-native";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Link } from "expo-router";
import { auth } from './firebaseConfig'; // Importando auth

export default function Index() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
  
    // Função para login
    const handleLogin = async () => {
        try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Usuário logado com sucesso!');
        setModalVisible(false);
        } catch (error) {
        setErrorMessage(error.message);    

        }
    };

    // Função para logout
    const handleLogout = async () => {
        try {
        await signOut(auth);
        console.log('Usuário deslogado com sucesso!');
        setUser(null);
        } catch (error) {
        setErrorMessage(error.message);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
          if (loggedUser) {
            setUser(loggedUser);
          } else {
            setUser(null);
          }
        });
    
        return () => unsubscribe();
      }, [])

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
        source={require('../assets/images/Farmacia-logo2.png')}
        />
        <Pressable onPress={() => setModalVisible(true)}
          style={{ backgroundColor: "#009900", padding: 15, borderRadius: 10, width: '95%', marginBottom: 10 }}  >
          <Text style={{ fontSize: 22, color: "#FFFFFF", textAlign: "center" }}> Logar </Text>
        </Pressable>

        {user ? (
            <View>
                <Text style={{ color: "#000", marginTop: 20 }}>Bem-vindo, {user.email}</Text>
                <Button title="Logout" onPress={handleLogout} />
            </View>
            ) : (
            <View>
                {errorMessage ? <Text style={styles.error} > {errorMessage}</Text> : null
                }
            </View>
        )}

        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        >

        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Logar</Text>

            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
              placeholderTextColor="#FFF"
              keyboardType="email-address"
            />

            <TextInput
              placeholder="Senha"
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={styles.input}
              placeholderTextColor="#FFF"
              secureTextEntry

            />

            <View style={styles.modalButtons}>
              <Pressable style={styles.addButton} onPress={handleLogin}>
                <Text style={styles.addButtonText}>Logar</Text>
              </Pressable>

              <Pressable style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </Pressable>
            </View>

          </View>
        </View>

      </Modal>

      </View>
    );
  }
  
  const styles = StyleSheet.create({
  
    button: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      margin: 20,
      backgroundColor: '#009900',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 15,
      borderRadius: 30,
      marginBottom: 80,
    },
    button2: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      margin: 20,
      backgroundColor: '#009900',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 15,
      borderRadius: 30,
    },
    buttonText: {
      fontSize: 20,
      color: '#F2F2F2',
      fontWeight: 'bold',
    },
    container: {
        padding: 15
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(0,0,0,0.7)',
      },
      modalContent: {
        width: '90%',
        backgroundColor: '#1A1A1A',
        padding: 20,
        borderRadius: 10,
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#FFF',
      },
      input: {
        borderWidth: 1,
        borderColor: '#FFF',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        color: '#FFF', // Texto branco nos inputs
      },
      modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
      },
      addButton: {
        backgroundColor: '#FF3737', // Vermelho do botão de salvar
        padding: 10,
        borderRadius: 5,
        width: '45%',
        alignItems: 'center',
      },
      addButtonText: {
        color: '#FFF',
        fontSize: 16,
      },
      cancelButton: {
        backgroundColor: '#B00020', // Vermelho escuro para o botão de cancelar
        padding: 10,
        borderRadius: 5,
        width: '45%',
        alignItems: 'center',
      },
      cancelButtonText: {
        color: '#FFF',
        fontSize: 16,
      },
  });