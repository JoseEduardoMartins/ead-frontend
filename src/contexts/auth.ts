import { createContext, useState, useEffect, useContext} from "react";
import * as auth from "../services/auth";
import api from "../services/api";

interface User {
    type_user: string;
    name: string;
    birth: Date;
    gender: string;
    area_id:number;
    phone: string;
    level: number;
    email: string;
    password: string;
    isActive: Boolean;
}

interface context { 
    signed: Boolean;
    user: User;
    loading: Boolean;
    signIn: Function;
    signOut: Function;
}

const AuthContext = createContext<context>();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStoragedData(){
            const storageUser = await sessionStorage.getItem('user');
            const storageToken = await sessionStorage.getItem('token');
            
            if( storageUser && storageToken){
                api.defaults.headers.Autorization = `Bearer ${storageToken}`;
                setUser(storageUser);
            }
            setLoading(false);
        }
        loadStoragedData();
    }, []);

    async function signIn(){
        const response = await auth.signIn();
        setUser(response.user);

        api.defaults.headers['Autorization'] = `Bearer ${response.token}`;

        await sessionStorage.setItem('user', JSON.stringify(response.user));
        await sessionStorage.setItem('token', JSON.stringify( response.token));
    }

    async function signOut(){
        sessionStorage.clear();
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut }}>
            { children }
        </AuthContext.Provider>
    )
};

export function useAuth(){
    const context = useContext(AuthContext);
    return context;
}
