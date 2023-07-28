import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Map from "../components/Map";

import { SideBarNav } from "../components/SideBarNav";
import Footer from "../components/Footer";

const RideView = ({ userData }) => {
  const [ride, setRide] = useState({});
  const [startloc, setStartloc] = useState([]);
  const [endloc, setEndloc] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const loadOneRide = async (ride_id) => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/rides/${ride_id}`;
    const response = await fetch(url);

    if (!response.ok) {
      console.log("error with fetch");
    } else {
      const data = await response.json();
      setRide(data);
    }
  };

  const loadOneReceipt = () => async () => {
    navigate(`receipt`);
  };

  useEffect(() => {
    loadOneRide(id);
  }, [id]);

  const getStartlocation = async (start) => {
    if (start) {
      const start_url = start.replace(/ /g, "+");
      const url = `https://geocode.maps.co/search?q=${start_url}`;
      const response = await fetch(url);

      if (!response.ok) {
        console.log("error with fetch");
      } else {
        const data = await response.json();
        const location = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
        setStartloc(location);
      }
    }
  };
  const getEndlocation = async (end) => {
    if (end) {
      const end_url = end.replace(/ /g, "+");
      const url = `https://geocode.maps.co/search?q=${end_url}`;
      const response = await fetch(url);

      if (!response.ok) {
        console.log("error with fetch");
      } else {
        const data = await response.json();

        const location = [parseFloat(data[0].lat), parseFloat(data[0].lon)];

        setEndloc(location);
      }
    }
  };
  useEffect(() => {
    getStartlocation(ride.start_location);
    getEndlocation(ride.end_location);
  }, [ride]);

  if (!ride && !startloc && !endloc) {
    return null;
  } else {
    return (
      <>
        <div className="d-flex flex-row">
          <SideBarNav userData={userData} />
          <div className="container mt-4">
            <div className="container-fluid p-3 table-responsive">
              <h3>Ride Information</h3>
              <table className="table table-sm">
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
                    <th>Option</th>
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
                    <td>{ride && ride.vehicle_info}</td>
                    <td>{ride && ride.comments}</td>
                    <td>
                      {ride.driver && ride.driver.first_name
                        ? ride.driver.first_name
                        : "Not Assigned"}{" "}
                      {ride.driver && ride.driver.last_name}
                    </td>
                    <td>
                      <button
                        onClick={loadOneReceipt()}
                        className="ghost-button"
                      >
                        View Receipt
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <Map start={startloc} end={endloc} />
            </div>
          </div>
        </div>
        <div className="row">
          <Footer />
        </div>
      </>
    );
  }
};

export default RideView;
