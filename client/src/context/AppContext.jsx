import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios'
import toast from 'react-hot-toast';

const AppContext = createContext();
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppProvider = ({children}) => {
    const [token, setToken] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [query, setQuery] = useState("");
    const value = {
        axios,
        token,
        setToken,
        blogs,
        setBlogs,
        query,
        setQuery
    };
    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get('/api/blog/all');
            data.success ? setBlogs(data.blogs) : toast.error(data.message);
        } catch (error) {
            toast.error("Failed to fetch blogs");
        }
    }

    useEffect(() => {
        fetchBlogs();
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }
    }, [token])
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => {
    return useContext(AppContext);
}
