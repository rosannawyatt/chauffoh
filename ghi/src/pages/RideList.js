import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RideList = ({ userData }) => {
  const [rides, setRides] = useState([]);
  const [hasClaimedRide, setHasClaimedRide] = useState(false);
  const navigate = useNavigate();

  const loadRides = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/rides/`;
    // console.log(url)
    const response = await fetch(url);
    // console.log(response)
    if (!response.ok) {
      console.log("error with fetch");
    } else {
      const data = await response.json();
      // console.log(data)
      setRides(data);
    }
  };

  const UpdateRide = (id) => async () => {
    navigate("/rides/edit");
  };

  const ClaimRide = (id) => async () => {
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
      if (!response.ok) {
        console.log("Can not update ride status");
      } else {
        setHasClaimedRide(true);
        loadRides();
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
      {/* <div className='alert alert-warning d-none' id='err-not'>{err}</div> */}
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
            <th>Claim</th>
            <th>Edit</th>
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
                      onClick={ClaimRide(ride.id)}
                      className="btn btn-danger"
                    >
                      Claim
                    </button>
                  ) : (
                    <div></div>
                  )}
                </td>
                <td>
                  <button
                    onClick={UpdateRide(ride.id)}
                    className="btn btn-danger"
                  >
                    Update
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
