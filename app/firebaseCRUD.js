import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert, StyleSheet } from 'react-native';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Importa o Firestore configurado
import { Link } from 'expo-router';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default function App() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    
    //Permissão da notificação do app
    const notification = async () => {
        const { status } = await Notifications.getPermissionsAsync();
        if (status !== 'granted') {
            const { status: newStatus } = await Notifications.requestPermissionsAsync();
            if (newStatus !== 'granted') {
                alert('Permissão de notificação negada!');
                return;
            }
        }
    };

    const sendNotification = async () => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: name,
                body: 'Notificação Recebida com Sucesso!!!',
            },
            //trigger: { seconds: 1},
            trigger: null
        });
    };

    // Função para buscar dados da coleção "users" no Firestore
    const fetchUsers = async () => {
        try {
            const usersCollection = collection(db, 'users');
            const usersSnapshot = await getDocs(usersCollection);
            const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUsers(usersList);
        } catch (error) {
            console.error("Erro ao buscar usuários: ", error);
        }
    };

    // Função para adicionar um novo usuário no Firestore
    const addUser = async () => {
        if (!name) {
            Alert.alert('Erro', 'O nome não pode ser nulo');
            return;
        }
        try {
            const newUser = {
                name,
                email,
                phone
            };
            // Adiciona o novo usuário à coleção "users"
            await addDoc(collection(db, 'users'), newUser);
            // Limpa o formulário
            fetchUsers();
            sendNotification();
            setName('');
            setEmail('');
            setPhone('');
            // Atualiza a lista de usuários
            // fetchUsers();
        } catch (error) {
            console.error("Erro ao adicionar usuário: ", error);
        }
    };

    // Função para deletar um usuário do Firestore
    const deleteUser = async (userId) => {
        Alert.alert(
            'Confirmar',
            'Você tem certeza que deseja deletar este usuário?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Deletar',
                    onPress: async () => {
                        try {
                            // Deleta o documento pelo ID
                            await deleteDoc(doc(db, 'users', userId));
                            // Atualiza a lista de usuários
                            fetchUsers();
                        } catch (error) {
                            console.error("Erro ao deletar usuário: ", error);
                        }
                    }
                }
            ]
        );
    };

    // Executa a função ao carregar o componente
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>pharmacy</Text>
            
            {/* Formulário para adicionar um novo usuário */}
            <View style={styles.form}>
                <TextInput
                    placeholder="Nome"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    keyboardType="email-address"
                />
                <TextInput
                    placeholder="Telefone"
                    value={phone}
                    onChangeText={setPhone}
                    style={styles.input}
                    keyboardType="phone-pad"
                />
                <Link
                    href="/"
                    style={styles.itemLink}
                    onPress={addUser}  // Estilo do link para ser um botão
                >
                    <Text style={styles.linkText}>Cadastrar</Text>
                </Link>
            </View>
        </ScrollView>
    );
}

// Estilos
const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F2F2F2',
        flex: 1
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    form: {
        marginVertical: 20,
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    input: {
        borderWidth: 1,
        borderColor: '#BFBFBF',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#F9F9F9',
    },
    userCard: {
        marginVertical: 10,
        padding: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemLink: {
        backgroundColor: 'green', // Cor de fundo do botão
        paddingVertical: 15, // Espaçamento vertical do botão
        paddingHorizontal: 20, // Espaçamento horizontal do botão
        marginTop: 5, // Espaço entre o item e o botão
        alignItems: 'center', // Centraliza o texto dentro do botão
        justifyContent: 'center', // Alinha o texto verticalmente no botão
        borderRadius: 15,
        textAlign: 'center'
    },
    linkText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
