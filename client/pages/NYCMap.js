import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 40.7128,
  lng: -73.9352,
};

const NYCMap = () => {
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchSchools();
  }, []);

  useEffect(() => {
    const { address } = router.query;
    if (isLoaded && address) {
      const selectedSchool = schools.find((school) =>
        school.address && typeof school.address === 'string'
          ? school.address.toLowerCase().includes(address.toLowerCase())
          : false
      );
      if (selectedSchool) {
        setSelectedSchool(selectedSchool);
        console.log('Selected School:', selectedSchool);
      }
    }
  }, [isLoaded, router.query, schools]);

  const fetchSchools = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_SERVER_URL + '/api/schools'
      );
      const data = await response.json();
      console.log('Fetched School Data:', data);
      setSchools(data.schools);
    } catch (error) {
      console.error('Error fetching schools:', error);
    }
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <LoadScript
        googleMapsApiKey="AIzaSyC7ebZzwn5MyLSBC3bEB2N6CXCNj_YnoK4"
        onLoad={() => setIsLoaded(true)}
      >
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={11}>
          {console.log('Rendering schools:', schools)}
          {isLoaded && schools.length === 0 && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '5px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
              }}
            >
              <h3>No schools found.</h3>
              <p>Please check the API endpoint or the database.</p>
            </div>
          )}
          {isLoaded &&
            schools.length > 0 &&
            schools.map((school, index) => {
              if (school.address && typeof school.address === 'string') {
                const match = school.address.match(
                  /\((-?\d+\.\d+),(-?\d+\.\d+)\)/
                );
                if (match) {
                  const [lat, lng] = match.slice(1).map(parseFloat);
                  return (
                    <MarkerF
                      key={`${school.dbn}-${index}`}
                      position={{
                        lat,
                        lng,
                      }}
                      title={school.school_name}
                    />
                  );
                }
              }
              return null;
            })}
          {isLoaded &&
            selectedSchool &&
            selectedSchool.address &&
            typeof selectedSchool.address === 'string' &&
            (() => {
              const match = selectedSchool.address.match(
                /\((-?\d+\.\d+),(-?\d+\.\d+)\)/
              );
              if (match) {
                const [lat, lng] = match.slice(1).map(parseFloat);
                return (
                  <MarkerF
                    position={{
                      lat,
                      lng,
                    }}
                    icon={{
                      url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
                      scaledSize: new window.google.maps.Size(40, 40),
                    }}
                  />
                );
              }
              return null;
            })()}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default NYCMap;