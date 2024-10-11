import { Text, View, Image, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { Link } from "expo-router";

export default function Index() {
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
      <Text
      style={{
        fontWeight: 'bold',
        fontSize: 40,
        fontFamily: "arial",
        marginBottom: 100,
      }}>
        pharmacy
      </Text>
      <Link href="/produtos" style={styles.button} asChild>
        <Pressable>
          <Text style={styles.buttonText}>
            Entrar
          </Text>
        </Pressable>
      </Link>
      <Link href="/firebaseCRUD" style={styles.button} asChild>
        <Pressable>
          <Text style={styles.buttonText}>
            firebase
          </Text>
        </Pressable>
      </Link>
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
  },
  buttonText: {
    fontSize: 20,
    color: '#F2F2F2',
    fontWeight: 'bold',
  },
});