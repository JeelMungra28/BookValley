import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../lib/axios';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

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
    totalPrice: number;
    itemCount: number;
    addToCart: (item: CartItem) => Promise<void>;
    removeFromCart: (itemId: string) => Promise<void>;
    updateQuantity: (itemId: string, quantity: number) => Promise<void>;
    clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const [itemCount, setItemCount] = useState(0);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            fetchCart();
        } else {
            setItems([]);
            setLoading(false);
        }
    }, [isAuthenticated]);

    // Calculate totals whenever items change
    useEffect(() => {
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const count = items.reduce((sum, item) => sum + item.quantity, 0);
        setTotalPrice(total);
        setItemCount(count);
    }, [items]);

    const fetchCart = async () => {
        try {
            const response = await api.get('/cart');
            setItems(response.data.items.map((item: any) => ({
                id: item.bookId._id,
                title: item.bookId.title,
                price: item.bookId.price,
                quantity: item.quantity,
                image: item.bookId.coverImage
            })));
        } catch (error: any) {
            console.error('Failed to fetch cart:', error);
            if (error.response?.status === 401) {
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (item: CartItem) => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        try {
            const response = await api.post('/cart', {
                bookId: item.id,
                quantity: item.quantity
            });
            setItems(response.data.items.map((item: any) => ({
                id: item.bookId._id,
                title: item.bookId.title,
                price: item.bookId.price,
                quantity: item.quantity,
                image: item.bookId.coverImage
            })));
        } catch (error: any) {
            console.error('Failed to add item to cart:', error);
            if (error.response?.status === 401) {
                navigate('/login');
            } else {
                throw new Error(error.response?.data?.message || 'Failed to add item to cart');
            }
        }
    };

    const removeFromCart = async (itemId: string) => {
        try {
            const response = await api.delete(`/cart/${itemId}`);
            setItems(response.data.items.map((item: any) => ({
                id: item.bookId._id,
                title: item.bookId.title,
                price: item.bookId.price,
                quantity: item.quantity,
                image: item.bookId.coverImage
            })));
        } catch (error: any) {
            console.error('Failed to remove item from cart:', error);
            if (error.response?.status === 401) {
                navigate('/login');
            } else {
                throw new Error(error.response?.data?.message || 'Failed to remove item from cart');
            }
        }
    };

    const updateQuantity = async (itemId: string, quantity: number) => {
        try {
            const response = await api.put(`/cart/${itemId}`, { quantity });
            setItems(response.data.items.map((item: any) => ({
                id: item.bookId._id,
                title: item.bookId.title,
                price: item.bookId.price,
                quantity: item.quantity,
                image: item.bookId.coverImage
            })));
        } catch (error: any) {
            console.error('Failed to update cart quantity:', error);
            if (error.response?.status === 401) {
                navigate('/login');
            } else {
                throw new Error(error.response?.data?.message || 'Failed to update cart quantity');
            }
        }
    };

    const clearCart = async () => {
        try {
            await api.delete('/cart');
            setItems([]);
        } catch (error: any) {
            console.error('Failed to clear cart:', error);
            if (error.response?.status === 401) {
                navigate('/login');
            } else {
                throw new Error(error.response?.data?.message || 'Failed to clear cart');
            }
        }
    };

    return (
        <CartContext.Provider value={{
            items,
            loading,
            totalPrice,
            itemCount,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart
        }}>
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