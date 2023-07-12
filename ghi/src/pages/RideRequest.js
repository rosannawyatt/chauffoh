import { useState } from "react";
import { FormInputRequired, FormInputOptional } from "../components/Forms.js";

const RideForm = () => {
  const [startLocation, setStartLocation] = useState("");
  const [isRoundtrip, setIsRoundtrip] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const rideData = {};
    rideData.start_location = startLocation;
    rideData.is_roundtrip = isRoundtrip;
  };
  return (
    <>
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Request a Ride </h1>
            <form id="create-ride-form" onSubmit={handleSubmit}>
              <FormInputRequired
                id="startLocation"
                placeholder="100 ABC Street, Brooklyn NY 11220"
                labelText="Start Location"
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                type="text"
              />
              <FormInputOptional
                id="isRoundtrip"
                placeholder="Roundtrip"
                labelText="Is this a roundtrip?"
                value={isRoundtrip}
                onChange={(e) => setIsRoundtrip(e.target.value)}
                type="checkbox"
              />
              <button className="btn btn-primary" type="submit">
                Request a ride
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default RideForm;
