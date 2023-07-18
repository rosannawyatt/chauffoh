import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FormInputRequired, FormInputOptional } from "../components/Forms.js";

const RideView = () => {
  const [ride, setRide] = useState({});
  const { id } = useParams();

  // console.log(id)
  const loadOneRide = async (ride_id) => {
    // console.log('load start')
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/rides/${ride_id}`;
    const response = await fetch(url);

    // console.log(response)
    if (!response.ok) {
      console.log("error with fetch");
    } else {
      const data = await response.json();
      // console.log(data)
      setRide(data);
    }
  };

  // console.log(ride);
  // console.log(ride.account.first_name)

  useEffect(() => {
    loadOneRide(id);
  }, []);

  return (
    <div className="container mt-4">
      <h1>Ride Info specific ride </h1>
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
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{ride && ride.id}</td>
            <td>
              {ride.account && ride.account.first_name}{" "}
              {ride.account && ride.account.last_name}
            </td>
            <td>{ride && ride.is_roundtrip ? "Yes" : "No"}</td>
            <td>{ride && ride.start_location}</td>
            <td>{ride && ride.end_location}</td>
            <td>{ride && ride.ride_status}</td>
            <td>{ride && ride.datetime}</td>
            <td>{ride && ride.vehicle_info}</td>
            <td>{ride && ride.comments}</td>
            <td>
              {ride.driver && ride.driver.first_name
                ? ride.driver.first_name
                : "Not Assigned"}{" "}
              {ride.driver && ride.driver.last_name}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RideView;
