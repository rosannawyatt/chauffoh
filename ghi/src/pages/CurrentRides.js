import { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContext.js";

const CurrentRides = ({ userData }) => {
  const [rides, setRides] = useState([]);
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const loadRides = useCallback(async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/rides/history/${userData.id}`;
    const response = await fetch(url);
    if (!response.ok) {
      console.log("error with fetch");
    } else {
      const data = await response.json();
      const filterRides = data.filter(
        (ride) =>
          ride.ride_status === "Requested" || ride.ride_status === "In Progress"
      );
      setRides(filterRides);
    }
  }, [userData.id]);

  const loadOneRide = (ride_id) => async () => {
    navigate(`/dashboard/account/rides/${ride_id}`);
  };

  const updateStatus = (ride_id, ride) => async () => {
    try {
      const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/rides/set_status/${ride_id}/`;
      const response = await fetch(url, {
        method: "PATCH",
        body: JSON.stringify({ ride_status: "Cancelled" }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const urlUser = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/accounts/${userData.username}`;
      const userResponse = await fetch(urlUser, {
        method: "PATCH",
        body: JSON.stringify({
          current_ride: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setUserData({
        ...userData,
        current_ride: false,
      });
      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...userData,
          current_ride: false,
        })
      );

      if (response.ok && userResponse.ok) {
        loadRides();
      } else {
        console.log("Can not update ride status");
      }
    } catch (e) {
      console.log("Error on update", e);
    }
  };

  useEffect(() => {
    loadRides();
  }, [loadRides]);

  return (
    <div className="container mt-4">
      {rides.length > 0 ? (
        <>
          <h1>Current rides for {userData.first_name}</h1>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Ride Status</th>
                <th>Ride ID</th>
                <th>Roundtrip</th>
                <th>Start Location</th>
                <th>End location</th>
                <th>Request Date</th>
                <th>Vehicle</th>
                <th>Comments</th>
                <th>Driver Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rides.map((ride) => {
                if (
                  ride.ride_status === "Requested" ||
                  ride.ride_status === "requested"
                ) {
                  return (
                    <tr key={ride.id}>
                      <td>{ride.ride_status}</td>
                      <td>{ride.id}</td>
                      <td>{ride.is_roundtrip ? "Yes" : "No"}</td>
                      <td>{ride.start_location}</td>
                      <td>{ride.end_location}</td>
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
                        <button
                          onClick={loadOneRide(ride.id)}
                          className="btn btn-info"
                        >
                          View
                        </button>
                      </td>
                      <td>
                        {!(
                          ride.ride_status === "In Progress" ||
                          ride.ride_status === "Completed" ||
                          ride.ride_status === "Cancelled"
                        ) ? (
                          <button
                            onClick={updateStatus(ride.id, ride)}
                            className="btn btn-danger"
                          >
                            Cancel
                          </button>
                        ) : (
                          <div></div>
                        )}
                      </td>
                    </tr>
                  );
                } else {
                  return null;
                }
              })}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <h1>No current ride</h1>
          <a href="/dashboard/request"> Request a Ride </a>{" "}
        </>
      )}
    </div>
  );
};

export default CurrentRides;
