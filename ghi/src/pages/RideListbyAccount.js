import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { SideBarNav } from "../components/SideBarNav";
import Footer from "../components/Footer";

const RideListbyAccount = ({ userData }) => {
  const [rides, setRides] = useState([]);
  const navigate = useNavigate();

  const loadRides = useCallback(async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/rides/history/${userData.id}`;

    const response = await fetch(url);

    if (!response.ok) {
      console.log("error with fetch");
    } else {
      const data = await response.json();
      const filteredRides = data.filter(
        (ride) =>
          ride.ride_status !== "Requested" && ride.ride_status !== "In Progress"
      );
      setRides(filteredRides);
    }
  }, [userData.id]);

  const loadOneRide = (ride_id) => async () => {
    navigate(`/dashboard/account/rides/${ride_id}`);
  };

  useEffect(() => {
    loadRides();
  }, [loadRides]);

  return (
    <>
      <div className="d-flex flex-row">
        <SideBarNav userData={userData} />
        {rides.length > 0 ? (
          <>
            <div className="container-fluid ubody p-3">
              <div className="user-table shadow p-3">
                <h3>Ride History </h3>
                <table className="table table-sm table-responsive ">
                  <thead>
                    <tr>
                      <th>Ride Status</th>
                      <th>ID</th>
                      <th>Roundtrip</th>
                      <th>Start Location</th>
                      <th>End location</th>
                      <th>Date</th>
                      <th>Vehicle</th>
                      <th>Comments</th>
                      <th>Driver Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rides.map((ride) => {
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
                              className="ghost-button-inverse"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="container-fluid ubody p-3">
            <div className="user-table shadow p-3">
              <h7>No ride history, you have not requested any rides.</h7>
            </div>
          </div>
        )}
      </div>
      <div className="row">
        <Footer />
      </div>
    </>
  );
};

export default RideListbyAccount;
