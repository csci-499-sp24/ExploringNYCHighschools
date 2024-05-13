import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { GoogleMap, InfoWindowF, LoadScript, MarkerF } from '@react-google-maps/api';
import SchoolButton from '@/components/SchoolButton';
import Card from '@/components/Card';
import useUserDetails from '@/components/useUserDetails';
import MapSearchBar from '@/components/MapSearchBar';

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
  const { userDetails, error } = useUserDetails();
  const [userAddressPosition, setUserAddressPosition] = useState(null);

  const selectedSchoolIcon = isLoaded
  ? {
      url: 'https://maps.google.com/mapfiles/ms/micons/blue-dot.png',
      scaledSize: new window.google.maps.Size(40, 40),
    }
  : null;

  const houseIcon = isLoaded
    ? {
        url: 'house-icon.png',
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

  useEffect(() => {
    if (isLoaded && userDetails) {
      const { address, city, zipcode, state } = userDetails;
      const fullAddress = `${address}, ${city}, ${state} ${zipcode}`;
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: fullAddress }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const { lat, lng } = results[0].geometry.location;
          setUserAddressPosition({ lat: lat(), lng: lng() });
        }
      });
    }
  }, [isLoaded, userDetails]);

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

  const handleSelectedMarker = (school) => {
    setSelectedMarker(school);
  };

  const getPosition = (school) => {
    const match = school.address.match(/\((-?\d+\.\d+),(-?\d+\.\d+)\)/);
    if (match) {
      const [lat, lng] = match.slice(1).map(parseFloat);
      const zoom_level = mapRef.current.getZoom();
      const offset = zoom_level >= 0.002 ? 0.001 : 0.005;
      const adjust_pos = lat + offset;
      return { lat: adjust_pos, lng };
    }
  };

  const handleGetDirections = (address) => {
    router.push({
      pathname: '/Directions',
      query: { schoolAddress: address },
    });
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <LoadScript
        googleMapsApiKey="AIzaSyDj6xBIduOFaJ_SnUOi4KKuw-FBuTgNLOU"
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
                      onClick={() => handleSelectedMarker(school)}
                    />
                  );
                }
              }
              return null;
            })}
          <MapSearchBar schools={schools} setSelectedSchool={setSelectedMarker} />
          {/* InfoWindow popups when the user clicks on a marker */}
          {selectedMarker && (
            <InfoWindowF
              position={getPosition(selectedMarker)}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div>
                <Card data={selectedMarker} showImg={true} showHeart={true}></Card>
                <div className="school-button">
                  <SchoolButton
                    text={"Get Directions"}
                    onClick={() => handleGetDirections(selectedMarker.address)}
                  />
                  <SchoolButton link={`/schools/${selectedMarker.dbn}`} />
                  <SchoolButton
                    link={`/schools/quality-reports/${selectedMarker.dbn}`}
                    text={"School Quality Report"}
                  ></SchoolButton>
                </div>
              </div>
            </InfoWindowF>
          )}
          {/* When the user clicks "Get Directions" from school profile, the InfoWindow automatically is opened when directed to the map */}
          {selectedSchool && (
            <InfoWindowF
              position={getPosition(selectedSchool)}
              onCloseClick={() => setSelectedSchool(null)}
            >
              <div>
                <Card data={selectedSchool} showImg={true} showHeart={true}></Card>
                <div className="school-button">
                  <SchoolButton link={`/schools/${selectedSchool.dbn}`} />
                  <SchoolButton
                    link={`/schools/quality-reports/${selectedSchool.dbn}`}
                    text={"School Quality Report"}
                  ></SchoolButton>
                </div>
              </div>
            </InfoWindowF>
          )}
          {userAddressPosition && (
            <MarkerF
              position={userAddressPosition}
              title="Your Address"
              icon={{
                url: 'house-icon.png',
                scaledSize: new window.google.maps.Size(40, 40),
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default NYCMap;