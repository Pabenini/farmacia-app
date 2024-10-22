import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import list from '../products.json';
import imageproducts from '../imageproducts';
import { Link } from 'expo-router';

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
            <Text style={styles.price}>R$ {data.price}</Text>
            <Link href="/products" style={styles.button} asChild>
                <Pressable>
                <Text style={styles.buttonText}>
                    Comprar
                </Text>
                </Pressable>
            </Link>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        width: 200,
        height: 250,
        marginLeft: 90,
    },
    text: {
        margin: 10,
        fontSize: 17,
        color: '#000', // Alterado para melhorar legibilidade
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 15,
    },
    price: {
        margin: 10,
        fontSize: 20,
        color: '#000', // Alterado para melhorar legibilidade
        textAlign: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 15,
        fontWeight: "bold",
    },
    button: {
        flex: 1,
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
});
