const Homepage = () => {
  return (
    <div className="background-color"
        style={{
          minHeight: "100vh",
          color: "#333",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "60px",
            padding: "20px",
          }}
        >
          <h1 style={{ margin: "0" }}>
            <span>Explore NYC High Schools</span>
          </h1>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "40px",
          }}
        >
          <div style={{ flex: "1", paddingRight: "20px" }}>
            <h2>Our Mission</h2>
            <p>
              We want to provide comprehensive information and resources to help
              students and families navigate the diverse landscape of NYC high
              schools. We strive to empower students and parents in making
              informed decisions about their education and future.
            </p>
            <p>
              Parents deserve to have faith in the education system that their
              children will spend their childhood and teenage years in. Their
              futures in college, and later in the workplace, will be shaped by
              the experiences, challenges, and successes that they met
              throughout their time in high school.
            </p>
            <p>
              In essence, our commitment extends far beyond mere information
              dissemination; it's about fostering trust and confidence in the
              educational journey of each student. By providing a robust
              framework of support and guidance, we aim to equip parents and
              students alike with the tools they need to navigate the
              complexities of the educational landscape. As pillars of the
              community, we recognize the profound impact that a nurturing and
              enriching high school experience can have on shaping not just
              academic success, but also personal growth and fulfillment.
              Together, let us embark on this journey of empowerment, ensuring
              that every student's path through high school is illuminated with
              opportunity, possibility, and the unwavering belief in a brighter
              future.
            </p>
          </div>
          <div style={{ flex: "1", paddingLeft: "20px" }}>
            <img
              src="./mother-and-daughter.jpg"
              alt="mother and daughter together"
              style={{ maxWidth: "80%", height: "auto" }}
            />
          </div>
        </div>
      </div>
  );
};

export default Homepage;
