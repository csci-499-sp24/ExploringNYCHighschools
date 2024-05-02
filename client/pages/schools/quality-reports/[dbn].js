import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CardSquare from "../../../components/CardSquare";
import SchoolButton from "../../../components/SchoolButton";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { auth, firestore } from '../../../firebase/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';


function SchoolQualityReport() {
    const router = useRouter();
    const { dbn } = router.query;
    const [school, setSchool] = useState([]);
    const[message, setMessage] = useState("Loading");
    const [favorite, setFavorite] = useState(false);
    const [signedIn, setSignedIn] = useState(false);
    

    useEffect(() => {
        if (dbn) {
            fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/api/schools/quality-reports/${dbn}`)
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

    if (message!="School data not found!") {
        return (
            <div className="background-color">
            <section id="quality-reports">
                <div className="container">
                {signedIn && 
                        <button className="favorite-button-school-page" onClick={()=>handleFavoriteToggle()}>
                            {favorite ?  <FaHeart style={{color:"red"}} /> :  <FaRegHeart />}
                        </button>
                }
                    <div className="row">
                        <h1 className="display-1">{school.school_name}</h1>
                        <p className="desc">What is a School Quality Report?</p>
                            <p className="desc">
                                The Department of Education gathers data to provide families with a more
                                informed look into their children&apos;s school qualty and help families make a more
                                informed choice for their child&apos;s future school. The following data below
                                is drawn from mutiple sources: formal school visits, student feedback, teacher
                                feedback, feedback from parents who have taken the NYC School survey, and data from
                                student achievements such as exams.
                            </p>
                    </div>
                </div>
                <div className="school-button">
                    <div className="col-auto">
                        <SchoolButton link={`/schools/${school.dbn}`} />
                    </div>
                </div>
                    <div className="row">
                        <div className="d-flex flex-row bd-highlight mb-3 justify-content-center">
                            <div className="p-2 bd-highlight">
                                <CardSquare text1={"Rigorous Instruction Rating"} text2={school.rigorous_instruction_rating} ></CardSquare>
                            </div>
                            <div className="p-2 bd-highlight">
                                <CardSquare text1={"Collaborative Teachers Rating"} text2={school.collaborative_teachers_rating} ></CardSquare>
                            </div>
                            <div className="p-2 bd-highlight">
                                <CardSquare text1={"Supportive Environment Rating"} text2={school.supportive_env_rating} ></CardSquare>
                            </div>
                        </div>     
                    </div>
                    <div className="row">
                        <div className="d-flex flex-row bd-highlight mb-3 justify-content-center">
                            <div className="p-2 bd-highlight">
                                <CardSquare text1={"Effective School Leadership"} text2={school.effective_school_leadership} ></CardSquare>
                            </div>
                            <div className="p-2 bd-highlight">
                                <CardSquare text1={"Student Achievement Rating"} text2={school.student_achievement_rating} ></CardSquare>
                            </div>
                            <div className="p-2 bd-highlight">
                                <CardSquare text1={"Trust Rating"} text2={school.trust_rating} ></CardSquare>
                            </div>
                        </div>     
                    </div>
                    <div className="row">
                        <div className="d-flex flex-row bd-highlight mb-3 justify-content-center">
                            <div className="p-2 bd-highlight">
                                <CardSquare text1={"Quality Review: How interesting and challenging is the curriculum?"} text2={school.interesting_and_challenging} ></CardSquare>
                            </div>
                            <div className="p-2 bd-highlight">
                                <CardSquare text1={"Quality Review: How effective is the teaching and learning?"} text2={school.effective_teaching_learning} ></CardSquare>
                            </div>
                            <div className="p-2 bd-highlight">
                                <CardSquare text1={"Quality Review: How well does the school assess what students are learning?"} text2={school.school_access_student_learning} ></CardSquare>
                            </div>
                        </div>     
                    </div>
                    <div className="row">
                        <div className="d-flex flex-row bd-highlight mb-3 justify-content-center">
                            <div className="p-2 bd-highlight">
                                <CardSquare text1={"Quality Review: How clearly are high expectations communicated to students and staff?"} text2={school.high_expectations_communnicated} ></CardSquare>
                            </div>
                            <div className="p-2 bd-highlight">
                                <CardSquare text1={"Quality Review: How well do teachers work with each other?"} text2={school.teacher_collab} ></CardSquare>
                            </div>
                            <div className="p-2 bd-highlight">
                                <CardSquare text1={"Quality Review: How safe and inclusive is the school while supporting social-emotional growth?"} text2={school.safe_inclusive} ></CardSquare>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="d-flex flex-row bd-highlight mb-3 justify-content-center">
                            <div className="p-2 bd-highlight">
                                <CardSquare text1={"Quality Review: How well does the school identify, track, and meet its goals?"} text2={school.track_and_meet_goals} ></CardSquare>
                            </div>
                            <div className="p-2 bd-highlight">
                                <CardSquare text1={"Quality Review: How thoughful is the school's approach to teacher development and evaluation?"} text2={school.teacher_development_eval} ></CardSquare>
                            </div>
                            <div className="p-2 bd-highlight">
                                <CardSquare text1={"English Language Learners"} text2={school.english_lang_learners} ></CardSquare>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="d-flex flex-row bd-highlight mb-3 justify-content-center">
                            <div className="p-2 bd-highlight">
                                <CardSquare text1={"Students with Disabilities"} text2={school.students_disabilities} ></CardSquare>
                            </div>
                            <div className="p-2 bd-highlight">
                                <CardSquare text1={"Quality Review: How safe and inclusive is the school while supporting social-emotional growth?"} text2={school.safe_inclusive} ></CardSquare>
                            </div>
                            <div className="p-2 bd-highlight">
                                <CardSquare text1={"Economic Need Index"} text2={school.economic_need} ></CardSquare>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="d-flex flex-row bd-highlight mb-3 justify-content-center">
                            <div className="p-2 bd-highlight">
                                <CardSquare text1={"Percent of student body: Asian"} text2={school.asian} ></CardSquare>
                            </div>
                            <div className="p-2 bd-highlight">
                                <CardSquare text1={"Percent of student body: Black"} text2={school.black} ></CardSquare>
                            </div>
                            <div className="p-2 bd-highlight">
                                <CardSquare text1={"Percent of student body: Hispanic"} text2={school.hispanic} ></CardSquare>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="d-flex flex-row bd-highlight mb-3 justify-content-center">
                            <div className="p-2 bd-highlight">
                                <CardSquare text1={"Percent of student body: White"} text2={school.white} ></CardSquare>
                            </div>
                            <div className="p-2 bd-highlight">
                                <CardSquare text1={"Principal's number of years of experience"} text2={school.principal_yr_experience} ></CardSquare>
                            </div>
                            <div className="p-2 bd-highlight">
                                <CardSquare text1={"Teachers with at least 3 years of experience"} text2={school.teachers_3yr_experience} ></CardSquare>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="d-flex flex-row bd-highlight mb-3 justify-content-center">
                            <div className="p-2 bd-highlight">
                                <CardSquare text1={"Chronically Absent Students"} text2={school.chronically_absent_stu} ></CardSquare>
                            </div>
                            <div className="p-2 bd-highlight">
                                <CardSquare text1={"Teacher Attendance Rate"} text2={school.teacher_attendance_rate} ></CardSquare>
                            </div>
                            <div className="p-2 bd-highlight">
                                <CardSquare text1={"Strong Family Community Ties"} text2={school.family_community_ties} ></CardSquare>
                            </div>
                        </div>     
                    </div>
            </section>
            </div>
        )
        }
        else {
            return(
                <div className="message-not-found">
                    <p>The school does not currently have a school quality report.</p>
                </div>
            )
        }
}

export default SchoolQualityReport;



