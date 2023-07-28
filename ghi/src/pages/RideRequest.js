import { useState, useContext } from "react";
import {
  FormInputRequired,
  FormInputOptional,
  FormInputCheckbox,
} from "../components/Forms.js";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContext.js";
import { SideBarNav } from "../components/SideBarNav";
import Footer from "../components/Footer";

const RideForm = ({ userData }) => {
  const [isRoundtrip, setIsRoundtrip] = useState(false);
  const [roundtripDate, setRoundtripDate] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [comments, setComments] = useState("");
  const [showEstimate, setShowEstimate] = useState(false);
  const [costEstimate, setCostEstimate] = useState("");
  const { setUserData } = useContext(UserContext);
  const isRideActive = userData.current_ride;
  const navigate = useNavigate();


  const handleRoundtripChange = (e) => {
    setIsRoundtrip(e.target.checked);
  };
  const handleNextButtonClick = () => {
    setShowEstimate(true);
    if (isRoundtrip) {
      setCostEstimate(50);
    } else {
      setCostEstimate(25);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const rideData = {};
    if (isRoundtrip) {
      rideData.roundtripDate = roundtripDate;
    }
    rideData.account_id = userData.id;
    rideData.is_roundtrip = isRoundtrip;
    rideData.start_location = startLocation;
    rideData.end_location = endLocation;
    rideData.vehicle_info = vehicle;
    rideData.comments = comments;

    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/rides`;
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(rideData),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const rideResponse = await response.json();
      setIsRoundtrip(false);
      setStartLocation("");
      setEndLocation("");
      setVehicle("");
      setComments("");

      if (!isRideActive) {
        const urlUser = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/accounts/${userData.username}`;
        const userResponse = await fetch(urlUser, {
          method: "PATCH",
          body: JSON.stringify({
            current_ride: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (userResponse.ok) {
          setUserData({
            ...userData,
            current_ride: true,
          });
          localStorage.setItem(
            "userData",
            JSON.stringify({
              ...userData,
              current_ride: true,
            })
          );
        }
      }

      const receiptData = {};
      receiptData.ride_id = rideResponse.id;
      receiptData.account_id = userData.id;
      receiptData.total = costEstimate;

      const receiptUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/receipts`;
      const receiptFetchConfig = {
        method: "POST",
        body: JSON.stringify(receiptData),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const receiptResponse = await fetch(receiptUrl, receiptFetchConfig);
      if (receiptResponse.ok) {
        await receiptResponse.json();
      }
      navigate("/dashboard");
    }
  };
  const ActiveRide = () => (
    <>
      <div className="container-fluid ubody p-3">
        <div className="user-table shadow p-3">
          <h7>
            {" "}
            You already have an active ride, go to your dashboard to view it.{" "}
          </h7>
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className="d-flex flex-row">
        <SideBarNav userData={userData} />
        {isRideActive ? (
          <ActiveRide />
        ) : (
          <div className="container-fluid p-3 ubody">
            <div className="row">
              <div className="offset-3 col-6 p-4">
                <div className="shadow p-4 bg-light">
                  <h2 className="text-color-primary">Request a Ride </h2>
                  <div style={{
                    borderBottom: '1px solid',
                  }}></div>
                  <br></br>
                  {!showEstimate && (
                    <form id="create-ride-form" onSubmit={handleSubmit}>
                      <FormInputCheckbox
                        id="isRoundtrip"
                        placeholder="Roundtrip"
                        labelText="Is this a roundtrip?"
                        value={isRoundtrip}
                        onChange={handleRoundtripChange}
                        type="checkbox"
                      />

                      {isRoundtrip && (
                        <FormInputRequired
                          id="roundtripDate"
                          placeholder="Select a date and time"
                          labelText="Return date"
                          value={roundtripDate}
                          onChange={(e) => setRoundtripDate(e.target.value)}
                          type="datetime-local"
                        />
                      )}
                      <FormInputRequired
                        id="startLocation"
                        placeholder="100 ABC Street, Brooklyn NY 11220"
                        labelText="Start Location"
                        value={startLocation}
                        onChange={(e) => setStartLocation(e.target.value)}
                        type="text"
                      />
                      <FormInputRequired
                        id="endlocation"
                        placeholder="500 DEF Street, Queens NY 11220"
                        labelText="End Location"
                        value={endLocation}
                        onChange={(e) => setEndLocation(e.target.value)}
                        type="text"
                      />
                      <FormInputRequired
                        id="vehicle"
                        placeholder="White Subaru CrossTek #ABC123"
                        labelText="Vehicle"
                        value={vehicle}
                        onChange={(e) => setVehicle(e.target.value)}
                        type="text"
                      />
                      <FormInputOptional
                        id="comments"
                        placeholder="Additional Pickup Info: ex. Pickup in front of Mario Pizzaria"
                        labelText="Comments"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        type="text"
                      />
                      <button
                        className="ghost-button-inverse"
                        type="button"
                        onClick={handleNextButtonClick}
                      >
                        Next
                      </button>
                    </form>
                  )}
                  {showEstimate && (
                    <div>
                      <p>Cost Estimate: ${costEstimate}</p>
                      <button
                        className="ghost-button-inverse"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Request A Ride
                      </button>
                    </div>
                  )}
                </div>
              </div>
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
export default RideForm;
