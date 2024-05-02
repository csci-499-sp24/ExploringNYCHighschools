import { ImNewTab } from "react-icons/im";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { auth, firestore } from '../firebase/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const Card = ({data, showImg=false, showHeart=false}) => {
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

    if(!data?.address) {
        data = { ...data, address: "Unavailable"};
    }
    if(!data?.phone_number) {
        data = { ...data, phone_number: "Unavailable"};
    }
    if(!data?.email) {
        data = { ...data, email: "Unavailable"};
    }
    if(data?.website) {
        if(!data?.website.startsWith("http")) {
          data = { ...data, website: "https://"+data.website};
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
        <div className="card-fill">
            <div className="card-body">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div>
                        <h6 className="card-title">
                            <span className="card-title-span"> School Name: </span> {data?.school_name}
                        </h6>

                        <h6 className="card-title">
                            <span className="card-title-span">Address: </span> {data?.address}
                        </h6>
                        {data?.website ? ( 
                            <h6 className="card-title">
                            <span className="card-title-span">Website: </span>
                                <a
                                href={data?.website}
                                style={{ color: "black", borderBottom: "1px solid transparent", textDecoration: "none" }}
                                onMouseOver={(e) => { e.target.style.borderBottom = "1px solid black"; }}
                                onMouseLeave={(e) => { e.target.style.borderBottom = "1px solid transparent"; }}
                                target="_blank"
                                >
                                {data?.website}
                                </a>
                                <ImNewTab />
                            </h6>
                            ) : (
                                <h6 className="card-title">
                                <span className="card-title-span">Website: Unavailable</span>
                                </h6>
                                )
                        }
                        <h6 className="card-title">
                            <span className="card-title-span">Phone Number: </span> {data?.phone_number}
                        </h6>

                        <h6 className="card-title">
                            <span className="card-title-span"> Email: </span> {data?.email}
                        </h6>
                        <h6 className="card-title">
                        </h6>
                    </div>
                    {data?.imgUrl && showImg && <img src={data.imgUrl} style={{ width: "240px", height: "190px",marginLeft: "20px", objectFit: "contain", marginRight:"20px"}} />}
                    {signedIn && showHeart &&
                        <button className="favorite-button" onClick={handleFavoriteToggle}>
                            {favorite ?  <FaHeart style={{color:"red"}} /> :  <FaRegHeart />}
                        </button>
                }
                </div>
            </div>
        </div>
    )
  };
export default Card;