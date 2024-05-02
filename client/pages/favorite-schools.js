import React, { useState, useEffect } from "react";
import { auth, firestore } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

function FavoriteSchools() {
    const [favSchools, setFavSchools] = useState([]);
    const [favSchoolData, setFavSchoolData] = useState([]);
    useEffect(() => {
        checkFavoriteDatabase();
    },[favSchools]);
    const checkFavoriteDatabase = async () => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const userId = currentUser.uid;
            const userRef = doc(firestore, "users", userId);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const {favoriteSchools} = userDoc.data();
                if(favoriteSchools) {
                    setFavSchools(favoriteSchools);
                }
                else{
                    setFavSchools([]);
                }
            }
        }
    }
    useEffect(() => {
        const fetchFavSchools = async () => {
            const promise = favSchools.map(async (favSchool) => {
                const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/api/schools/${favSchool}`);
                const data = await response.json();
                return data.school;
            });
            const schools = await Promise.all(promise);
            setFavSchoolData(schools);
        };
        fetchFavSchools();
    }, [favSchools]);
  return (
    <div>
    {favSchoolData.length>0 ? ( 
        favSchoolData.map((item,index) => (
            <p key={index}>{item.school_name}</p>
        ))
    ):(
        <p> No favorited schools </p>
    )}
  </div>
  )
}

export default FavoriteSchools;