import { useMutation, useQuery, QueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";
interface SearchHistoryItem {
    id: string;
    query: string;
    lat: number;
    lon: number;
    name: string;
    country: string;
    state?: string;
    searchedAt: number; // Timestamp of when the search was made
}

export function useSearchHistory(){
    const [history, setHistory] = useLocalStorage<SearchHistoryItem[]>('searchHistory', []);
    const queryClient = new QueryClient();
    const historyQuery = useQuery({
        queryKey: ['search-history'],
        queryFn: () => history,
        initialData : history
    });
        const addToHistory = useMutation({
            mutationFn: async (
                search: Omit<SearchHistoryItem, 'id' | 'searchedAt'>,
            ) => {
                const newSearch: SearchHistoryItem = {
                    ...search,
                    id: `${search.lat}-${search.lon}-${Date.now()}`,
                    searchedAt: Date.now(),
                };
                const filteredHistory = history.filter(item =>
                    item.lat !== search.lat || item.lon !== search.lon
                );
                
                const newHistory = [newSearch, ...filteredHistory].slice(0, 10); // Keep only the last 10 searches
                setHistory(newHistory);
                return newHistory;
            },
            onSuccess:(newHistory)=>{
                queryClient.setQueryData(['search-history'], newHistory);
            }
        });
    const clearHistory = useMutation({
        mutationFn: async () => {
            setHistory([]);
            return [];
        },
        onSuccess: () => {
            console.log("Search history cleared");
            queryClient.setQueryData(['search-history'], []);
        }
    });
    return {
        history: historyQuery.data ?? [],
        addToHistory,
        clearHistory,
    };
        
}