import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import list from '../products.json';
import imageproducts from '../imageproducts';

export default function CoffeeSingle() {
    const { id } = useLocalSearchParams();
    const data = list.listProduct.find((item) => item.id == id);

    // Verifica se há imagens e mapeia cada uma para o componente Image
    const images = data?.image ? [imageproducts[data.image]] : []; // Certificando-se de que é um array

    return (
        <ScrollView style={styles.container}>
            {images.length > 0 ? (
                images.map((imageSource, index) => (
                    <Image
                        key={index}
                        style={styles.image}
                        source={imageSource}
                    />
                ))
            ) : (
                <Text>No images available</Text>
            )}
    
            {data?.description && ( // Mudança de text para description
                <Text style={styles.text}>{data.description}</Text>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        width: 350,
        height: 250,
        margin: 5,
    },
    text: {
        margin: 10,
        fontSize: 17,
        color: '#000', // Alterado para melhorar legibilidade
        backgroundColor: '#F2F2F2', // Alterado para melhor contraste
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 15,
    },
});
