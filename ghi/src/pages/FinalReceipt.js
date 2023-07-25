import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const FinalReceipt = ({ userData }) => {
  const [receipt, setReceipt] = useState({});
  const [driver, setDriver] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const loadOneReceipt = async (ride_id) => {
      const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/receipts/rides/${ride_id}`;
      const response = await fetch(url);
      if (!response.ok) {
        console.log("error with fetch");
      } else {
        const data = await response.json();
        const data_driver = data.ride.driver;
        setReceipt(data);
        setDriver(data_driver);
      }
    };

    loadOneReceipt(id);
  }, [id, userData]);

  if (!receipt && !driver) {
    return null;
  } else {
    return (
      <div className="container mt-4">
        <h1>Final Receipt</h1>
        <table className="table table-striped">
          <tbody>
            <tr>
              <td>Receipt ID#:{receipt.receipt_id}</td>
            </tr>
            <tr>
              <td>Customer Name: {userData.username}</td>
            </tr>
            <tr>
              <td>
                Round Trip:{" "}
                {receipt.ride && receipt.ride.is_roundtrip ? "Yes" : "No"}
              </td>
            </tr>
            <tr>
              <td>
                Start Location: {receipt.ride && receipt.ride.start_location}
              </td>
            </tr>
            <tr>
              <td>End Location: {receipt.ride && receipt.ride.end_location}</td>
            </tr>
            <tr>
              <td>
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
              </td>
            </tr>
            <tr>
              <td>Vehicle: {receipt.ride && receipt.ride.vehicle_info}</td>
            </tr>
            <tr>
              <td>Comments: {receipt.ride && receipt.ride.comments}</td>
            </tr>
            <tr>
              <td>
                Driver Name:{" "}
                {driver.first_name ? driver.first_name : "Not Assigned"}{" "}
                {driver.last_name}
              </td>
            </tr>
            <tr>
              <td>Total: ${receipt && receipt.total}.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
};
export default FinalReceipt;
