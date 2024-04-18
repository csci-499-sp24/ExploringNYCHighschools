import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { GoogleMap, InfoWindowF, LoadScript, MarkerF } from '@react-google-maps/api';

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
  const mapRef = useRef(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const selectedSchoolIcon = isLoaded
  ? {
      url: 'https://maps.google.com/mapfiles/ms/micons/blue-dot.png',
      scaledSize: new window.google.maps.Size(40, 40),
    }
  : null;

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

        // Zoom in on the selected school
        if (mapRef.current) {
          const match = selectedSchool.address.match(/\((-?\d+\.\d+),(-?\d+\.\d+)\)/);
          if (match) {
            const [lat, lng] = match.slice(1).map(parseFloat);
            mapRef.current.panTo({ lat, lng });
            mapRef.current.setZoom(15); // Adjust the zoom level as needed
          }
        }
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
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={11}
          onLoad={(map) => (mapRef.current = map)}
        >
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
                const match = school.address.match(/\((-?\d+\.\d+),(-?\d+\.\d+)\)/);
                if (match) {
                  const [lat, lng] = match.slice(1).map(parseFloat);
                  const isSelectedSchool =
                    selectedSchool && selectedSchool.dbn === school.dbn;
                  return (
                    <MarkerF
                      key={`${school.dbn}-${index}`}
                      position={{
                        lat,
                        lng,
                      }}
                      title={school.school_name}
                      icon={isSelectedSchool ? selectedSchoolIcon : undefined}
                      zIndex={isSelectedSchool ? 1 : 0}
                      onClick={()=>setSelectedMarker(school)}
                    />
                  );
                }
              }
              return null;
            })}
            {selectedMarker && (
              <InfoWindowF
              position={{
                lat: parseFloat(selectedMarker.lat),
                lng: parseFloat(selectedMarker.lng),
              }}
                onCloseClick={()=>setSelectedMarker(null)}
              >
                <div>
                  <h3>{selectedMarker.school_name}</h3>
                  <h4>Address: {selectedMarker.address}</h4>
                  <h4>Phone Number: {selectedMarker.phone_number}</h4>
                  <h4>Website: {selectedMarker.website}</h4>
                  <h4>Email: {selectedMarker.email}</h4>
                  {/* <h4>{selectedMarker.address}</h4> */}
                </div>
                </InfoWindowF>
            )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default NYCMap;