import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TextInput, Image, TouchableOpacity } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as ImagePicker from 'expo-image-picker';

export default function ContactsScreen() {
    const [contacts, setContacts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [imageUris, setImageUris] = useState({}); // Para armazenar as URIs das imagens

    useEffect(() => {
        const fetchContacts = async () => {
            const { status } = await Contacts.requestPermissionsAsync();

            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
                });

                if (data.length > 0) {
                    const sortedContacts = data.sort((a, b) => {
                        if (a.name && b.name) {
                            return a.name.localeCompare(b.name);
                        }
                        return 0;
                    });
                    setContacts(sortedContacts);
                    setFilteredContacts(sortedContacts);
                } else {
                    Alert.alert('Nenhum contato encontrado.');
                }
            } else {
                Alert.alert('Permissão para acessar contatos foi negada.');
            }
        };

        fetchContacts();
    }, []);

    useEffect(() => {
        const results = contacts.filter(contact =>
            contact.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredContacts(results);
    }, [searchQuery, contacts]);

    const pickImage = async (contactId) => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUris((prev) => ({ ...prev, [contactId]: result.assets[0].uri }));
        }
    };

    const renderContact = ({ item }) => (
        <View style={styles.contactItem}>
            <TouchableOpacity onPress={() => pickImage(item.id)}>
                <Image 
                    source={{ uri: imageUris[item.id] || 'https://via.placeholder.com/50' }} 
                    style={styles.contactImage}
                />
            </TouchableOpacity>
            <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{item.name}</Text>
                {item.phoneNumbers && item.phoneNumbers.length > 0 && (
                    <Text style={styles.contactPhone}>{item.phoneNumbers[0].number}</Text>
                )}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Contatos</Text>
            <TextInput
                placeholder="Buscar contatos..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.input}
            />
            <FlatList
                data={filteredContacts}
                renderItem={renderContact}
                keyExtractor={item => item.id}
                style={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    list: {
        width: '100%',
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginVertical: 5,
        borderRadius: 5,
        backgroundColor: '#f0f0f0',
    },
    contactImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    contactInfo: {
        flex: 1,
    },
    contactName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    contactPhone: {
        fontSize: 16,
        color: '#555',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 10,
        width: '100%',
        paddingHorizontal: 10,
    },
});



