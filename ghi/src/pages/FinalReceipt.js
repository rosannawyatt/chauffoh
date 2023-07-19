import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const FinalReceipt = ({ userData }) => {
  const [receipt, setReceipt] = useState({});
  const [driver, setDriver] = useState({})
  const { id } = useParams();
  const navigate = useNavigate();

  const loadOneReceipt = async (ride_id) => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/receipts/rides/${ride_id}`;
    console.log(url);
    console.log(userData);
    const response = await fetch(url);
    console.log(response);
    if (!response.ok) {
      console.log("error with fetch");
    } else {
      const data = await response.json();
      console.log(data);
      const data_driver = data.ride.driver
      setReceipt(data)
      setDriver(data_driver)
    }
  };

  const loadOneRide = () => async () => {
    navigate(`receipt`);
  };

  useEffect(() => {
    loadOneReceipt(id);
  }, []);

  if (!receipt && !driver){
    return null
  } else {
  return (
    <div className="container mt-4">
      <h1>Final Receipt </h1>
      {/* <div className='alert alert-warning d-none' id='err-not'>{err}</div> */}
      <table className="table table-striped">
        <div className="list-item">
          <p>ID:{receipt.receipt_id}</p>
          <p>Customer Name: {userData.username}</p>
          <p>
            Round Trip:{" "}
            {receipt.ride && receipt.ride.is_roundtrip ? "Yes" : "No"}
          </p>
          <p>Start Location: {receipt.ride && receipt.ride.start_location}</p>
          <p>End Location: {receipt.ride && receipt.ride.end_location}</p>
          <p>
            Date:{" "}
            {new Date(receipt.ride && receipt.ride.datetime).toLocaleString(
              "en-US",
              {
                month: "numeric",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              }
            )}
          </p>
          <p>Vehicle: {receipt.ride && receipt.ride.vehicle_info}</p>
          <p>Comments: {receipt.ride && receipt.ride.comments}</p>
          <p>Driver Name:
            {driver.first_name
                ? driver.first_name
                : "Not Assigned"}
            {driver.last_name}
              </p>
          <p>Total: {receipt && receipt.total}</p>
        </div>
      </table>
    </div>
  );
};
}
export default FinalReceipt;
