import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth'; 


const config = {
    apiKey: "AIzaSyDhcOh2PjGUhzFnYW15xKNaoX-DgeIdGGU",
    authDomain: "crwn-project-481a3.firebaseapp.com",
    databaseURL: "https://crwn-project-481a3.firebaseio.com",
    projectId: "crwn-project-481a3",
    storageBucket: "crwn-project-481a3.appspot.com",
    messagingSenderId: "458426060633",
    appId: "1:458426060633:web:8771ee4c66ed7665d78648",
    measurementId: "G-QG3KH5KF85"
};


firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;