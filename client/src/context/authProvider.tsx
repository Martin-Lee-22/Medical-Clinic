import {createContext, useState} from 'react';

type propsType = {
    children: JSX.Element | JSX.Element[]
}

type userType = {
    createdAt: string;
    email: string;
    name: string;
    updatedAt: string;
    _v: number;
    _id: string;
}

type authType = {
    accessToken: string;
    user: userType
} | Record<string,never>

type contextType = {
    auth?: authType;
    setAuth: (auth: authType) => void;
} | Record<string,never>

const AuthContext = createContext<contextType>({});

export const AuthProvider = ({children} : propsType) => {
    const [auth, setAuth] = useState<contextType['auth']>({});
    
    return (
        <AuthContext.Provider value = {{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext