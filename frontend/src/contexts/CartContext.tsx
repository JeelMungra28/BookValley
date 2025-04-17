import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../lib/axios';

interface CartItem {
    id: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartContextType {
    items: CartItem[];
    loading: boolean;
    addToCart: (item: CartItem) => Promise<void>;
    removeFromCart: (itemId: string) => Promise<void>;
    updateQuantity: (itemId: string, quantity: number) => Promise<void>;
    clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await api.get('/cart');
            setItems(response.data);
        } catch (error) {
            console.error('Failed to fetch cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (item: CartItem) => {
        try {
            const response = await api.post('/cart', item);
            setItems(response.data);
        } catch (error) {
            console.error('Failed to add item to cart:', error);
            throw error;
        }
    };

    const removeFromCart = async (itemId: string) => {
        try {
            const response = await api.delete(`/cart/${itemId}`);
            setItems(response.data);
        } catch (error) {
            console.error('Failed to remove item from cart:', error);
            throw error;
        }
    };

    const updateQuantity = async (itemId: string, quantity: number) => {
        try {
            const response = await api.put(`/cart/${itemId}`, { quantity });
            setItems(response.data);
        } catch (error) {
            console.error('Failed to update cart quantity:', error);
            throw error;
        }
    };

    const clearCart = async () => {
        try {
            await api.delete('/cart');
            setItems([]);
        } catch (error) {
            console.error('Failed to clear cart:', error);
            throw error;
        }
    };

    return (
        <CartContext.Provider value={{ items, loading, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
} 