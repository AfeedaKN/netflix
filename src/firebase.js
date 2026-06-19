import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyD5opcmWqIW8AZL7htUJz2JlTRwMqtvgls",
  authDomain: "netflix-clone-2a602.firebaseapp.com",
  projectId: "netflix-clone-2a602",
  storageBucket: "netflix-clone-2a602.firebasestorage.app",
  messagingSenderId: "1005692613867",
  appId: "1:1005692613867:web:29ae9b61b8d00bd389faae"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore(app)

const signUp = async (name,email,password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db,"user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    }catch(error){
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const login = async(email,password)=>{
    try{
        await signInWithEmailAndPassword(auth,email,password);
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signUp, logout};