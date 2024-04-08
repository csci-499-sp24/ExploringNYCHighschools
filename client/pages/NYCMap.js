import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 40.7128,
  lng: -73.9352
};

const mapStyle = [
  {
    featureType: 'administrative',
    elementType: 'labels',
    stylers: [{ visibility: 'on' }]
  },
  {
    featureType: 'landscape',
    elementType: 'all',
    stylers: [{ visibility: 'on' }]
  },
  {
    featureType: 'poi',
    elementType: 'all',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'road',
    elementType: 'all',
    stylers: [{ visibility: 'on' }]
  },
  {
    featureType: 'transit',
    elementType: 'all',
    stylers: [{ visibility: 'on' }]
  },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [{ color: '#a0d6d1' }]
  }
];

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
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const { lat, lng } = results[0].geometry.location;
          setSelectedSchool({ lat: lat(), lng: lng() });
        }
      });
    }
  }, [isLoaded, router.query]);

  const fetchSchools = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/api/schools");
      const data = await response.json();
      setSchools(data.schools);
    } catch (error) {
      console.error("Error fetching schools:", error);
    }
  };
  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <LoadScript
        googleMapsApiKey="AIzaSyC7ebZzwn5MyLSBC3bEB2N6CXCNj_YnoK4"
        onLoad={handleLoad}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={11}
          options={{ styles: mapStyle }}
        >
          {schools.map(school => (
            <MarkerF
              key={school.dbn}
              position={{ lat: parseFloat(school.latitude), lng: parseFloat(school.longitude) }}
              title={school.school_name}
            />
          ))}
          {selectedSchool && (
            <MarkerF
              position={selectedSchool}
              icon={{ url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png' }}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default NYCMap;