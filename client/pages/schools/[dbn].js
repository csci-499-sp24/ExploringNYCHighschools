import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Card from "../../components/Card";
import CardSquare from "../../components/CardSquare";
import SchoolButton from "../../components/SchoolButton";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { auth, firestore } from '../../firebase/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

function SchoolProfile() {
    const router = useRouter();
    const { dbn } = router.query;
    const [school, setSchool] = useState([]);
    const [message, setMessage] = useState("Loading");
    const [favorite, setFavorite] = useState(false);
    const [signedIn, setSignedIn] = useState(false);

    useEffect(() => {
        if (dbn) {
            fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/api/schools/${dbn}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.school) {
                        setSchool(data.school);
                        setMessage(data.message);
                    } else {
                        setMessage("School data not found!");
                    }
                });
        }
    }, [dbn]);

    const handleGetDirections = (address) => {
        router.push({
            pathname: '/NYCMap',
            query: { address },
        });
    };
    
    useEffect(() => {
      checkForUserSignedIn();
      checkFavoriteDatabase();
    },[school.dbn]);
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
                    const found = favoriteSchools.includes(school.dbn);
                    setFavorite(found);
                }
                else{
                    setFavorite(false);
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
                  const updateFavoriteSchools = favoriteSchools.filter(schoolDbn=>schoolDbn!==school.dbn);
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
                      await updateDoc(userRef, {favoriteSchools:[school.dbn]});
                  }
                  else {
                      await updateDoc(userRef, {favoriteSchools: [...userData.favoriteSchools, school.dbn]});
                  }
              }
          }
          setFavorite(true);
      }
  };

    return (
        <div className="background-color">
            <section id="hero">
                <div className="container">
                {signedIn && 
                        <button className="favorite-button-school-page" onClick={()=>handleFavoriteToggle()}>
                            {favorite ?  <FaHeart style={{color:"red"}} /> :  <FaRegHeart />}
                        </button>
                }
                    <div className="row">
                        <h1 className="display-1">{school.school_name}</h1>
                        <p className="desc">{school.description}</p>
                    </div>
                </div>
                <div className="school-wrapper-container">
                    <div className="d-flex flex-row bd-highlight mb-3 justify-content-center">
                        <div className="p-2 border flex-fill bd-highlight" >
                            <Card data={school} showImg={true}></Card>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                <div className="school-button">
                    <div className="col-auto">
                        <SchoolButton text={"Get Directions"} onClick={() => handleGetDirections(school.address)}></SchoolButton>
                        <SchoolButton
                          link={`/schools/quality-reports/${school.dbn}`}
                          text={"Go to School Quality Report"}
                        ></SchoolButton>
                    </div>
                </div>
                </div>
                <div className="row">
                    <div className="d-flex flex-row bd-highlight mb-3 justify-content-center">
                        <div className="p-2 bd-highlight">
                            <CardSquare text1={"Languages"} text2={school.languages} ></CardSquare>
                        </div>
                        <div className="p-2 bd-highlight">
                            <CardSquare text1={"AP Courses"} text2={school.ap_classes} ></CardSquare>
                        </div>
                        <div className="p-2 bd-highlight">
                            <CardSquare text1={"Graduation Rate"} text2={school.grad_rate} ></CardSquare>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="d-flex flex-row bd-highlight mb-3 justify-content-center">
                        <div className="p-2 bd-highlight">
                            <CardSquare text1={"Subway"} text2={school.subways_to_school} ></CardSquare>
                        </div>
                        <div className="p-2 bd-highlight">
                            <CardSquare text1={"Buses"} text2={school.bus_to_school} ></CardSquare>
                        </div>
                        <div className="p-2 bd-highlight">
                            <CardSquare text1={"Grade Span"} text2={school.grad_span} ></CardSquare>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="d-flex flex-row bd-highlight mb-3 justify-content-center">
                        <div className="p-2 bd-highlight">
                            <CardSquare text1={"Total Students"} text2={school.total_students} ></CardSquare>
                        </div>
                        <div className="p-2 bd-highlight">
                            <CardSquare text1={"Freshman Schedule"} text2={school.freshman_schedule} ></CardSquare>
                        </div>
                        <div className="p-2 bd-highlight">
                            <CardSquare text1={"PSAL Boys"} text2={school.psal_boys} ></CardSquare>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="d-flex flex-row bd-highlight mb-3 justify-content-center">
                        <div className="p-2 bd-highlight">
                            <CardSquare text1={"PSAL Girls"} text2={school.psal_girls} ></CardSquare>
                        </div>
                        <div className="p-2 bd-highlight">
                            <CardSquare text1={"Attendance Rate"} text2={school.attendance_rate} ></CardSquare>
                        </div>
                        <div className="p-2 bd-highlight">
                            <CardSquare text1={"School Safety"} text2={school.student_safety} ></CardSquare>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SchoolProfile;
