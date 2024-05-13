import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Card from "../../components/Card";
import CardSquare from "../../components/CardSquare";
import SchoolButton from "../../components/SchoolButton";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../firebase/firebaseConfig";
import { collection, addDoc, query, where, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import Favorite from "@/components/Favorite";
import useUserDetails from "../../components/useUserDetails";

function SchoolProfile() {
  const router = useRouter();
  const { dbn } = router.query;
  const [user] = useAuthState(auth);
  const { userDetails, error } = useUserDetails();
  const [school, setSchool] = useState([]);
  const [message, setMessage] = useState("Loading");
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    if (dbn) {
      fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/api/schools/${dbn}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.school) {
            setSchool(data.school);
            setMessage(data.message);
            fetchReviews(dbn); // Fetch reviews for the school
          } else {
            setMessage("School data not found!");
          }
        });
    }
  }, [dbn]);

  const handleGetDirections = (address) => {
    router.push({
      pathname: "/Directions",
      query: { schoolAddress: address },
    });
  };

  const fetchReviews = async (schoolDbn) => {
    try {
      const reviewsRef = collection(firestore, "schools", schoolDbn, "reviews");
      const querySnapshot = await getDocs(reviewsRef);
      const reviewsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Fetched reviews:", reviewsData);
      setReviews(reviewsData);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleReviewSubmit = async () => {
    if (user && newReview.trim() !== "") {
      try {
        const reviewsRef = collection(firestore, "schools", dbn, "reviews");
        const userReviewQuery = query(
          reviewsRef,
          where("userId", "==", user.uid)
        );
        const userReviewSnapshot = await getDocs(userReviewQuery);

        if (userReviewSnapshot.empty) {
          await addDoc(reviewsRef, {
            review: newReview,
            userId: user.uid,
            fullName: userDetails?.fullName || "Anonymous",
            timestamp: new Date(),
          });
          console.log("Review submitted successfully");
        } else {
          const reviewId = userReviewSnapshot.docs[0].id;
          await updateDoc(doc(reviewsRef, reviewId), {
            review: newReview,
            fullName: userDetails?.fullName || "Anonymous",
            timestamp: new Date(),
          });
          console.log("Review updated successfully");
        }

        setNewReview("");
        fetchReviews(dbn);
      } catch (error) {
        console.error("Error submitting/updating review:", error);
      }
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (user) {
      try {
        const reviewRef = doc(firestore, "schools", dbn, "reviews", reviewId);
        await deleteDoc(reviewRef);
        console.log("Review deleted successfully");
        fetchReviews(dbn);
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    }
  };

  return (
    <div className="background-color">
      <section id="hero">
        <div className="container">
          <div className="favorite-button-school-page">
            <Favorite data={school} />
          </div>
          <div className="row">
            <h1 className="display-1">{school.school_name}</h1>
            <p className="desc">{school.description}</p>
          </div>
        </div>
        <div className="school-wrapper-container">
          <div className="d-flex flex-row bd-highlight mb-3 justify-content-center">
            <div className="p-2 border flex-fill bd-highlight">
              <Card data={school} showImg={true}></Card>
              <div className="reviews-container">
                <div className="reviews">
                  <h4>Reviews:</h4>
                  {reviews.map((review) => (
                    <p key={review.id}>
                      <strong>{review.fullName}: </strong>
                      {review.review}
                      {user && review.userId === user.uid && (
                        <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
                      )}
                    </p>
                  ))}
                </div>
                {user && (
                  <div className="review-input">
                    <textarea
                      value={newReview}
                      onChange={(e) => setNewReview(e.target.value)}
                      placeholder="Write a review..."
                    />
                    <button onClick={handleReviewSubmit}>Submit Review</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="school-button">
            <div className="col-auto">
              <SchoolButton
                text={"Get Directions"}
                onClick={() => handleGetDirections(school.address)}
              ></SchoolButton>
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
              <CardSquare
                text1={"Languages"}
                text2={school.languages}
              ></CardSquare>
            </div>
            <div className="p-2 bd-highlight">
              <CardSquare
                text1={"AP Courses"}
                text2={school.ap_classes}
              ></CardSquare>
            </div>
            <div className="p-2 bd-highlight">
              <CardSquare
                text1={"Graduation Rate"}
                text2={school.grad_rate}
              ></CardSquare>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="d-flex flex-row bd-highlight mb-3 justify-content-center">
            <div className="p-2 bd-highlight">
              <CardSquare
                text1={"Subway"}
                text2={school.subways_to_school}
              ></CardSquare>
            </div>
            <div className="p-2 bd-highlight">
              <CardSquare
                text1={"Buses"}
                text2={school.bus_to_school}
              ></CardSquare>
            </div>
            <div className="p-2 bd-highlight">
              <CardSquare
                text1={"Grade Span"}
                text2={school.grad_span}
              ></CardSquare>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="d-flex flex-row bd-highlight mb-3 justify-content-center">
            <div className="p-2 bd-highlight">
              <CardSquare
                text1={"Total Students"}
                text2={school.total_students}
              ></CardSquare>
            </div>
            <div className="p-2 bd-highlight">
              <CardSquare
                text1={"Freshman Schedule"}
                text2={school.freshman_schedule}
              ></CardSquare>
            </div>
            <div className="p-2 bd-highlight">
              <CardSquare
                text1={"PSAL Boys"}
                text2={school.psal_boys}
              ></CardSquare>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="d-flex flex-row bd-highlight mb-3 justify-content-center">
            <div className="p-2 bd-highlight">
              <CardSquare
                text1={"PSAL Girls"}
                text2={school.psal_girls}
              ></CardSquare>
            </div>
            <div className="p-2 bd-highlight">
              <CardSquare
                text1={"Attendance Rate"}
                text2={school.attendance_rate}
              ></CardSquare>
            </div>
            <div className="p-2 bd-highlight">
              <CardSquare
                text1={"School Safety"}
                text2={school.student_safety}
              ></CardSquare>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SchoolProfile;