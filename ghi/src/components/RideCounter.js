import React, { useState, useEffect } from 'react';

const RideCounter = () => {
  const [rides, setRides] = useState([]);
  const [rideCount, setRideCount] = useState(0);

  const loadRides = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/rides/`;
    const response = await fetch(url);
    if (!response.ok) {
      console.log("error with fetch");
    } else {
      const rideData = await response.json();
      setRides(rideData);
    }
  };
  useEffect(() => {
    loadRides();
  }, []);
  useEffect(() => {
    const count = rides.filter(ride => ride.ride_status === "Completed").length;
    setRideCount(count);
  }, [rides]);

  return (
    <div>
      <div>Completed Rides: {rideCount}</div>
    </div>
  );
};

export default RideCounter;
