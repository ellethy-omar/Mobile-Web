import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ItemsContext } from './itemsContext';

export default CartPage = () => {
    const { items, setItems } = useContext(ItemsContext);
    const [cartItems, setCartItems] = useState(items.filter(item => item.added));

    useEffect(() => {
        setCartItems(items.filter(item => item.added));
    }, [items]);

    const removeFromCart = (index) => {
        const newItems = [...items];
        newItems[index].added = false;
        setItems(newItems);
    };

    function ListItem({ item, index }) {
        return (
            <View style={styles.singleItem}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.name}</Text>
                <Text style={{fontSize: 14, fontWeight: 'semibold'}}>Description: {item.description}</Text>
                <Text style={{fontSize: 14, fontWeight: 'semibold'}}>Price: {item.price}</Text>
                <TouchableOpacity title="Remove from cart" onPress={() => removeFromCart(index)}>
                    <Text style={styles.button}>Remove from cart</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Your Shopping Cart</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {cartItems.map((item, index) => (
                    <View key={index}>
                        <ListItem item={item} index={index} />
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
    singleItem: {
        width: '94%',
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
        backgroundColor: '#FF5722', // Orange
        color: 'white',
        padding: 8,
        borderRadius: 5,
        textAlign: 'center'
    }
});