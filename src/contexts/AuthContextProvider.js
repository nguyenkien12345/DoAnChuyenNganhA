import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';

const AuthContext = createContext();

// Other components can use this context
const useAuthContext = () => {
    return useContext(AuthContext);
}

function AuthContextProvider({children}) {
    
    const [currentUser, setCurrentUser] = useState(null);
    const [loading,setLoading] = useState(true); 

    const handleSignUp = async(email, password) => {
        return await auth.createUserWithEmailAndPassword(email,password);
    }

    const handleLogin = async(email, password) => {
        return await auth.signInWithEmailAndPassword(email,password);
    }

    const handleLogOut = async() => {
        return await auth.signOut();
    }

    const resetPassword = async(email) => {
        return await auth.sendPasswordResetEmail(email);
    }

    const updateEmail = async(email) => {
        return await currentUser.updateEmail(email);
    }

    const updatePassword = async(password) => {
        return await currentUser.updatePassword(password);
    }

    useEffect(() => {
        const subscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false); 
        });
        // Clear 
        return subscribe;
    },[])

    const value = {
        currentUser,
        handleSignUp,
        handleLogin,
        handleLogOut,
        resetPassword,
        updateEmail,
        updatePassword
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
};

export { useAuthContext };
export default AuthContextProvider;