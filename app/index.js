import React, { useState, useEffect } from 'react';
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
        marginBottom: 160,
      }}>
        pharm-acy
      </Text>
      <Link href="/products" style={styles.button} asChild>
        <Pressable>
          <Text style={styles.buttonText}>
            Entrar
          </Text>
        </Pressable>
      </Link>
      <Link href="/bla" style={styles.button2} asChild>
        <Pressable>
          <Text style={styles.buttonText}>
            Outros
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
  buttonText: {
    fontSize: 20,
    color: '#F2F2F2',
    fontWeight: 'bold',
  },
});