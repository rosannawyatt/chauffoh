import RideCounter from "../components/RideCounter";
import banner1 from "../images/chauffoh-banner1.png";

export default function Home() {
  return (
    <div>
      <h1>CHAUFFOH</h1>
      <img src={banner1} alt="Chauffoh Banner" />
      <RideCounter />
    </div>
  );
}
