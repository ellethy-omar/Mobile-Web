import React, { createContext, useState } from 'react';

export const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
    const [items, setItems] = useState([
        {
            name: 'Item 1',
            description: 'Description 1',
            price: 'Price 1',
            added: false
        },
        {
            name: 'Item 2',
            description: 'Description 2',
            price: 'Price 2',
            added: false
        },
        {
            name: 'Item 3',
            description: 'Description 3',
            price: 'Price 3',
            added: false
        },
        {
            name: 'Item 4',
            description: 'Description 4',
            price: 'Price 4',
            added: false
        },
        {
            name: 'Item 5',
            description: 'Description 5',
            price: 'Price 5',
            added: false
        },
        {
            name: 'Item 6',
            description: 'Description 6',
            price: 'Price 6',
            added: false
        },
        {
            name: 'Item 7',
            description: 'Description 7',
            price: 'Price 7',
            added: false
        },
        {
            name: 'Item 8',
            description: 'Description 8',
            price: 'Price 8',
            added: false
        },
        {
            name: 'Item 9',
            description: 'Description 9',
            price: 'Price 9',
            added: false
        },
        {
            name: 'Item 10',
            description: 'Description 10',
            price: 'Price 10',
            added: false
        }
    ]);

    return (
        <ItemsContext.Provider value={{ items, setItems }}>
            {children}
        </ItemsContext.Provider>
    );
};