import React, { useState, useEffect } from "react";
import { auth, firestore } from '../firebase/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Card from '@/components/Card';
import { MdDelete } from "react-icons/md";

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

    const handleFavoriteToggle = async (data) => {
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
    };

  return (
    <div className="background-color">
        <h1 className="display-1">My Favorite Schools</h1>
        <div className="school-wrapper-container">
        {favSchoolData.length>0 ? ( 
            favSchoolData.map((item,index) => (
                <div className="d-flex flex-row bd-highlight mb-3 justify-content-center">
                    <div className="p-2 border flex-fill bd-highlight">
                        <Card data={item} showImg={true} />
                        <div className="container-delete" style={{position:"relative"}}>
                        <button className="delete-button" onClick={()=>handleFavoriteToggle(item)}>
                            <MdDelete />
                        </button>
                        </div>
                    </div>
                </div>
            ))
        ):(
            <div className="message-select-schools">
                <p> No favorited schools </p>
            </div>
        )}
    </div>
  </div>
  )
}

export default FavoriteSchools;