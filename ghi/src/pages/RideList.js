import { useState, useEffect } from "react";

const RideList = ({ userData }) => {
  const [rides, setRides] = useState([]);
  const [hasClaimedRide, setHasClaimedRide] = useState(false);

  const loadRides = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/rides/`;
    const response = await fetch(url);
    if (!response.ok) {
      console.log("error with fetch");
    } else {
      const data = await response.json();
      setRides(data);
    }
  };

  const ClaimRide = (id, userData) => async () => {
    try {
      if (hasClaimedRide) {
        console.log("Driver has already claimed a ride.");
        return;
      }
      const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/rides/set_status/${id}/`;
      const response = await fetch(url, {
        method: "PATCH",
        body: JSON.stringify({
          ride_status: "In Progress",
          driver_id: userData.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const url2 = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/accounts/${userData.username}/`;
      const response2 = await fetch(url2, {
        method: "PATCH",
        body: JSON.stringify({
        current_ride: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!response.ok && !response2.ok) {
        console.log("Can not update ride status");
      } else {
        setHasClaimedRide(true);
        loadRides();
      }
    } catch (e) {
      console.log("Error on update", e);
    }
  };

  const CompleteRide = (rideId, ride) => async () => {
    try {
      const url1 = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/rides/set_status/${rideId}/`;
      const response1 = await fetch(url1, {
        method: "PATCH",
        body: JSON.stringify({
          ride_status: "Completed",
          driver_id: userData.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const url2 = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/accounts/${ride.driver.username}/`;
      const response2 = await fetch(url2, {
        method: "PATCH",
        body: JSON.stringify({
          current_ride: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const url3 = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/accounts/${ride.account.username}/`;
      const response3 = await fetch(url3, {
        method: "PATCH",
        body: JSON.stringify({
          current_ride: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response1.ok && response2.ok && response3.ok) {
          loadRides()
      }
    } catch (e) {
      console.log("Error on update", e);
    }
  };
  useEffect(() => {
    loadRides();
  }, []);

  return (
    <div className="container mt-4">
      <h1>All Rides</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Roundtrip</th>
            <th>Start Location</th>
            <th>End location</th>
            <th>Ride Status</th>
            <th>Date</th>
            <th>Vehicle</th>
            <th>Comments</th>
            <th>Driver Name</th>
            <th>Claim Ride</th>
            <th>Complete Ride</th>
          </tr>
        </thead>
        <tbody>
          {rides.map((ride) => {
            return (
              <tr key={ride.id}>
                <td>{ride.id}</td>
                <td>
                  {ride.account.first_name} {ride.account.last_name}
                </td>
                <td>{ride.is_roundtrip}</td>
                <td>{ride.start_location}</td>
                <td>{ride.end_location}</td>
                <td>{ride.ride_status}</td>
                <td>
                  {new Date(ride.datetime).toLocaleString("en-US", {
                    month: "numeric",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </td>

                <td>{ride.vehicle_info}</td>
                <td>{ride.comments}</td>
                <td>
                  {ride.driver.first_name} {ride.driver.last_name}
                </td>
                <td>
                  {!(
                    ride.ride_status === "In Progress" ||
                    ride.ride_status === "Completed" ||
                    ride.ride_status === "Cancelled" ||
                    hasClaimedRide
                  ) ? (
                    <button
                      onClick={ClaimRide(ride.id, userData)}
                      className="btn btn-info"
                    >
                      Claim
                    </button>
                  ) : (
                    <div></div>
                  )}
                </td>
                <td>
                  <button
                    onClick={CompleteRide(ride.id, ride)}
                    className="btn btn-success"
                  >
                    Complete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RideList;
