import React from "react";
import Link from "next/link";
import Image from "next/image";

const FAQPage = () => {
  return (
    <div>
      <section id="section1" className="about-section">
        <div className="image left">
          <Image
            src="/hsp.jpg"
            alt="Image 1"
            layout="fill"
            objectFit="cover"
            className="image-inner"
          />
        </div>
        <div className="text-container right">
          <div className="text">
            <h1>What is this site for?</h1>
            <p>
              ExploringNYCHighSchools is a platform dedicated to assisting
              visitors in finding a high school that aligns with their specific
              needs. By leveraging data sourced from NYC OpenData, our website
              offers users a seamless experience to access comprehensive
              information about high schools across New York City.
            </p>
          </div>
        </div>
      </section>
      <section id="section2" className="about-section">
        <div className="image right">
          <Image
            src="/hsl.jpg"
            alt="Image 2"
            layout="fill"
            objectFit="cover"
            className="image-inner"
          />
        </div>
        <div className="text-container left">
          <div className="text">
            <h1>How to navigate the site?</h1>
            <p>
              There are several ways this site can help users explore schools.
              Visitors can:
            </p>
            <div className="list-of-contents">
              <ul>
                <li>
                  <a href="#section3">Search and filter for a school</a>
                </li>
                <li>
                  <a href="#section4">Compare two schools metrics</a>
                </li>
                <li>
                  <a href="#section5">Directions to school</a>
                </li>
                <li>
                  <a href="#section6">Rankings of schools</a>
                </li>
                <li>
                  <a href="#section7">Recommend you a school</a>
                </li>
              </ul>
              Create an account and login for more functionalities.
            </div>
          </div>
        </div>
      </section>
      <section id="section3" className="about-section">
        <div className="image left">
          <Image
            src="/hs8.jpg"
            alt="Image 3"
            layout="fill"
            objectFit="cover"
            className="image-inner"
          />
        </div>
        <div className="text-container right">
          <div className="text">
            <h1>Search for schools</h1>
            <p>
              Search for a school by filtering through various criteria such as
              location, language, sports, and programing offerings. Refine your
              search results to find the ideal school tailored to your specific
              preferences and requirements.
            </p>
            <p>
              <Link href="/schools">Search for schools</Link>
            </p>
          </div>
        </div>
      </section>
      <section id="section4" className="about-section">
        <div className="image right">
          <Image
            src="/hs6.jpg"
            alt="Image 4"
            layout="fill"
            objectFit="cover"
            className="image-inner"
          />
        </div>
        <div className="text-container left">
          <div className="text">
            <h1>Comparing schools</h1>
            <p>
              Compare schools based on key metrics such as academic performance,
              extracurricular offerings, and student satisfaction ratings. Gain
              insights into each school&apos;s strengths and weaknesses,
              allowing you to make informed decisions about your educational
              journey.
            </p>
            <p>
              <Link href="/compare">Compare schools</Link>
            </p>
          </div>
        </div>
      </section>
      <section id="section5" className="about-section">
        <div className="image left">
          <Image
            src="/hs7.jpg"
            alt="Image 1"
            layout="fill"
            objectFit="cover"
            className="image-inner"
          />
        </div>
        <div className="text-container right">
          <div className="text">
            <h1>Get directions</h1>
            <p>
              Access detailed directions to your selected schools, ensuring a
              seamless journey from your current location. Easily navigate to
              your desired educational institutions with step-by-step directions
              tailored to your preferred mode of transportation.
            </p>
            <p>
              <Link href="/NYCMap">Take me to directions page</Link>
            </p>
          </div>
        </div>
      </section>
      <section id="section6" className="about-section">
        <div className="image right">
          <Image
            src="/hs5.jpg"
            alt="Image 1"
            layout="fill"
            objectFit="cover"
            className="image-inner"
          />
        </div>
        <div className="text-container right">
          <div className="text">
            <h1>Schools rankings</h1>
            <p>
              Explore comprehensive school rankings based on factors like
              academic excellence, faculty qualifications, and student
              achievement. Discover top-performing schools in your area,
              empowering you to make informed decisions about your educational
              goals.
            </p>
            <p>
              <Link href="/ranking">See school rankings</Link>
            </p>
          </div>
        </div>
      </section>
      <section id="section7" className="about-section">
        <div className="image left">
          <Image
            src="/hs9.jpg"
            alt="Image 1"
            layout="fill"
            objectFit="cover"
            className="image-inner"
          />
        </div>
        <div className="text-container right">
          <div className="text">
            <h1>Recommend school</h1>
            <p>
              Receive personalized school recommendations based on your unique
              interests, academic goals, and location. Find the perfect
              educational fit tailored to your needs, ensuring a fulfilling and
              successful academic journey.
            </p>
            <p>
              <Link href="/recommendschool">Recommend me a school</Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
