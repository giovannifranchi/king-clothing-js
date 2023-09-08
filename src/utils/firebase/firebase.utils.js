import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBrs-_vzEq4jNAKsmjh6u1qSnt0RIFrL0Q",
    authDomain: "crw-clothing-db-bdfae.firebaseapp.com",
    projectId: "crw-clothing-db-bdfae",
    storageBucket: "crw-clothing-db-bdfae.appspot.com",
    messagingSenderId: "1013682776241",
    appId: "1:1013682776241:web:dea82cc5a2b7f218bd9a90"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth();
export const signInWithGooglePopup = ()=>signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = ()=>signInWithRedirect(auth, provider);
export const signInWithCredentials = (email, password)=>signInWithEmailAndPassword(auth, email, password);
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth)=>{
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        }catch(error){
            console.log(error);
        }
    }else return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password, displayName)=>{
    if(!email || !password) return;
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const userDocRef = doc(db, 'users', response.user.uid);
        const userSnapshot = await getDoc(userDocRef);
        if(!userSnapshot.exists()){
            const createdAt = new Date();
            try {
                await setDoc(userDocRef,{
                    displayName,
                    email,
                    createdAt
                })
            } catch (error) {
                console.log(error);
            }
        }else return userDocRef;
    } catch (error) {
        if(error.code === 'auth/email-already-in-use'){
            return alert('cannot register with these credentials, email already in use');
        }
        console.log(error);
    }

}

export const subscribeToAuthChange = (callback)=> onAuthStateChanged(auth, callback);


export const signOutAuth = ()=> signOut(auth);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd)=>{
    const collectionRef = collection(db, collectionKey)
    const batch = writeBatch(db);
    objectsToAdd.forEach((object)=>{
        const docRef = doc(collectionRef, object.title.toLowerCase())
        batch.set(docRef, object);
    })

    await batch.commit()
    console.log('done');
} 

export const getCategoriesAndDocuments = async ()=>{
    const collectionRef = collection(db, 'categories');
    const myQuery = query(collectionRef)
    const querySnapshot = await getDocs(myQuery);
    return querySnapshot.docs.map((doc)=> doc.data());
}