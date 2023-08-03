import { NavLink } from "react-router-dom";
import carIcon from "../images/teal-car.webp";

export default function Footer() {
  return (
    <div className="fbody">
      <div className="text-center d-flex justify-content-center">
        {" "}
        © 2023 Chauffoh
        <NavLink to="/chipmunk">
            <img src={carIcon} alt="steering wheel logo" style={{width: 40, paddingLeft:6}} />
        </NavLink>
      </div>{" "}
    </div>
  );
}
