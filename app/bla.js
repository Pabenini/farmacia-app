import { Text, View, Image, StyleSheet, TouchableOpacity, ScrollView, Pressable } from "react-native";
import { Link } from "expo-router";

export default function bla(){
    return (
        <View 
            style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Image
            style={{ marginBottom: 300}}
            source={require('../assets/images/Farmacia-logo2.png')}
            />
            <Link href="/aula" style={styles.button} asChild>
                <Pressable>
                <Text style={styles.buttonText}>
                    Logar
                </Text>
                </Pressable>
            </Link>
            <Link href="/firebaseCRUD" style={styles.button2} asChild>
                <Pressable>
                <Text style={styles.buttonText}>
                    Cadastro
                </Text>
                </Pressable>
            </Link>
            <Link href="/notification" style={styles.button3} asChild>
                <Pressable>
                <Text style={styles.buttonText}>
                    Pop-up
                </Text>
                </Pressable>
            </Link>
            <Link href="/contato" style={styles.button4} asChild>
                <Pressable>
                <Text style={styles.buttonText}>
                    Contatos 1
                </Text>
                </Pressable>
            </Link>
            <Link href="/contato2" style={styles.button5} asChild>
                <Pressable>
                <Text style={styles.buttonText}>
                    Contatos 2
                </Text>
                </Pressable>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({

    button: {
      flex: 1,
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
      flex: 1,
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
    button3: {
      flex: 1,
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
      marginBottom: 140,
    },
    button4: {
      flex: 1,
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
      marginBottom: 200,
    },
    button5: {
        flex: 1,
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
        marginBottom: 260,
      },
    buttonText: {
      fontSize: 20,
      color: '#F2F2F2',
      fontWeight: 'bold',
    },
  });