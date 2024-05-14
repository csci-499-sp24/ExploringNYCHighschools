import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { GoogleMap, LoadScript, MarkerF, DirectionsRenderer } from '@react-google-maps/api';
import { FaCar, FaSubway, FaWalking } from 'react-icons/fa';
import useUserDetails from '@/components/useUserDetails';

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

const Directions = () => {
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [inputAddress, setInputAddress] = useState("");
  const [directions, setDirections] = useState(null);
  const [travelMode, setTravelMode] = useState("DRIVING");
  const [duration, setDuration] = useState(null);
  const mapRef = useRef(null);
  const directionsRendererRef = useRef(null);
  const directionsPanel = useRef(null);
  const router = useRouter();
  const { userDetails, error } = useUserDetails();

  useEffect(() => {
    fetchSchools();
  }, []);

  useEffect(() => {
    const { schoolAddress } = router.query;
    if (isLoaded && schoolAddress) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: schoolAddress }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const { lat, lng } = results[0].geometry.location;
          setSelectedSchool({ lat: lat(), lng: lng() });
        }
      });
    }
  }, [isLoaded, router.query]);

  useEffect(() => {
    if (directionsRendererRef.current) {
      directionsRendererRef.current.setMap(null);
      directionsRendererRef.current.setPanel(null);
      directionsRendererRef.current = null;
    }
    if (selectedSchool && inputAddress) {
      handleGetDirections();
    }
  }, [selectedSchool, inputAddress, travelMode]);

  useEffect(() => {
    if (userDetails) {
      const { address, city, zipcode, state } = userDetails;
      const fullAddress = `${address}, ${city}, ${state} ${zipcode}`;
      setInputAddress(fullAddress);
    }
  }, [userDetails]);

  const fetchSchools = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/api/schools");
      const data = await response.json();
      setSchools(data.schools);
    } catch (error) {
      console.error("Error fetching schools:", error);
    }
  };

  const handleLoad = (map) => {
    mapRef.current = map;
    setIsLoaded(true);
  };

  const handleGetDirections = () => {
    if (selectedSchool && inputAddress) {
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer({
        map: mapRef.current,
        panel: directionsPanel.current,
        polylineOptions: {
          strokeColor: travelMode === "DRIVING" ? "blue" : travelMode === "TRANSIT" ? "green" : "red",
        },
      });
      directionsRendererRef.current = directionsRenderer;

      const request = {
        origin: inputAddress,
        destination: selectedSchool,
        travelMode: travelMode,
      };

      directionsService.route(request, (result, status) => {
        if (status === "OK") {
          setDirections(result);
          directionsRenderer.setDirections(result);
          const leg = result.routes[0].legs[0];
          setDuration(leg.duration.text);
        }
      });
    }
  };

  const handleTravelModeChange = (mode) => {
    setTravelMode(mode);
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <input
          type="text"
          value={inputAddress}
          onChange={(e) => setInputAddress(e.target.value)}
          placeholder="Enter your address"
          style={{ flex: 1, padding: '8px', fontSize: '16px' }}
        />
        <button onClick={() => handleTravelModeChange("DRIVING")} style={{ marginLeft: '10px' }}>
          <FaCar size={24} />
        </button>
        <button onClick={() => handleTravelModeChange("TRANSIT")} style={{ marginLeft: '10px' }}>
          <FaSubway size={24} />
        </button>
        <button onClick={() => handleTravelModeChange("WALKING")} style={{ marginLeft: '10px' }}>
          <FaWalking size={24} />
        </button>
      </div>
      {inputAddress && (
        <>
          <div style={{ marginBottom: '10px' }}>
            <p>Estimated Time: {duration}</p>
          </div>
          <div
            ref={directionsPanel}
            style={{
              height: '200px',
              overflow: 'auto',
              border: '1px solid #ccc',
              padding: '10px',
              marginBottom: '10px',
            }}
          ></div>
        </>
      )}
      <LoadScript
        googleMapsApiKey="AIzaSyDj6xBIduOFaJ_SnUOi4KKuw-FBuTgNLOU"
        onLoad={() => setIsLoaded(true)}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={11}
          options={{ styles: mapStyle }}
          onLoad={handleLoad}
        >
          {schools.map(school => (
            <MarkerF
              key={school.dbn}
              position={{
                lat: parseFloat(school.latitude),
                lng: parseFloat(school.longitude)
              }}
              title={school.school_name}
            />
          ))}
          {selectedSchool && (
            <MarkerF
              position={selectedSchool}
              icon={{
                url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Directions;