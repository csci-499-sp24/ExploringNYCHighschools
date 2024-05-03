import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { auth, firestore } from '../firebase/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useState, useEffect } from "react";

const Favorite = ({data}) => {
    const [favorite, setFavorite] = useState(false);
    const [signedIn, setSignedIn] = useState(false);

    useEffect(() => {
        checkFavoriteDatabase();
        checkForUserSignedIn();
    },[data]);
    const checkForUserSignedIn = async () => {
        const currentUser = auth.currentUser;
        if(currentUser) {
            setSignedIn(true);
        }
    }
    const checkFavoriteDatabase = async () => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const userId = currentUser.uid;
            const userRef = doc(firestore, "users", userId);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const {favoriteSchools} = userDoc.data();
                if(favoriteSchools) {
                    const found = favoriteSchools.includes(data?.dbn);
                    setFavorite(found);
                }
                else{
                    const found = false;
                    setFavorite(found);
                }
            }
        }
    }
    const handleFavoriteToggle = async () => {
        if (favorite) {
            const currentUser = auth.currentUser;
        if (currentUser) {
            const userId = currentUser.uid;
            const userRef = doc(firestore, "users", userId);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const {favoriteSchools} = userDoc.data();
                if(favoriteSchools) {
                    const updateFavoriteSchools = favoriteSchools.filter(schoolDbn=>schoolDbn!==data?.dbn);
                    await updateDoc(userRef, {favoriteSchools: updateFavoriteSchools});
                 }
            }
        }
            setFavorite(false);
        } else {
            const currentUser = auth.currentUser;
            if (currentUser) {
                const userId = currentUser.uid;
                const userRef = doc(firestore, "users", userId);
                const userDoc = await getDoc(userRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    if(!userData.favoriteSchools) {
                        await updateDoc(userRef, {favoriteSchools:[data?.dbn]});
                    }
                    else {
                        await updateDoc(userRef, {favoriteSchools: [...userData.favoriteSchools, data?.dbn]});
                    }
                }
            }
            setFavorite(true);
        }
    };
    return (
    <div>
        {signedIn && 
            <button className="favorite-button" onClick={handleFavoriteToggle}>
                {favorite ?  <FaHeart style={{color:"red"}} /> :  <FaRegHeart />}
            </button>
    }
    </div>
    )
}
export default Favorite;