import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SideBarNav } from "../components/SideBarNav";
import Footer from "../components/Footer";

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
      <>
      <div className="d-flex flex-row">
      <SideBarNav userData={userData} />
       <div className="container-fluid p-0">
          <div className="row p-4 ubody">
            <div className="offset-3 col-6">
              <div className="shadow p-5 mt5 bg-light">
                <h2 className="text-color-primary text-center">Chauffoh</h2>
                <div style={{
                    borderBottom: '1px solid',
                  }}></div>
                  <br></br>
                 <h4 className="text-center">Thanks For Riding With Us</h4>{" "}
                 <div>Receipt ID#{receipt.receipt_id}</div>
                 <span>
                Customer Name: {userData.last_name}, {userData.first_name}
                </span>
                <div>
                <span>
                  Round Trip:{" "}
                  {receipt.ride && receipt.ride.is_roundtrip ? "Yes" : "No"}
                </span>
                </div>
                 <div>
                <span>
                  Start Location: {receipt.ride && receipt.ride.start_location}
                </span>
              </div>
              <div>
                <span>
                  End Location: {receipt.ride && receipt.ride.end_location}
                </span>
              </div>
              <div>
                <span>
                  Date:{" "}
                  {new Date(
                    receipt.ride && receipt.ride.datetime
                  ).toLocaleString("en-US", {
                    month: "numeric",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </span>
              </div>
               <div>
                <span>
                  Vehicle: {receipt.ride && receipt.ride.vehicle_info}
                </span>
              </div>
              <div>
                <span>Comments: {receipt.ride && receipt.ride.comments}</span>
              </div>
              <div>
                <span>
                  Driver Name:{" "}
                  {driver.first_name ? driver.first_name : "Not Assigned"}{" "}
                  {driver.last_name}
                </span>
              </div>
              <br></br>
               <div className="text-center">
                <span style={{fontWeight: "bold",}}>Total: ${receipt && receipt.total}.00</span>
              </div>
              <div style={{
                padding: 10,
                borderBottom: '3px dotted',
                }}></div>
             </div>
            </div>
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
export default FinalReceipt;
