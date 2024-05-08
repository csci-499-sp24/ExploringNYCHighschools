import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { GoogleMap, LoadScript, MarkerF, DirectionsRenderer } from '@react-google-maps/api';

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
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh', width: '100%' }}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: '10px' }}>
        <input
          type="text"
          value={inputAddress}
          onChange={(e) => setInputAddress(e.target.value)}
          placeholder="Enter your address"
          style={{width:"300px", borderRadius:"5px", fontFamily:"Georgia, 'Times New Roman', Times, serif"}}
        />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row',justifyContent: 'center', paddingBottom:"10px" }}>
        <button className="btn btn-primary transportion-choice-button" onClick={() => handleTravelModeChange("DRIVING")} style={{ marginRight: '10px' }}>Car</button>
        <button className="btn btn-primary transportion-choice-button"onClick={() => handleTravelModeChange("TRANSIT")} style={{ marginRight: '10px' }}>Subway</button>
        <button className="btn btn-primary transportion-choice-button"onClick={() => handleTravelModeChange("WALKING")}>Walking</button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <p style={{textAlign: 'center', fontFamily:"Georgia, 'Times New Roman', Times, serif"}}>Estimated Time: {duration}</p>
      <div ref={directionsPanel} style={{overflow: 'auto' }}></div>
      </div>
      </div>
      <div style={{ flex: 2, position: 'relative' }}>
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
    </div>
  );
};

export default Directions;