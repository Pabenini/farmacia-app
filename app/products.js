import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import { Link } from "expo-router"; // Importar Link
import list from "./products.json"; // Certifique-se de que o caminho está correto
import imageproducts from "./imageproducts";

export default function Products() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {list.listProduct.map((item) => (
                <View key={item.id} style={styles.itemContainer}>
                    <Image source={imageproducts[item.image]} style={styles.image} />
                    <Text style={styles.productDescription}>{item.description}</Text>
                    <Text style={styles.productPrice}>R${item.price.toFixed(2)}</Text>
                    <Link
                        href={{
                            pathname: "/singlePag/[id]",
                            params: { id: item.id }
                        }}
                        style={styles.itemLink} // Estilo do link para ser um botão
                    >
                        <Text style={styles.linkText}>Interagir</Text>
                    </Link>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        alignItems: "center",
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 8,
    },
    itemContainer: {
        marginBottom: 20,
        padding: 16,
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        width: '100%',
        alignItems: "center",
        elevation: 2, // Para sombra no Android
        shadowColor: '#000', // Para sombra no iOS
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    itemLink: {
        backgroundColor: '#000', // Cor de fundo do botão
        paddingVertical: 15, // Espaçamento vertical do botão
        paddingHorizontal: 20, // Espaçamento horizontal do botão
        marginTop: 10, // Espaço entre o item e o botão
        alignItems: 'center', // Centraliza o texto dentro do botão
        justifyContent: 'center', // Alinha o texto verticalmente no botão
        borderRadius: 30,
        textAlign: 'center'
    },
    linkText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'ComingSoon-Regular',
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productDescription: {
        fontSize: 14,
        color: '#666',
    },
    productPrice: {
        fontSize: 16,
        color: '#000',
    },
});
