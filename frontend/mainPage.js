import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { ItemsContext } from './itemsContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default MainPage = () => {
    const navigation = useNavigation();
    const { items, setItems } = useContext(ItemsContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
            const token = await AsyncStorage.getItem('sessionToken');
            fetch('http://192.168.1.2:4123/api/user/items', { method: 'GET', 
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
             }})
            .then(response => response.json())
            .then(data => {
                const itemsAdded = data.items.recordset.map(item => ({ ...item, added: false }));
                setItems(itemsAdded);
                setLoading(false);
            })
            }  catch(error) {
                console.error("Error fetching data:", error);
                console.log(error);
                alert("An error occurred. Please try again later.");
            }}
        fetchData();
    }, []);

    function ListItem({ item }) {
        return (
            <View style={styles.singleItem}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.Item_name}</Text>
                <Text style={{fontSize: 14, fontWeight: 'semibold'}}>Description: {item.Description}</Text>
                <Text style={{fontSize: 14, fontWeight: 'semibold'}}>Price: {item.Price}</Text>
                <TouchableOpacity title="Add to cart" onPress={() => addToCart(item.Item_ID)}>
                    <Text style={[styles.button, item.added ? styles.addedButton : styles.addButton]}>
                        {!item.added ? "Add to cart" : "Added to cart"}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    const addToCart = (index) => {
        const newItems = [...items];
        newItems.find(item => item.Item_ID === index).added = true;
        setItems(newItems);
    }

    if (loading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    } else 
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Item list</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                    <Icon name="shopping-cart" size={26} color="#fff" />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {items.map((item, index) => (
                    <View key={index}>
                        <ListItem item={item} />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#4A90E2', // Blue
        paddingHorizontal: 12,
        paddingVertical: 10,
        zIndex: 1
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5', // Light Gray
        paddingTop: 60 // Adjust this value based on the height of the titleContainer
    },
    scrollViewContent: {
        paddingTop: 10,
        gap: 10,
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    loadingText: {
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
        color: '#333' // Dark Gray
    },
    singleItem: {
        width: '95%',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        backgroundColor: '#FFFFFF', // White
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#DDD' // Light Gray
    },
    button: {
        padding: 8,
        borderRadius: 5,
        textAlign: 'center',
        color: 'white'
    },
    addButton: {
        backgroundColor: '#4CAF50', // Green
    },
    addedButton: {
        backgroundColor: '#FF5722', // Orange
    }
});