import { createContext, useState } from "react";
import { subscribeToAuthChange } from "../utils/firebase/firebase.utils";
import { useEffect } from "react";
import { createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: ()=>null
});

export const UserProvider = ({children})=>{
  
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser}

    useEffect(()=>{
        const unsubscribe = subscribeToAuthChange((user)=>{
            if(user) createUserDocumentFromAuth(user);
            setCurrentUser(user)
        })
        return unsubscribe;
    })

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}


