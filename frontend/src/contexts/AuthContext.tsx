import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../lib/axios';

interface User {
    id: string;
    email: string;
    name: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Check authentication status on initial load
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem(TOKEN_KEY);
            const storedUser = localStorage.getItem(USER_KEY);
            
            if (token && storedUser) {
                // Set user from localStorage immediately to prevent UI flicker
                setUser(JSON.parse(storedUser));
                
                // Verify token with backend
                try {
                    const response = await api.get('/auth/me');
                    if (response.data) {
                        // Update user data from server
                        setUser(response.data);
                        localStorage.setItem(USER_KEY, JSON.stringify(response.data));
                    }
                } catch (error) {
                    console.error('Token validation error:', error);
                    // If token validation fails, clear auth data
                    localStorage.removeItem(TOKEN_KEY);
                    localStorage.removeItem(USER_KEY);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('Auth check error:', error);
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            if (!email || !password) {
                throw new Error('Email and password are required');
            }
            
            const response = await api.post('/auth/login', { email, password });
            
            if (response.data && response.data.token) {
                localStorage.setItem(TOKEN_KEY, response.data.token);
                localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
                setUser(response.data.user);
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (error: any) {
            console.error('Login error:', error);
            if (error.response) {
                if (error.response.status === 400) {
                    throw new Error(error.response.data.message || 'Invalid credentials');
                } else if (error.response.status === 429) {
                    throw new Error('Too many login attempts. Please try again later.');
                }
            }
            throw error;
        }
    };

    const register = async (name: string, email: string, password: string) => {
        try {
            if (!name || !email || !password) {
                throw new Error('Name, email and password are required');
            }
            
            const response = await api.post('/auth/register', { name, email, password });
            
            if (response.data && response.data.token) {
                localStorage.setItem(TOKEN_KEY, response.data.token);
                localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
                setUser(response.data.user);
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 400) {
                    throw new Error(error.response.data.message || 'Registration failed');
                }
            }
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            loading, 
            isAuthenticated: !!user, 
            login, 
            register, 
            logout 
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
} 