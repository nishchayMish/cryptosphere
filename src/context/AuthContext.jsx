import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, setDoc } from 'firebase/firestore';
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

export const UserContext = createContext();

const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState(null); // Set initial user to null

    const signUp = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // Create user document in Firestore
            await setDoc(doc(db, 'users', email), {
                watchList: [],
            });
        } 
        catch (error) {
            console.error("Error signing up:", error);
        }
    };

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <UserContext.Provider value={{ signUp, signIn, logOut, user }}>
            {children}
        </UserContext.Provider>
    );
};

export default AuthContextProvider;
