import { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/axios';

interface SearchResult {
    type: 'book' | 'category';
    id: string;
    title: string;
}

interface SearchContextType {
    query: string;
    setQuery: (query: string) => void;
    suggestions: SearchResult[];
    loading: boolean;
    search: (query: string) => Promise<void>;
    clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const search = async (searchQuery: string) => {
        if (!searchQuery.trim()) {
            setSuggestions([]);
            return;
        }

        try {
            setLoading(true);
            const response = await api.get(`/search?q=${encodeURIComponent(searchQuery)}`);
            setSuggestions(response.data.suggestions);
        } catch (error) {
            console.error('Search error:', error);
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    };

    const clearSearch = () => {
        setQuery('');
        setSuggestions([]);
    };

    return (
        <SearchContext.Provider value={{
            query,
            setQuery,
            suggestions,
            loading,
            search,
            clearSearch
        }}>
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch() {
    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
} 