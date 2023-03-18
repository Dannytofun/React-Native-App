import {React, useState} from 'react';
import {db} from '../Firebase/firebase-config.js'
import {collection, doc, setDoc, addDoc, getDoc,  query, where, onSnapshot, getDocs} from "firebase/firestore"; 


export const writeDoc = (collectionId, docId, data) => {
    const Ref = doc(db,collectionId,docId);
    setDoc(Ref, data, {merge : true})
}

export const readDoc = (collectionId ,docId) => {
    const Ref = doc(db,collectionId,docId);
    return getDoc(Ref)
}

export const queryDoc = (collectionId, variable, operator, condition) => {
    const q = query(collection(db, collectionId), where(variable, operator, condition));
    const [data,setData] = useState();
    onSnapshot(q, (snapshot) => {
        const subdata = [];
        snapshot.forEach((doc) => subdata.push(doc.data()))
        setData(subdata);
    });
    return data;
}