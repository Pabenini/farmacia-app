import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function NotificationScreen() {
    const [expoPushToken, setExpoPushToken] = useState('');

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    }, []);

    const registerForPushNotificationsAsync = async () => {
        // Verifica a permissão de notificações
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        // Somente se a permissão não foi previamente concedida
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        // Se não houver permissão, não retorne um token
        if (finalStatus !== 'granted') {
            Alert.alert('Erro', 'Permissão para notificações não foi concedida!');
            return;
        }

        // Obtém o token para enviar notificações
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
        return token;
    };

    const scheduleNotification = async () => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Você tem uma nova notificação!",
                body: "Esta é a mensagem da sua notificação.",
                data: { data: 'Dados adicionais' },
            },
            trigger: { seconds: 2 }, // A notificação será exibida após 2 segundos
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notificações</Text>
            <Button title="Agendar Notificação" onPress={scheduleNotification} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});
