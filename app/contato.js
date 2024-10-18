import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native';
import * as Contacts from 'expo-contacts';
import { PermissionsAndroid, Platform } from 'react-native';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      if (Platform.OS === 'android') {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS
        );
        if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Permissão para acessar contatos negada');
          return;
        }
      }

      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Name],
      });

      if (data.length > 0) {
        setContacts(data);
      }
    };

    fetchContacts();
  }, []);

  // Filtra os contatos com base na busca
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Contatos</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar contatos..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.contact}>
            <Text>{item.name}</Text>
            {item.phoneNumbers && item.phoneNumbers.length > 0 && (
              <Text>{item.phoneNumbers[0].number}</Text>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  contact: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
