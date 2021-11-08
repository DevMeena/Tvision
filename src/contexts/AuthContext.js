import { firebase } from "../firebase";
import React, {useContext, useState, useEffect} from 'react'
import { auth, db } from '../firebase'
import { collection, setDoc, doc } from "firebase/firestore"
const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {

    const[currentUser, setCurrentUser] = useState()
    const[loading, setLoading] = useState(true)

    const usersCollectionRef = collection(db, "users")

    function signUp(email, password) {
        return auth.createUserWithEmailAndPassword(email, password).then(
            async function createUserDb(userCredentials) {
                console.log(userCredentials.user.uid);
                await setDoc(doc(db, "users", userCredentials.user.uid), {myList: []})
    })
    }

    function signIn(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logOut(email, password) {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
      }
    
    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    function deleteUser(currUser) {
        return currUser.delete()
    }

    function googleAuth(provider) {

        return firebase
            .auth()
            .signInWithPopup(provider)
            .then(async function createUserDb(userCredentials) {
                if(userCredentials.additionalUserInfo.isNewUser) {
                    await setDoc(doc(db, "users", userCredentials.user.uid), {myList: []},{ merge: true })
                } 
                })
    }

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signUp,
        signIn,
        logOut,
        resetPassword,
        updatePassword,
        deleteUser,
        googleAuth
    }

    return (
        <AuthContext.Provider value={value} >
            {!loading && children}
        </AuthContext.Provider>
    )
}


            // .then((res) => {
            //     return res.user;
                
            // })
            // .catch((er) => {
            //     return er;
            // })